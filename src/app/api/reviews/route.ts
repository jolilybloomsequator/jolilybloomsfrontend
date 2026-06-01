import { randomUUID } from "crypto";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import DOMPurify from "isomorphic-dompurify";
import { z } from "zod";
import { loadReviews, persistReviews } from "@/lib/reviews";
import type { Review } from "@/data/reviews";

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

const reviewSchema = z.object({
  name: z.string().min(2).max(80),
  rating: z.coerce.number().int().min(1).max(5),
  comment: z.string().min(10).max(500),
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

export async function GET() {
  const reviews = await loadReviews();
  return Response.json(reviews);
}

export async function POST(request: Request) {
  const ip = getClientIp(request);

  if (!(await checkRateLimit(ip))) {
    return Response.json({ message: "Too many requests." }, { status: 429 });
  }

  const payload = await request.json().catch(() => null);
  const parsed = reviewSchema.safeParse(payload);

  if (!parsed.success) {
    return Response.json({ message: "Invalid submission." }, { status: 400 });
  }

  if (parsed.data.website && parsed.data.website.trim().length > 0) {
    return Response.json({ message: "Spam detected." }, { status: 400 });
  }

  const review: Review = {
    id: randomUUID(),
    name: sanitizeText(parsed.data.name),
    rating: parsed.data.rating,
    comment: sanitizeText(parsed.data.comment),
    createdAt: new Date().toISOString(),
  };

  if (!review.name || !review.comment) {
    return Response.json({ message: "Invalid submission." }, { status: 400 });
  }

  const reviews = await loadReviews();
  const nextReviews = [review, ...reviews].slice(0, 20);
  await persistReviews(nextReviews);

  return Response.json({ success: true, review }, { status: 201 });
}
