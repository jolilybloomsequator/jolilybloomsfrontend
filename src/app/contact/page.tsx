import { Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "../../components/ContactForm";
import FadeIn from "../../components/FadeIn";
import PageHeader from "../../components/PageHeader";
import { contactDetails } from "../../data/contact";
import { pageHeaderImages } from "../../data/siteImages";

export default function ContactPage() {
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${contactDetails.email}`;

  return (
    <div>
      <PageHeader
        eyebrow="Contact Us"
        title="Start your weekly flower order"
        description="Send us your requirements and our team will respond within 24 hours with availability and pricing."
        image={pageHeaderImages.contact}
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
                  <span>{contactDetails.email}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="mt-1 h-5 w-5 text-brand" />
                  <span>{contactDetails.phone} (WhatsApp)</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-5 w-5 text-brand" />
                  <span>{contactDetails.address}</span>
                </div>
              </div>
            </div>
            <div className="rounded-3xl border border-border-soft bg-white p-6 shadow-soft">
              <h3 className="text-lg font-semibold text-charcoal">Office hours</h3>
              <dl className="mt-2 space-y-2 text-sm text-muted">
                <div>
                  <dt className="font-semibold text-charcoal">Monday - Friday</dt>
                  <dd>8:00am - 6:00pm EAT</dd>
                </div>
                <div>
                  <dt className="font-semibold text-charcoal">Saturday</dt>
                  <dd>9:00am - 1:00pm EAT</dd>
                </div>
              </dl>
              <a
                href={gmailComposeUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-dark"
              >
                Send Inquiry
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
