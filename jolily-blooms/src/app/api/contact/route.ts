import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import DOMPurify from "isomorphic-dompurify";
import { z } from "zod";

type RateLimitEntry = {
  count: number;
  windowStart: number;
};

const RATE_LIMIT_COUNT = 5;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const rateLimitStore = new Map<string, RateLimitEntry>();

const hasUpstash =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN;
const redis = hasUpstash ? Redis.fromEnv() : null;

const rateLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(RATE_LIMIT_COUNT, "15 m"),
    })
  : null;

const cleanupRateLimitStore = (now: number) => {
  if (rateLimitStore.size < 500) {
    return;
  }

  for (const [key, entry] of rateLimitStore.entries()) {
    if (now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
      rateLimitStore.delete(key);
    }
  }
};

const inquirySchema = z.object({
  fullName: z.string().min(2),
  companyName: z.string().min(2),
  country: z.string().min(2),
  email: z.string().email(),
  whatsapp: z.string().min(6),
  varieties: z.array(z.string()).min(1),
  estimatedVolume: z.string().min(1),
  message: z.string().min(10),
  website: z.string().optional(),
  hcaptchaToken: z.string().optional(),
});

const sanitizeText = (value: string) =>
  DOMPurify.sanitize(value, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] }).trim();

const getClientIp = (request: Request) => {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? "unknown";
  }

  return request.headers.get("x-real-ip") ?? "unknown";
};

const checkRateLimit = async (ip: string) => {
  if (rateLimiter) {
    const { success } = await rateLimiter.limit(ip);
    return success;
  }

  const now = Date.now();
  cleanupRateLimitStore(now);
  const entry = rateLimitStore.get(ip);

  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(ip, { count: 1, windowStart: now });
    return true;
  }

  if (entry.count >= RATE_LIMIT_COUNT) {
    return false;
  }

  entry.count += 1;
  rateLimitStore.set(ip, entry);
  return true;
};

const verifyHCaptcha = async (token: string) => {
  const secret = process.env.HCAPTCHA_SECRET;
  if (!secret) {
    return false;
  }

  const response = await fetch("https://hcaptcha.com/siteverify", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ secret, response: token }).toString(),
  });

  if (!response.ok) {
    return false;
  }

  const data = (await response.json()) as { success?: boolean };
  return Boolean(data.success);
};

export async function POST(request: Request) {
  const ip = getClientIp(request);

  if (!(await checkRateLimit(ip))) {
    return Response.json({ message: "Too many requests." }, { status: 429 });
  }

  const payload = await request.json().catch(() => null);
  const parsed = inquirySchema.safeParse(payload);

  if (!parsed.success) {
    return Response.json({ message: "Invalid submission." }, { status: 400 });
  }

  if (parsed.data.website && parsed.data.website.trim().length > 0) {
    return Response.json({ message: "Spam detected." }, { status: 400 });
  }

  const captchaToken = parsed.data.hcaptchaToken ?? "";
  if (!process.env.HCAPTCHA_SECRET) {
    return Response.json({ message: "Captcha verification unavailable." }, { status: 503 });
  }

  if (!(await verifyHCaptcha(captchaToken))) {
    return Response.json({ message: "Captcha verification failed." }, { status: 400 });
  }

  const sanitizedPayload = {
    fullName: sanitizeText(parsed.data.fullName),
    companyName: sanitizeText(parsed.data.companyName),
    country: sanitizeText(parsed.data.country),
    email: sanitizeText(parsed.data.email),
    whatsapp: sanitizeText(parsed.data.whatsapp),
    varieties: parsed.data.varieties.map((value) => sanitizeText(value)),
    estimatedVolume: sanitizeText(parsed.data.estimatedVolume),
    message: sanitizeText(parsed.data.message),
  };

  if (!sanitizedPayload.fullName || !sanitizedPayload.message) {
    return Response.json({ message: "Invalid submission." }, { status: 400 });
  }

  return Response.json({ success: true, data: sanitizedPayload });
}
