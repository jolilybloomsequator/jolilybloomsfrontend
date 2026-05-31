"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { aboutGalleryPhotos } from "../data/siteImages";

export default function AboutGallery() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % aboutGalleryPhotos.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  const activePhoto = useMemo(() => aboutGalleryPhotos[activeIndex], [activeIndex]);

  return (
    <div className="rounded-3xl border border-border-soft bg-gradient-to-br from-rose/60 via-white to-brand/10 p-4 shadow-soft">
      <div className="relative min-h-[24rem] overflow-hidden rounded-2xl bg-brand/10 md:min-h-[32rem]">
        <div className="absolute inset-0 bg-white/30" />
        <div className="absolute left-4 top-4 z-10 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
          Our photos
        </div>
        <Image
          src={activePhoto.src}
          alt={activePhoto.alt}
          fill
          priority
          quality={100}
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 640px"
        />
        <button
          type="button"
          aria-label="Previous photo"
          onClick={() =>
            setActiveIndex((current) => (current - 1 + aboutGalleryPhotos.length) % aboutGalleryPhotos.length)
          }
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-brand shadow-soft transition hover:bg-white"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Next photo"
          onClick={() => setActiveIndex((current) => (current + 1) % aboutGalleryPhotos.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-brand shadow-soft transition hover:bg-white"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
