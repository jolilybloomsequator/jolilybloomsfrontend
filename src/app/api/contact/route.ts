import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import DOMPurify from "isomorphic-dompurify";
import * as nodemailer from "nodemailer";
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

const buildEmailText = (payload: {
  fullName: string;
  companyName: string;
  country: string;
  email: string;
  whatsapp: string;
  varieties: string[];
  estimatedVolume: string;
  message: string;
}) => `
New inquiry from ${payload.fullName}
Company: ${payload.companyName}
Country: ${payload.country}
Email: ${payload.email}
WhatsApp: ${payload.whatsapp}
Varieties: ${payload.varieties.join(", ")}
Estimated Volume: ${payload.estimatedVolume}

Message:
${payload.message}
`;

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

  const contactToEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.EMAIL_FROM;
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT ?? "0");
  const smtpUser = process.env.SMTP_USER;
  const smtpPassword = process.env.SMTP_PASS;
  const smtpUseSsl = process.env.EMAIL_USE_SSL === "True";
  const smtpUseTls = process.env.EMAIL_USE_TLS === "True";
  const emailText = buildEmailText(sanitizedPayload);

  const canUseSmtp = Boolean(
    contactToEmail &&
      fromEmail &&
      smtpHost &&
      smtpPort &&
      smtpUser &&
      smtpPassword
  );

  if (canUseSmtp) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpUseSsl || smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPassword,
        },
        requireTLS: smtpUseTls,
      });

      await transporter.sendMail({
        to: contactToEmail,
        from: fromEmail,
        replyTo: sanitizedPayload.email,
        subject: `New inquiry: ${sanitizedPayload.companyName} — ${sanitizedPayload.fullName}`,
        text: emailText,
        html: emailText.replace(/\n/g, "<br/>") ,
      });
    } catch (err) {
      console.error("SMTP error:", err);
      return Response.json({ message: "Failed to send email." }, { status: 500 });
    }
  } else {
    const missing: string[] = [];
    if (!contactToEmail) missing.push("CONTACT_TO_EMAIL");
    if (!fromEmail) missing.push("EMAIL_FROM");
    if (!smtpHost) missing.push("SMTP_HOST");
    if (!smtpPort) missing.push("SMTP_PORT");
    if (!smtpUser) missing.push("SMTP_USER");
    if (!smtpPassword) missing.push("SMTP_PASS");

    console.warn(`SMTP email not configured. Missing: ${missing.join(", ")}.`);
    return Response.json(
      { message: "Email service not configured.", missing },
      { status: 503 }
    );
  }

  return Response.json({ success: true, data: sanitizedPayload });
}