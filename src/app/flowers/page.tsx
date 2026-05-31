"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import FadeIn from "../../components/FadeIn";
import PageHeader from "../../components/PageHeader";
import type { FlowerItem } from "../../data/flowers";

export default function FlowersPage() {
  const [flowers, setFlowers] = useState<FlowerItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const loadFlowers = async () => {
      try {
        const response = await fetch("/api/flowers");
        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as FlowerItem[];
        if (!cancelled && Array.isArray(data)) {
          setFlowers(data);
        }
      } catch {
        if (!cancelled) {
          setFlowers([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
     };

    void loadFlowers();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      <PageHeader
        eyebrow="Flower Catalogue"
        title="Export-ready varieties sourced weekly"
        description="Browse our live catalogue of premium Kenyan flowers."
      />

      <section className="bg-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16">
          {!loading && flowers.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border-soft bg-cream p-6 text-sm text-muted">
              No flowers available yet.
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {flowers.map((flower) => (
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
                    width={400}
                    height={280}
                    className="h-44 w-full object-cover"
                  />
                  <div className="space-y-3 p-5">
                    <div className="flex items-center justify-between">
                      {flower.availability ? (
                        <span className="rounded-full bg-rose px-3 py-1 text-xs font-semibold text-brand">
                          {flower.availability}
                        </span>
                      ) : null}
                      {flower.category ? (
                        <span className="text-xs font-semibold text-muted">{flower.category}</span>
                      ) : null}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-charcoal">{flower.name}</h3>
                      {flower.botanicalName ? <p className="text-sm text-muted">{flower.botanicalName}</p> : null}
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted">
                      <span>Stem length: {flower.stemLength || "—"}</span>
                      <span>Colour: {flower.color || "—"}</span>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
