import type { ReactNode } from "react";
import Image from "next/image";
import { pageHeaderImage } from "../data/siteImages";

type HeaderImage = {
  src: string;
  alt: string;
};

type PageHeaderProps = {
  title: string;
  description: string;
  eyebrow?: string;
  children?: ReactNode;
  image?: HeaderImage;
};

export default function PageHeader({ title, description, eyebrow, children, image }: PageHeaderProps) {
  const backgroundImage = image ?? pageHeaderImage;

  return (
    <section className="relative overflow-hidden bg-cream">
      <Image
        src={backgroundImage.src}
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center"
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
