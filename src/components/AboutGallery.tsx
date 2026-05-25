"use client";

import Image from "next/image";

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
  return (
    <div className="rounded-3xl border border-border-soft bg-gradient-to-br from-rose/60 via-white to-brand/10 p-4 shadow-soft">
      <div className="mb-4 rounded-2xl bg-white/85 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
        Our photos
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        {galleryPhotos.map((photo, index) => (
          <div key={photo.src} className="overflow-hidden rounded-xl border border-border-soft bg-white shadow-soft">
            <div className="relative aspect-square">
              <Image src={photo.src} alt={photo.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 220px" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
