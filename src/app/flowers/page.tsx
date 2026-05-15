"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import FadeIn from "../../components/FadeIn";
import PageHeader from "../../components/PageHeader";
import { flowerCatalogue } from "../../data/flowers";

const categories = ["All", ...new Set(flowerCatalogue.map((flower) => flower.category))];
const colors = ["All", ...new Set(flowerCatalogue.map((flower) => flower.color))];
const availabilityOptions = ["All", "Year-Round", "Seasonal"];

export default function FlowersPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedColor, setSelectedColor] = useState("All");
  const [selectedAvailability, setSelectedAvailability] = useState("All");

  const filteredFlowers = useMemo(() => {
    return flowerCatalogue.filter((flower) => {
      const categoryMatch = selectedCategory === "All" || flower.category === selectedCategory;
      const colorMatch = selectedColor === "All" || flower.color === selectedColor;
      const availabilityMatch =
        selectedAvailability === "All" || flower.availability === selectedAvailability;
      return categoryMatch && colorMatch && availabilityMatch;
    });
  }, [selectedCategory, selectedColor, selectedAvailability]);

  return (
    <div>
      <PageHeader
        eyebrow="Flower Catalogue"
        title="Export-ready varieties sourced weekly"
        description="Browse our live catalogue of premium Kenyan flowers. Filter by category, colour, and seasonal availability to match your weekly order needs."
      />

      <section className="bg-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16">
          <div className="grid gap-6 rounded-3xl border border-border-soft bg-cream p-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Category</p>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setSelectedCategory(category)}
                      aria-pressed={selectedCategory === category}
                      className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                        selectedCategory === category
                          ? "bg-brand text-white"
                          : "border border-border-soft bg-white text-charcoal hover:border-brand"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Colour</p>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      aria-pressed={selectedColor === color}
                      className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                        selectedColor === color
                          ? "bg-brand text-white"
                          : "border border-border-soft bg-white text-charcoal hover:border-brand"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Availability</p>
                <div className="flex flex-wrap gap-2">
                  {availabilityOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setSelectedAvailability(option)}
                      aria-pressed={selectedAvailability === option}
                      className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                        selectedAvailability === option
                          ? "bg-brand text-white"
                          : "border border-border-soft bg-white text-charcoal hover:border-brand"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-sm text-muted">
              Showing {filteredFlowers.length} varieties. Need a custom mix? Contact us for a tailored
              weekly availability sheet.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredFlowers.map((flower) => (
              <FadeIn
                key={flower.id}
                className="overflow-hidden rounded-2xl border border-border-soft bg-white shadow-soft"
              >
                <Image
                  src="/images/flower-placeholder.svg"
                  alt={`${flower.name} variety`}
                  width={400}
                  height={280}
                  className="h-44 w-full object-cover"
                />
                <div className="space-y-3 p-5">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-rose px-3 py-1 text-xs font-semibold text-brand">
                      {flower.availability}
                    </span>
                    <span className="text-xs font-semibold text-muted">{flower.category}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-charcoal">{flower.name}</h3>
                    <p className="text-sm text-muted">{flower.botanicalName}</p>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted">
                    <span>Stem length: {flower.stemLength}</span>
                    <span>Colour: {flower.color}</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
