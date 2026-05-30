"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const heroImages = [
  {
    src: "https://github.com/user-attachments/assets/0a7c787c-a886-4dd6-b1ff-c274b87fcdf6",
    alt: "Pink rose bloom with raindrops",
  },
  {
    src: "https://github.com/user-attachments/assets/8458bdc0-af4a-4e90-89ef-d71aed8b1994",
    alt: "White lily flower in bloom",
  },
  {
    src: "https://github.com/user-attachments/assets/2554f056-261f-4d1e-bf8c-bc4718a46b91",
    alt: "Fresh flower arrangement from Jolily Blooms",
  },
] as const;

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroImages.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  const activeImage = useMemo(() => heroImages[activeIndex], [activeIndex]);

  return (
    <section className="bg-cream">
      <div className="mx-auto w-full max-w-6xl  md:py-14">
        <div className="relative overflow-hidden rounded-[2rem] shadow-soft">
          <Image
            src={activeImage.src}
            alt={activeImage.alt}
            width={1600}
            height={900}
            className="h-[340px] w-full object-cover object-center md:h-[520px]"
            sizes="(min-width: 768px) 1024px, 100vw"
            quality={100}
            priority={activeIndex === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
          <div className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-charcoal">
            Kenya&apos;s export-grade blooms
          </div>
          <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-4">
            <button
              type="button"
              aria-label="Previous hero image"
              onClick={() => setActiveIndex((current) => (current - 1 + heroImages.length) % heroImages.length)}
              className="rounded-full bg-white/90 p-2 text-brand shadow-soft transition hover:bg-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2 rounded-full bg-black/30 backdrop-blur-sm">
              {heroImages.map((image, index) => (
                <button
                  key={image.src}
                  type="button"
                  aria-label={`Show hero image ${index + 1}`}
                  aria-pressed={activeIndex === index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2.5 rounded-full transition ${
                    activeIndex === index ? "w-8 bg-white" : "w-2.5 bg-white/60"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              aria-label="Next hero image"
              onClick={() => setActiveIndex((current) => (current + 1) % heroImages.length)}
              className="rounded-full bg-white/90 p-2 text-brand shadow-soft transition hover:bg-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto mt-8 flex max-w-3xl flex-col items-start gap-5"
        >
        
          <h1 className="text-3xl font-semibold text-charcoal md:text-4xl">
            YOUR TRUSTED SOURCE FOR PREMIUM KENYAN FLOWERS
          </h1>
          <p className="text-lg text-muted">
          At Jolily Blooms Equator Limited, we believe flowers help people share their feelings in a special way. We are proud to export quality Kenyan flowers to the United Kingdom, the Middle East, China, South Africa, and many other countries. Our clients trust us because we provide good quality flowers and reliable service.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="rounded-full border border-brand px-6 py-3 text-sm font-semibold text-brand transition hover:border-brand-dark hover:text-brand-dark"
            >
              Send Inquiry
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
