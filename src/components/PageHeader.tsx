import type { ReactNode } from "react";
import Image from "next/image";
import { pageHeaderImage } from "../data/siteImages";

type PageHeaderProps = {
  title: string;
  description: string;
  eyebrow?: string;
  children?: ReactNode;
};

export default function PageHeader({ title, description, eyebrow, children }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-cream">
      <Image
        src={pageHeaderImage.src}
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-rose/70 to-white/75" />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-16">
        {eyebrow ? (
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">
            {eyebrow}
          </span>
        ) : null}
        <h1 className="text-3xl font-semibold text-charcoal md:text-4xl">{title}</h1>
        <p className="max-w-3xl text-base text-muted md:text-lg">{description}</p>
        {children}
      </div>
    </section>
  );
}
