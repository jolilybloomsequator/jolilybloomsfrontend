"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Star } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import type { Review } from "@/data/reviews";

const reviewSchema = z.object({
  name: z.string().min(2, "Name is required."),
  rating: z.coerce.number().int().min(1, "Pick a rating.").max(5, "Pick a rating."),
  comment: z.string().min(10, "Please write at least 10 characters."),
  website: z.string().optional(),
});

type ReviewFormValues = z.output<typeof reviewSchema>;
type ReviewFormInput = z.input<typeof reviewSchema>;

type ReviewBoardProps = {
  initialReviews: Review[];
};

const ratingChoices = [1, 2, 3, 4, 5];

const formatReviewDate = (value: string) =>
  new Date(value).toLocaleDateString("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const Stars = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1">
    {ratingChoices.map((star) => (
      <Star
        key={star}
        className={`h-4 w-4 ${star <= rating ? "fill-brand text-brand" : "text-border-soft"}`}
      />
    ))}
  </div>
);

export default function ReviewBoard({ initialReviews }: ReviewBoardProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReviewFormInput, undefined, ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      name: "",
      rating: 5,
      comment: "",
      website: "",
    },
  });

  const rating = useWatch({ control, name: "rating" }) ?? 5;

  useEffect(() => {
    let cancelled = false;

    const loadReviews = async () => {
      try {
        const response = await fetch("/api/reviews");
        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as Review[];
        if (!cancelled && Array.isArray(data)) {
          setReviews(data);
        }
      } catch {
        if (!cancelled) {
          setReviews(initialReviews);
        }
      } finally {
        if (!cancelled) {
          setLoadingReviews(false);
        }
      }
    };

    void loadReviews();

    return () => {
      cancelled = true;
    };
  }, [initialReviews]);

  const summary = useMemo(() => {
    if (reviews.length === 0) {
      return { average: "0.0", total: 0 };
    }

    const average = reviews.reduce((accumulator, review) => accumulator + review.rating, 0) / reviews.length;
    return {
      average: average.toFixed(1),
      total: reviews.length,
    };
  }, [reviews]);

  const onSubmit = async (values: ReviewFormValues) => {
    setStatus("idle");

    const response = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      setStatus("error");
      return;
    }

    const data = (await response.json()) as { review?: Review };
    if (data.review) {
      setReviews((current) => [data.review as Review, ...current].slice(0, 20));
    }

    setStatus("success");
    reset({ name: "", rating: 5, comment: "", website: "" });
  };

  return (
    <div className="space-y-10">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-border-soft bg-white p-5 shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Average rating</p>
          <p className="mt-2 text-3xl font-semibold text-charcoal">{summary.average}/5</p>
          <Stars rating={Math.round(Number(summary.average))} />
        </div>
        <div className="rounded-2xl border border-border-soft bg-white p-5 shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Reviews</p>
          <p className="mt-2 text-3xl font-semibold text-charcoal">{summary.total}</p>
          <p className="text-sm text-muted">Customer comments and experiences.</p>
        </div>
        <div className="rounded-2xl border border-border-soft bg-white p-5 shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Share your view</p>
          <p className="mt-2 text-sm text-muted">Tell us how the flowers, service, and delivery performed for you.</p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 rounded-3xl border border-border-soft bg-white p-6 shadow-soft">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-charcoal">Leave a review</h2>
            <p className="text-sm text-muted">Rate your experience and share a short comment.</p>
          </div>

          <label className="block space-y-2 text-sm font-medium text-charcoal">
            Your name *
            <input
              type="text"
              {...register("name")}
              className="w-full rounded-xl border border-border-soft bg-cream px-4 py-3 text-sm text-charcoal focus:border-brand focus:outline-none"
            />
            {errors.name ? <span className="text-xs text-brand-dark">{errors.name.message}</span> : null}
          </label>

          <div className="space-y-2">
            <p className="text-sm font-medium text-charcoal">Rating *</p>
            <div className="flex flex-wrap gap-2">
              {ratingChoices.map((choice) => (
                <label
                  key={choice}
                  className={`flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${
                    rating === choice
                      ? "border-brand bg-rose text-brand"
                      : "border-border-soft bg-cream text-charcoal"
                  }`}
                >
                  <input type="radio" value={choice} {...register("rating")} className="sr-only" />
                  <Star className={`h-4 w-4 ${rating >= choice ? "fill-brand text-brand" : "text-border-soft"}`} />
                  {choice}
                </label>
              ))}
            </div>
            {errors.rating ? <span className="text-xs text-brand-dark">{errors.rating.message}</span> : null}
          </div>

          <label className="block space-y-2 text-sm font-medium text-charcoal">
            Comment *
            <textarea
              rows={5}
              {...register("comment")}
              className="w-full rounded-xl border border-border-soft bg-cream px-4 py-3 text-sm text-charcoal focus:border-brand focus:outline-none"
              placeholder="Tell us what you liked about the flowers and service."
            />
            {errors.comment ? <span className="text-xs text-brand-dark">{errors.comment.message}</span> : null}
          </label>

          <label className="sr-only">
            Website
            <input type="text" {...register("website")} autoComplete="off" />
          </label>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Posting..." : "Post review"}
            </button>
            <p className="text-sm text-muted">Reviews are moderated through our public form safeguards.</p>
          </div>

          {status === "success" ? (
            <p className="rounded-2xl border border-success/30 bg-success/10 p-4 text-sm text-success">
              Thanks! Your review has been posted.
            </p>
          ) : null}
          {status === "error" ? (
            <p className="rounded-2xl border border-brand-dark/30 bg-brand-dark/10 p-4 text-sm text-brand-dark">
              We could not save your review. Please try again.
            </p>
          ) : null}
        </form>

        <section className="space-y-4 rounded-3xl border border-border-soft bg-cream p-6 shadow-soft">
          <div>
            <h2 className="text-2xl font-semibold text-charcoal">Latest reviews</h2>
            <p className="mt-1 text-sm text-muted">What buyers and clients are saying right now.</p>
          </div>

          {loadingReviews ? (
            <p className="text-sm text-muted">Loading reviews...</p>
          ) : reviews.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border-soft bg-white p-5 text-sm text-muted">
              No reviews yet. Be the first to share your experience.
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <article key={review.id} className="rounded-2xl border border-border-soft bg-white p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="text-base font-semibold text-charcoal">{review.name}</h3>
                      <p className="text-xs text-muted">{formatReviewDate(review.createdAt)}</p>
                    </div>
                    <Stars rating={review.rating} />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-muted">{review.comment}</p>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
