import { REVIEWS_OBJECT_PATH, createSupabaseAdminClient } from "./supabaseStorage";
import type { Review } from "@/data/reviews";

function isReview(value: unknown): value is Review {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Review;

  return (
    typeof candidate.id === "string" &&
    typeof candidate.name === "string" &&
    typeof candidate.rating === "number" &&
    typeof candidate.comment === "string" &&
    typeof candidate.createdAt === "string"
  );
}

async function loadReviewsFromStorage(): Promise<Review[] | null> {
  try {
    const { client: supabase, bucket } = createSupabaseAdminClient();
    const { data: reviewsBlob, error } = await supabase.storage.from(bucket).download(REVIEWS_OBJECT_PATH);

    if (error || !reviewsBlob) {
      return [];
    }

    const parsed = JSON.parse(await reviewsBlob.text());
    return Array.isArray(parsed) ? parsed.filter(isReview) : [];
  } catch {
    return null;
  }
}

async function saveReviewsToStorage(reviews: Review[]): Promise<boolean> {
  try {
    const { client: supabase, bucket } = createSupabaseAdminClient();
    const reviewsBuffer = Buffer.from(JSON.stringify(reviews, null, 2));

    const { error } = await supabase.storage.from(bucket).upload(REVIEWS_OBJECT_PATH, reviewsBuffer, {
      contentType: "application/json",
      upsert: true,
    });

    return !error;
  } catch {
    return false;
  }
}

let reviewMemoryStore: Review[] = [];

export async function loadReviews(): Promise<Review[]> {
  const storedReviews = await loadReviewsFromStorage();
  if (storedReviews) {
    reviewMemoryStore = storedReviews;
    return storedReviews;
  }

  return reviewMemoryStore;
}

export async function persistReviews(reviews: Review[]) {
  reviewMemoryStore = reviews;
  await saveReviewsToStorage(reviews);
}
