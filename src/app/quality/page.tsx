import FadeIn from "../../components/FadeIn";
import PageHeader from "../../components/PageHeader";

const specs = [
  {
    title: "Stem grading",
    detail: "Uniform length grading with hydration sleeves and bloom stage checks.",
  },
  {
    title: "Cold chain",
    detail: "Pre-cooling and temperature monitoring from farm to export pallet.",
  },
  {
    title: "Packaging",
    detail: "Export cartons with barcoding, humidity control, and clear labeling.",
  },
  {
    title: "Compliance",
    detail: "Phyto certificates, inspection reports, and commercial invoices provided.",
  },
];

const packaging = [
  "Carton sizes: 100cm or 120cm export cartons",
  "Standard pack: 10-20 bunches per box depending on variety",
  "Custom labeling available for private label buyers",
  "Cold-chain inserts for sensitive varieties",
];

export default function QualityPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Quality & Specs"
        title="Export specifications that protect freshness"
        description="We follow strict grading and cold-chain protocols to ensure flowers arrive in perfect condition for global buyers."
      />

      <section className="bg-white">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-16 md:grid-cols-2">
          {specs.map((spec) => (
            <FadeIn key={spec.title} className="rounded-2xl border border-border-soft bg-cream p-6">
              <h3 className="text-lg font-semibold text-charcoal">{spec.title}</h3>
              <p className="mt-2 text-sm text-muted">{spec.detail}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr]">
          <FadeIn className="space-y-4">
            <h2 className="text-3xl font-semibold text-charcoal">Packing specifications</h2>
            <p className="text-sm text-muted">
              Each order is packed in compliance with airline and buyer specifications. We align bunch
              counts, hydration requirements, and labeling for seamless inbound inspections.
            </p>
            <ul className="space-y-2 text-sm text-muted">
              {packaging.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </FadeIn>
          <FadeIn className="rounded-3xl border border-border-soft bg-white p-8 shadow-soft">
            <h3 className="text-xl font-semibold text-charcoal">Quality checklist</h3>
            <div className="mt-4 space-y-3 text-sm text-muted">
              <p>✔ Bloom stage checked at farm gate</p>
              <p>✔ Hydration protocols followed for every bunch</p>
              <p>✔ Temperature loggers available on request</p>
              <p>✔ Final inspection before palletizing</p>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
