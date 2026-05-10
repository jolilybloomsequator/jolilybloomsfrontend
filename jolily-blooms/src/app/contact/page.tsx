import { Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "../../components/ContactForm";
import FadeIn from "../../components/FadeIn";
import PageHeader from "../../components/PageHeader";

export default function ContactPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Contact Us"
        title="Start your weekly flower order"
        description="Send us your requirements and our export team will respond within 24 hours with availability, pricing, and logistics details."
      />

      <section className="bg-white">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr]">
          <FadeIn className="rounded-3xl border border-border-soft bg-cream p-8 shadow-soft">
            <ContactForm />
          </FadeIn>
          <FadeIn className="space-y-6">
            <div className="rounded-3xl border border-border-soft bg-cream p-6">
              <h2 className="text-xl font-semibold text-charcoal">Export desk</h2>
              <div className="mt-4 space-y-3 text-sm text-muted">
                <div className="flex items-start gap-3">
                  <Mail className="mt-1 h-5 w-5 text-brand" />
                  <span>info@jolilybloomsequator.com</span>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="mt-1 h-5 w-5 text-brand" />
                  <span>+254 700 000 000 (WhatsApp)</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-5 w-5 text-brand" />
                  <span>JKIA Export Zone, Nairobi, Kenya</span>
                </div>
              </div>
            </div>
            <div className="rounded-3xl border border-border-soft bg-white p-6 shadow-soft">
              <h3 className="text-lg font-semibold text-charcoal">Office hours</h3>
              <p className="mt-2 text-sm text-muted">Monday - Friday: 8:00am - 6:00pm EAT</p>
              <p className="text-sm text-muted">Saturday: 9:00am - 1:00pm EAT</p>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
