"use client";

import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { contactDetails } from "../data/contact";

const whatsappMessage =
  "Hi Jolily Blooms, I am interested in placing a flower order.";

export default function WhatsAppButton() {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute) {
    return null;
  }

  return (
    <a
      href={`https://wa.me/${contactDetails.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-success px-4 py-3 text-sm font-semibold text-white shadow-soft transition hover:translate-y-[-2px]"
      aria-label="Chat with Jolily Blooms on WhatsApp"
    >
      <MessageCircle className="h-5 w-5" />
      WhatsApp
    </a>
  );
}
