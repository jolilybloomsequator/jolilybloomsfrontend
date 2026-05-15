import { Clock, FileText, Globe2, Plane, ShieldCheck } from "lucide-react";
import FadeIn from "../../components/FadeIn";
import PageHeader from "../../components/PageHeader";

const steps = [
  {
    title: "Harvest & consolidation",
    detail: "Partner farms deliver within 12 hours of harvest for consolidation and hydration.",
    icon: Clock,
  },
  {
    title: "Documentation",
    detail: "We prepare invoices, packing lists, phyto certificates, and airway bills.",
    icon: FileText,
  },
  {
    title: "Freight booking",
    detail: "Preferred airlines and freight agents ensure consistent uplift slots.",
    icon: Plane,
  },
  {
    title: "Cold chain handover",
    detail: "Temperature checks and pallet sealing before export clearance.",
    icon: ShieldCheck,
  },
  {
    title: "Arrival updates",
    detail: "Tracking shared with buyers and updates on ETA and handling notes.",
    icon: Globe2,
  },
];

export default function LogisticsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Export & Logistics"
        title="Smooth dispatch from JKIA to global destinations"
        description="Our logistics team coordinates freight, documentation, and schedules to keep supply chains predictable for wholesale buyers."
      />

      <section className="bg-white">
        <div className="mx-auto grid w-full max-w-6xl gap-6 px-6 py-16 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step) => (
            <FadeIn key={step.title} className="rounded-2xl border border-border-soft bg-cream p-6">
              <step.icon className="h-6 w-6 text-brand" />
              <h3 className="mt-4 text-lg font-semibold text-charcoal">{step.title}</h3>
              <p className="mt-2 text-sm text-muted">{step.detail}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="bg-rose">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-16 lg:flex-row lg:items-start">
          <FadeIn className="flex-1 space-y-4">
            <h2 className="text-3xl font-semibold text-charcoal">Shipping schedules</h2>
            <p className="text-sm text-muted">
              Regular uplift windows are available Monday through Friday, with priority slots during peak
              seasons. Buyers receive pre-alerts with box counts, weights, and airway bill numbers.
            </p>
          </FadeIn>
          <FadeIn className="flex-1 rounded-3xl border border-border-soft bg-white p-8 shadow-soft">
            <h3 className="text-xl font-semibold text-charcoal">Key export notes</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              <li>• Standard lead time: 48-72 hours from order confirmation</li>
              <li>• Freight partners: KQ Cargo, Emirates SkyCargo, Qatar Cargo</li>
              <li>• Optional temperature loggers available per shipment</li>
              <li>• Dedicated export coordinator for every buyer</li>
            </ul>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
