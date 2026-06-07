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
    <div className="relative w-full h-[400px]">
      <Image
        src={backgroundImage.src}
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center"
        quality={100}
        priority
      />
      {/* Text overlay sits inside the image container */}
     <div className="absolute inset-0 mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-16 justify-center">
  {eyebrow ? (
    <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
      {eyebrow}
    </span>
  ) : null}
  <h1 className="text-3xl font-semibold text-white md:text-4xl">{title}</h1>
  <p className="max-w-3xl text-base text-white/90 md:text-lg">{description}</p>
  {children}
</div>
    </div>
  </section>
);
}
