"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const galleryPhotos = [
  {
    src: "https://github.com/user-attachments/assets/97cb2598-b0b4-4ecf-9171-56ad7b8924da",
    alt: "Jolily Blooms about page photo one",
  },
  {
    src: "https://github.com/user-attachments/assets/dfcb0fa3-646a-46c7-836b-6566834be3c5",
    alt: "Jolily Blooms about page photo two",
  },
  {
    src: "https://github.com/user-attachments/assets/4e846db5-d8a3-4dcf-a956-5ea61f11dee1",
    alt: "Jolily Blooms about page photo three",
  },
] as const;



export default function AboutGallery() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % galleryPhotos.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  const activePhoto = useMemo(() => galleryPhotos[activeIndex], [activeIndex]);

  return (
    <div className="rounded-3xl border border-border-soft bg-gradient-to-br from-rose/60 via-white to-brand/10 p-4 shadow-soft">
      <div className="relative overflow-hidden rounded-2xl bg-brand/10">
      
        <div className="absolute inset-0 bg-white/30" />
        <div className="absolute left-4 top-4 z-10 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
          Our photos
        </div>
        <div className="relative aspect-[4/3]">
          <Image
            src={activePhoto.src}
            alt={activePhoto.alt}
            fill
            priority
            className="object-cover opacity-95 mix-blend-multiply"
            sizes="(max-width: 1024px) 100vw, 640px"
          />
        </div>
        <button
          type="button"
          aria-label="Previous photo"
          onClick={() => setActiveIndex((current) => (current - 1 + galleryPhotos.length) % galleryPhotos.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-brand shadow-soft transition hover:bg-white"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Next photo"
          onClick={() => setActiveIndex((current) => (current + 1) % galleryPhotos.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-brand shadow-soft transition hover:bg-white"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* <div className="mt-4 grid grid-cols-3 gap-3">
        {galleryPhotos.map((photo, index) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-pressed={activeIndex === index}
            className={`overflow-hidden rounded-xl border transition ${
              activeIndex === index ? "border-brand ring-2 ring-brand/20" : "border-transparent opacity-70"
            }`}
          > */}
            <div className="relative aspect-square">
              <Image src={photo.src} alt={photo.alt} fill className="object-cover" sizes="160px" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
