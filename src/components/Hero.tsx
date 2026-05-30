import Image from "next/image";
import Link from "next/link";

const heroImages = [
  {
    src: "https://github.com/user-attachments/assets/5d01e6ce-0e4a-4bf5-8df4-6cf0a83ceac9",
    alt: "Fresh flower bloom",
  },
] as const;

export default function Hero() {
  const activeImage = heroImages[0];

  return (
    <section className="bg-cream">
      <div className="mx-auto w-full max-w-6xl px-6 py-10 md:py-14">
        <div className="overflow-hidden rounded-[2rem] shadow-soft">
          <Image
            src={activeImage.src}
            alt={activeImage.alt}
            width={1600}
            height={900}
            className="h-[360px] w-full object-cover object-center md:h-[560px]"
            sizes="(min-width: 768px) 1024px, 100vw"
            quality={100}
            priority
          />
        </div>

        <div className="mx-auto mt-8 flex max-w-3xl flex-col items-center gap-4 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">
            Kenya&apos;s export-grade blooms
          </span>
          <h1 className="text-3xl font-semibold text-charcoal md:text-4xl">
            Premium Kenyan flowers, beautifully presented.
          </h1>
          <Link
            href="/flowers"
            className="rounded-full border border-brand px-6 py-3 text-sm font-semibold text-brand transition hover:border-brand-dark hover:text-brand-dark"
          >
            Browse flowers
          </Link>
        </div>
      </div>
    </section>
  );
}
