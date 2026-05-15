"use client";

import Link from "next/link";
import useIsAdminRoute from "@/hooks/useIsAdminRoute";
import { contactDetails } from "../data/contact";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Flowers", href: "/flowers" },
  { label: "Quality", href: "/quality" },
  { label: "Logistics", href: "/logistics" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
  { label: "Privacy", href: "/privacy" },
];

export default function SiteFooter() {
  const isAdminRoute = useIsAdminRoute();

  if (isAdminRoute) {
    return null;
  }

  return (
    <footer className="bg-charcoal text-white">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-4">
          <div className="text-lg font-semibold">Jolily Blooms Equator Limited</div>
          <p className="text-sm text-white/70">
            Nairobi-based flower consolidator sourcing export-grade blooms from trusted Kenyan farms.
          </p>
          <div className="text-sm text-white/70">
            <p>{contactDetails.email}</p>
            <p>{contactDetails.phone}</p>
            <p>{contactDetails.address}</p>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition hover:text-brand">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">
            Connect
          </h3>
          <p className="text-sm text-white/70">
            Follow our export updates and seasonal availability announcements.
          </p>
          <div className="flex items-center gap-4 text-sm">
            <a href="https://www.linkedin.com" className="hover:text-brand">
              LinkedIn
            </a>
            <a href="https://www.instagram.com" className="hover:text-brand">
              Instagram
            </a>
            <a href="https://www.facebook.com" className="hover:text-brand">
              Facebook
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-white/60">
        © 2026 Jolily Blooms Equator Limited. All rights reserved.
      </div>
    </footer>
  );
}
