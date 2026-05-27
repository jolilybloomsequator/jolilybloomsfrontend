"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-cream">
      <div className="mx-auto w-full max-w-6xl px-6 py-10 md:py-14">
        <div className="relative overflow-hidden rounded-[2rem] shadow-soft">
          <Image
            src="https://github.com/user-attachments/assets/7d280c48-c725-4291-aa6c-2c09078ec3ca"
            alt="Roses growing inside a greenhouse"
            width={1600}
            height={900}
            className="h-[340px] w-full object-cover object-center md:h-[520px]"
            sizes="(min-width: 768px) 1024px, 100vw"
            quality={100}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
          <div className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-charcoal">
            Kenya&apos;s export-grade blooms
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto mt-8 flex max-w-3xl flex-col items-start gap-5"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">
            Jolily Blooms Equator Limited
          </span>
          <h1 className="text-4xl font-semibold text-charcoal md:text-5xl">
            Reliable flower sourcing for global wholesale buyers.
          </h1>
          <p className="text-lg text-muted">
            We consolidate premium Kenyan flowers and deliver consistent weekly supply to Europe, the
            Middle East, and beyond.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/flowers"
              className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-dark"
            >
              View Catalogue
            </Link>
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
