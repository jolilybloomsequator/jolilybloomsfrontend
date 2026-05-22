"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { FlowerItem } from "@/data/flowers";

export default function AdminFlowerList() {
  const [flowers, setFlowers] = useState<FlowerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const loadFlowers = async () => {
    setMessage("");

    try {
      const response = await fetch("/api/admin/flowers");
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to fetch flowers");
      }

      const data = (await response.json()) as FlowerItem[];
      setFlowers(Array.isArray(data) ? data : []);
    } catch (error) {
      setMessage(`✗ ${error instanceof Error ? error.message : "Failed to fetch flowers"}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    const loadInitialFlowers = async () => {
      try {
        const response = await fetch("/api/admin/flowers");
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Failed to fetch flowers");
        }

        const data = (await response.json()) as FlowerItem[];
        if (!cancelled) {
          setFlowers(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        if (!cancelled) {
          setMessage(`✗ ${error instanceof Error ? error.message : "Failed to fetch flowers"}`);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void loadInitialFlowers();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Delete this flower from the catalogue?");
    if (!confirmed) {
      return;
    }

    setDeletingId(id);
    setMessage("");

    try {
      const response = await fetch("/api/admin/flowers", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Delete failed");
      }

      setFlowers((prev) => prev.filter((flower) => flower.id !== id));
      setMessage("✓ Flower deleted successfully.");
    } catch (error) {
      setMessage(`✗ ${error instanceof Error ? error.message : "Delete failed"}`);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className="mt-8 rounded-3xl border border-border-soft bg-white p-8 shadow-soft">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-3xl font-bold text-charcoal">Uploaded Flowers</h2>
          <p className="mt-2 text-sm text-muted">View and remove flowers currently in your catalogue.</p>
        </div>
        <button
          type="button"
          onClick={() => {
            setLoading(true);
            void loadFlowers();
          }}
          className="rounded-lg border border-brand px-4 py-2 text-sm font-semibold text-brand transition hover:border-brand-dark hover:text-brand-dark"
        >
          Refresh
        </button>
      </div>

      {message && (
        <p className={`mt-4 text-sm font-medium ${message.includes("✓") ? "text-green-600" : "text-red-600"}`}>
          {message}
        </p>
      )}

      {loading ? (
        <p className="mt-6 text-sm text-muted">Loading flowers...</p>
      ) : flowers.length === 0 ? (
        <p className="mt-6 text-sm text-muted">No flowers found in the catalogue.</p>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {flowers.map((flower) => (
            <article key={flower.id} className="overflow-hidden rounded-2xl border border-border-soft">
              <Image
                src={flower.image && flower.image.trim().length > 0 ? flower.image : "/images/flower-placeholder.svg"}
                alt={`${flower.name} image`}
                width={520}
                height={260}
                className="h-40 w-full object-cover"
              />
              <div className="space-y-2 p-4">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold text-charcoal">{flower.name}</h3>
                  {flower.availability ? (
                    <span className="rounded-full bg-rose px-3 py-1 text-xs font-semibold text-brand">
                      {flower.availability}
                    </span>
                  ) : null}
                </div>
                <p className="text-xs text-muted">
                  {flower.color ? `Colour: ${flower.color}` : "Colour: —"}
                  {flower.stemLength ? ` • Stem: ${flower.stemLength}` : ""}
                </p>
                <p className="text-xs font-mono text-muted">ID: {flower.id}</p>
                <button
                  type="button"
                  onClick={() => void handleDelete(flower.id)}
                  disabled={deletingId === flower.id}
                  className="mt-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-300"
                >
                  {deletingId === flower.id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
