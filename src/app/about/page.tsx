import FadeIn from "../../components/FadeIn";
import AboutGallery from "../../components/AboutGallery";
import PageHeader from "../../components/PageHeader";

const values = [
  {
    title: "Integrity",
    description: "Transparent sourcing, honest lead times, and reliable weekly updates.",
  },
  {
    title: "Consistency",
    description: "Stable supply volumes backed by a vetted network of Kenyan growers.",
  },
  {
    title: "Care",
    description: "Careful handling from farm to final QC reports on request.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <PageHeader
        eyebrow="About Jolily Blooms"
        title="A trusted Kenyan flower export partner"
        description="Jolily Blooms Equator Limited connects international buyers with export-grade flowers sourced from Kenyan farms. Our consolidation model simplifies procurement while maintaining transparency, quality, and on-time delivery."
      />

      <section className="bg-white">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[1fr_1fr]">
          <FadeIn className="space-y-4">
            <h2 className="text-3xl font-semibold text-charcoal">Our story</h2>
            <p className="text-sm text-muted">
              Jolily Blooms Equator Limited was built to bridge Kenyan growers with global wholesale markets. We curate dependable supply lines and keep buyers informed at every stage.
Our team brings hands-on experience in quality control and ensuring that premium Kenyan flowers are consistently prepared for our clients. This ensures every order meets buyer specifications and arrives fresh. Located on Joseph Kangethe Road in Nairobi, Kenya, we believe flowers are more than just beautiful. They represent trust, care and the quality that Kenya is known for. 
Our success comes from delivering fresh flowers with a long vase life and keeping our customers happy. We make it easy for you to buy flowers from different Kenyan growers. Our team carefully selects and checks every flower before delivery. We bring the best Kenyan flowers straight to your depot, saving you time and making the buying process simple and stress-free. We are here to help you get quality flowers you can trust.
            </p>
            <p className="text-sm text-muted">
              Our team brings hands-on experience in flower sourcing and quality control. This ensures every
              order meets buyer specifications and arrives fresh.
            </p>
          </FadeIn>
          <FadeIn>
            <AboutGallery />
          </FadeIn>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto grid w-full max-w-6xl gap-6 px-6 py-16 md:grid-cols-3">
          {values.map((value) => (
            <FadeIn key={value.title} className="rounded-2xl border border-border-soft bg-white p-6">
              <h3 className="text-xl font-semibold text-charcoal">{value.title}</h3>
              <p className="mt-2 text-sm text-muted">{value.description}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-16">
          <FadeIn className="space-y-4">
            <h2 className="text-3xl font-semibold text-charcoal">Sourcing model</h2>
            <p className="text-sm text-muted">
              We consolidate from a trusted network of Kenyan farms, verifying variety quality, stem
              lengths, and post-harvest handling. Buyers receive a weekly availability sheet and consolidated
              billing.
            </p>
          </FadeIn>
          <FadeIn className="grid gap-6 rounded-3xl border border-border-soft bg-cream p-8 md:grid-cols-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Step 1</p>
              <h3 className="mt-2 text-lg font-semibold text-charcoal">Confirm availability</h3>
              <p className="mt-2 text-sm text-muted">
                Receive weekly inventory, pricing, and lead time updates per variety.
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Step 2</p>
              <h3 className="mt-2 text-lg font-semibold text-charcoal">Consolidate & quality check</h3>
              <p className="mt-2 text-sm text-muted">
                Orders are graded, hydrated, and packed with export QA sign-off.
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Step 3</p>
              <h3 className="mt-2 text-lg font-semibold text-charcoal">Prepared for delivery</h3>
              <p className="mt-2 text-sm text-muted">Orders are packed, labeled, and ready for buyer handoff.</p>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
