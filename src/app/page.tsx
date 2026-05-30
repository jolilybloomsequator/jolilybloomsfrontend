import { Leaf, ShieldCheck, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import FadeIn from "../components/FadeIn";
import Hero from "../components/Hero";
import { loadFlowerCatalogue } from "../lib/flowerCatalogue";

const highlights = [
  {
    title: "Trusted Grower Network",
    description: "We consolidate from vetted Kenyan farms to guarantee traceability and consistent volumes.",
    icon: Leaf,
  },
  {
    title: "Quality-First Handling",
    description: "Cold-chain monitored from farm gate to export box with strict grading standards.",
    icon: ShieldCheck,
  },
  {
    title: "Export Expertise",
    description: "Carefully prepared flower orders with consistent grading and presentation.",
    icon: Sparkles,
  },
];

export default async function Home() {
  const featuredFlowers = (await loadFlowerCatalogue()).slice(0, 4);

  return (
    <div>
      <Hero />

      <section className="bg-white">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-16 md:grid-cols-3">
          {highlights.map((item, index) => (
            <FadeIn
              key={item.title}
              delay={index * 0.1}
              className="rounded-2xl border border-border-soft bg-cream p-6 shadow-soft"
            >
              <item.icon className="h-6 w-6 text-brand" />
              <h3 className="mt-4 text-xl font-semibold text-charcoal">{item.title}</h3>
              <p className="mt-2 text-sm text-muted">{item.description}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-xl space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">
                Flower Catalogue
              </span>
              <h2 className="text-3xl font-semibold text-charcoal">Explore our export-ready varieties</h2>
              <p className="text-sm text-muted">
                Fresh uploads from the admin panel will appear here with their key export details.
              </p>
            </div>
            <Link
              href="/flowers"
              className="rounded-full border border-brand px-5 py-2 text-sm font-semibold text-brand transition hover:border-brand-dark hover:text-brand-dark"
            >
              View full catalogue
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {featuredFlowers.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border-soft bg-white p-6 text-sm text-muted md:col-span-4">
                No flowers have been uploaded yet.
              </div>
            ) : (
              featuredFlowers.map((flower) => (
                <FadeIn
                  key={flower.id}
                  className="overflow-hidden rounded-2xl border border-border-soft bg-white shadow-soft"
                >
                  <Image
                    src={
                      flower.image && flower.image.trim().length > 0
                        ? flower.image
                        : "/images/flower-placeholder.svg"
                    }
                    alt={`${flower.name} variety`}
                    width={320}
                    height={240}
                    className="h-40 w-full object-cover"
                  />
                  <div className="space-y-2 p-4">
                    {flower.availability ? (
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                        {flower.availability}
                      </p>
                    ) : null}
                    <h3 className="text-lg font-semibold text-charcoal">{flower.name}</h3>
                    {flower.botanicalName ? <p className="text-sm text-muted">{flower.botanicalName}</p> : null}
                    {flower.stemLength ? (
                      <p className="text-xs text-muted">Stem lengths: {flower.stemLength}</p>
                    ) : null}
                  </div>
                </FadeIn>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr]">
          <FadeIn className="space-y-4">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">
              Quality & Specs
            </span>
            <h2 className="text-3xl font-semibold text-charcoal">Graded, packed, and shipped with precision</h2>
            <p className="text-sm text-muted">
              Our grading system ensures uniform stem lengths, freshness, and packaging integrity. Each order
              is packed to airline-ready specifications with clear labeling and compliance documentation.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border-soft bg-cream p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Stem lengths</p>
                <p className="mt-2 text-sm text-muted">40cm, 50cm, 60cm, 70cm, 80cm options per variety.</p>
              </div>
              <div className="rounded-2xl border border-border-soft bg-cream p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Packaging</p>
                <p className="mt-2 text-sm text-muted">
                  Export cartons with barcoding, hydration sleeves, and cold-chain inserts.
                </p>
              </div>
              <div className="rounded-2xl border border-border-soft bg-cream p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Quality checks</p>
                <p className="mt-2 text-sm text-muted">Pre-cooling, hydration, and final QC reports provided.</p>
              </div>
              <div className="rounded-2xl border border-border-soft bg-cream p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Compliance</p>
                <p className="mt-2 text-sm text-muted">Phyto certificates, invoices, and airway bills ready.</p>
              </div>
            </div>
          </FadeIn>
          <FadeIn className="space-y-6 rounded-3xl border border-border-soft bg-cream p-8 shadow-soft">
            <h3 className="text-2xl font-semibold text-charcoal">Weekly supply you can plan around</h3>
            <div className="space-y-4 text-sm text-muted">
              <p className="font-data text-base text-charcoal">
                MOQ: 10 boxes per variety | Weekly cut days: Monday - Thursday
              </p>
              <p>
                Our consolidation model ensures flexible volumes without compromising the cold chain. We
                provide weekly availability sheets with confirmed pricing and seasonality updates.
              </p>
              <Link
                href="/quality"
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand"
              >
                View full specifications →
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="bg-charcoal">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-16 text-white md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold">Ready to place a weekly order?</h2>
            <p className="text-sm text-white/70">
              Speak with our export team for tailored availability and pricing.
            </p>
          </div>
          <Link
            href="/contact"
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-charcoal"
          >
            Contact the team
          </Link>
        </div>
      </section>
    </div>
  );
}
