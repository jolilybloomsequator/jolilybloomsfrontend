import FadeIn from "@/components/FadeIn";
import PageHeader from "@/components/PageHeader";
import ReviewBoard from "@/components/ReviewBoard";
import { pageHeaderImages } from "@/data/siteImages";
import { loadReviews } from "@/lib/reviews";

export default async function ReviewsPage() {
  const initialReviews = await loadReviews();

  return (
    <div>
      <PageHeader
        eyebrow="Reviews"
        title="Share your Jolily Blooms experience"
        description="Leave a rating and comment about the flowers, packaging, and service you received."
        image={pageHeaderImages.reviews}
      />

      <section className="bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <FadeIn>
            <ReviewBoard initialReviews={initialReviews} />
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
