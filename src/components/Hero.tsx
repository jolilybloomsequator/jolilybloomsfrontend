"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream">
      <Image
        src="https://github.com/user-attachments/assets/4d68572d-ba65-4457-a372-dea04a2e9292"
        alt=""
        fill
        aria-hidden
        className="object-cover object-center"
        sizes="100vw"
        quality={100}
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/15" />
      <div className="relative mx-auto flex w-full max-w-6xl gap-10 px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative flex flex-col gap-6"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
            Kenya&apos;s export-grade blooms
          </span>
          <h1 className="text-4xl font-semibold text-white md:text-5xl">
            Reliable flower sourcing for global wholesale buyers.
          </h1>
          <p className="text-lg text-white/80">
            Jolily Blooms Equator Limited consolidates premium Kenyan flowers and delivers
            consistent weekly supply to Europe, the Middle East, and beyond.
          </p>
          <p className="font-accent text-lg text-white/90">
            “Fresh from the farm, packed with care, shipped with precision.”
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
              className="rounded-full border border-white/60 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
            >
              Send Inquiry
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-6 pt-6 text-sm text-white/75 md:grid-cols-3">
            <div>
              <p className="text-2xl font-semibold text-white">26+</p>
              <p>Varieties sourced weekly</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-white">48 hrs</p>
              <p>Average export lead time</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-white">95%</p>
              <p>Cold chain compliance</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
