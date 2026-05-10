import FadeIn from "../../components/FadeIn";
import PageHeader from "../../components/PageHeader";

const sections = [
  {
    title: "Information we collect",
    content:
      "We collect contact details submitted through inquiry and newsletter forms, including name, company, email, country, and requested flower varieties.",
  },
  {
    title: "How we use your data",
    content:
      "Data is used solely to respond to inquiries, provide availability updates, and coordinate export orders. We do not sell or rent your information.",
  },
  {
    title: "Data retention",
    content:
      "Inquiry data is retained only as long as necessary to support business communications and contractual obligations.",
  },
  {
    title: "Your rights",
    content:
      "You may request access, correction, or deletion of your data by contacting info@jolilybloomsequator.com.",
  },
  {
    title: "Cookies & analytics",
    content:
      "We use analytics to understand website performance. A cookie consent banner will appear for EU visitors once configured.",
  },
];

export default function PrivacyPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Privacy Policy"
        title="How we handle your data"
        description="Jolily Blooms Equator Limited is committed to protecting buyer data and maintaining GDPR-compliant practices for international partners."
      />

      <section className="bg-white">
        <div className="mx-auto grid w-full max-w-6xl gap-6 px-6 py-16">
          {sections.map((section) => (
            <FadeIn key={section.title} className="rounded-2xl border border-border-soft bg-cream p-6">
              <h3 className="text-lg font-semibold text-charcoal">{section.title}</h3>
              <p className="mt-2 text-sm text-muted">{section.content}</p>
            </FadeIn>
          ))}
        </div>
      </section>
    </div>
  );
}
