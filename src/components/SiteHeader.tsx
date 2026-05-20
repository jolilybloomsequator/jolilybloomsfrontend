"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useIsAdminRoute from "@/hooks/useIsAdminRoute";
import { useState } from "react";

const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Flowers", href: "/flowers" },
  { label: "Quality", href: "/quality" },
  { label: "Logistics", href: "/logistics" },
  { label: "FAQ", href: "/faq" },
  { label: "Privacy", href: "/privacy" },
  { label: "Contact", href: "/contact" },
];

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isAdminRoute = useIsAdminRoute();

  const isActive = (href: string) => pathname === href;

  if (isAdminRoute) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border-soft bg-cream/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3 text-charcoal">
          <Image
            src="/images/jolily-logo.png"
            alt="Jolily Blooms logo"
            width={44}
            height={44}
            className="h-11 w-11 shrink-0"
            priority
          />
          <span className="text-lg font-semibold tracking-tight">
            Jolily Blooms
            <span className="block text-xs font-medium uppercase tracking-[0.24em] text-muted">
              Equator Limited
            </span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-charcoal lg:flex">
          {navigation.slice(0, -1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition ${
                isActive(item.href)
                  ? "rounded-full bg-brand px-3 py-1 text-white"
                  : "hover:text-brand"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className={`rounded-full px-5 py-2 text-sm font-semibold transition shadow-soft ${
              isActive("/contact")
                ? "bg-brand-dark text-white"
                : "bg-brand text-white hover:bg-brand-dark"
            }`}
          >
            Contact
          </Link>
        </nav>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-border-soft bg-white/70 p-2 text-charcoal transition hover:border-brand lg:hidden"
          onClick={() => setIsOpen(true)}
          aria-expanded={isOpen}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="fixed inset-0 z-50 flex h-full w-full flex-col bg-charcoal/90 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center justify-between px-6 py-4">
              <span className="text-lg font-semibold text-white">Menu</span>
              <button
                type="button"
                className="rounded-full border border-white/30 p-2 text-white"
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <motion.div
              className="flex flex-1 flex-col gap-6 px-6 pt-6 text-lg font-semibold text-white"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.35 }}
            >
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`border-b border-white/20 pb-4 ${
                    isActive(item.href) ? "text-brand" : ""
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
