import FadeIn from "../../components/FadeIn";
import PageHeader from "../../components/PageHeader";

const faqs = [
  {
    question: "What is Jolily Blooms Equator?",
    answer:
      "Jolily Blooms Equator Limited is a Nairobi-based flower export company that connects international wholesale buyers with export-grade flowers sourced from a vetted network of Kenyan farms. We handle consolidation, quality control, and export logistics so buyers work with a single, reliable partner.",
  },
  {
    question: "Where is Jolily Blooms based?",
    answer:
      "Our export desk is based in Nairobi, Kenya. From here we coordinate farm sourcing, consolidation, cold-chain handling, and freight for buyers across Europe, the Middle East, and selected African wholesale markets.",
  },
  {
    question: "How does your consolidation model work?",
    answer:
      "We source from multiple Kenyan growers, verify stem lengths and post-harvest quality, then consolidate orders under one invoice and one logistics contact. Buyers receive weekly availability updates, consolidated billing, and end-to-end shipment tracking.",
  },
  {
    question: "Which flower varieties do you supply?",
    answer:
      "We export roses, spray roses, carnations, hypericum, gypsophila, lisianthus, alstroemeria, chrysanthemums, protea, and foliage & greens. Availability varies by season — contact us for the current weekly sheet.",
  },
  {
    question: "Can I ask for product information without placing an order?",
    answer:
      "Yes. You do not need a confirmed order to reach out. Submit an inquiry or message us on WhatsApp if you want variety details, stem-length options, sample photos, or general export information. Our team typically responds within 24 hours.",
  },
  {
    question: "How do I get started as a new buyer?",
    answer:
      "Share your company name, country, varieties of interest, and estimated weekly volume through our contact form or WhatsApp. We will send availability, pricing guidance, and logistics details tailored to your market.",
  },
  {
    question: "What is the minimum order quantity (MOQ)?",
    answer:
      "The standard MOQ is 10 export boxes per variety. Mixed pallets are available for regular buyers.",
  },
  {
    question: "How soon can you ship after confirming an order?",
    answer:
      "Typical lead time is 48-72 hours depending on variety availability and freight schedules.",
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
    question: "Do you work with first-time importers?",
    answer:
      "We regularly support new wholesale buyers entering the Kenyan flower market. Our export desk can walk you through variety selection, packing standards, documentation, and freight options for your destination.",
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
        description="Answers about Jolily Blooms, our export process, and common questions from wholesale and import partners."
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
