import FadeIn from "../../components/FadeIn";
import PageHeader from "../../components/PageHeader";
import { pageHeaderImages } from "../../data/siteImages";

const faqs = [
  {
    question: "What is the minimum order quantity (MOQ)?",
    answer:
      "The standard MOQ is 10 export boxes per variety. Mixed pallets are available for regular buyers.",
  },
  {
    question: "How soon can you ship after confirming an order?",
    answer: "Typical lead time is 48-72 hours depending on variety availability.",
  },
  {
    question: "Do you provide quality inspection reports?",
    answer:
      "Yes. Pre-cooling, hydration, and final quality checks are completed before export. Reports are shared on request.",
  },
  {
    question: "Which markets do you export to?",
    answer:
      "We support buyers across Europe, the Middle East, and selected African wholesale markets.",
  },
  {
    question: "What payment terms are available?",
    answer:
      "We offer flexible payment terms based on buyer history and volume. Please contact our export desk to discuss options.",
  },
];

export default function FaqPage() {
  return (
    <div>
      <PageHeader
        eyebrow="FAQ"
        title="Common buyer questions"
        description="Answers to the most frequent inquiries from our wholesale and import partners."
        image={pageHeaderImages.faq}
      />

      <section className="bg-white">
        <div className="mx-auto grid w-full max-w-6xl gap-6 px-6 py-16">
          {faqs.map((faq) => (
            <FadeIn key={faq.question} className="rounded-2xl border border-border-soft bg-cream p-6">
              <h3 className="text-lg font-semibold text-charcoal">{faq.question}</h3>
              <p className="mt-2 text-sm text-muted">{faq.answer}</p>
            </FadeIn>
          ))}
        </div>
      </section>
    </div>
  );
}
