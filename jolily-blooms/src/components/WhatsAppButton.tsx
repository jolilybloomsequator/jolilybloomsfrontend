import { MessageCircle } from "lucide-react";

const whatsappMessage =
  "Hi Jolily Blooms, I am interested in placing a flower order.";

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/254700000000?text=${encodeURIComponent(whatsappMessage)}`}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-success px-4 py-3 text-sm font-semibold text-white shadow-soft transition hover:translate-y-[-2px]"
      aria-label="Chat with Jolily Blooms on WhatsApp"
    >
      <MessageCircle className="h-5 w-5" />
      WhatsApp
    </a>
  );
}
