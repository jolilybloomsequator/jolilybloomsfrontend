"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const inquirySchema = z.object({
  fullName: z.string().min(2, "Full name is required."),
  companyName: z.string().min(2, "Company name is required."),
  country: z.string().min(2, "Country is required."),
  email: z.string().email("Enter a valid email address."),
  whatsapp: z.string().min(6, "WhatsApp number is required."),
  varieties: z.array(z.string()).min(1, "Select at least one variety."),
  estimatedVolume: z.string().min(1, "Estimated weekly volume is required."),
  message: z.string().min(10, "Please share a short message."),
  website: z.string().optional(),
});

type InquiryFormValues = z.infer<typeof inquirySchema>;

const varietyOptions = [
  "General product information",
  "Pricing & availability",
  "New buyer onboarding",
  "Other / general question",
  "Roses",
  "Spray Roses",
  "Carnations",
  "Hypericum",
  "Gypsophila",
  "Lisianthus",
  "Alstroemeria",
  "Chrysanthemums",
  "Protea",
  "Foliage & Greens",
];

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<InquiryFormValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      varieties: [],
    },
  });

  const onSubmit = async (values: InquiryFormValues) => {
    setStatus("idle");
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      setStatus("error");
      return;
    }

    setStatus("success");
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-charcoal">
          Full Name *
          <input
            type="text"
            {...register("fullName")}
            className="w-full rounded-xl border border-border-soft bg-white px-4 py-3 text-sm text-charcoal focus:border-brand focus:outline-none"
          />
          {errors.fullName ? (
            <span className="text-xs text-brand-dark">{errors.fullName.message}</span>
          ) : null}
        </label>
        <label className="space-y-2 text-sm font-medium text-charcoal">
          Company Name *
          <input
            type="text"
            {...register("companyName")}
            className="w-full rounded-xl border border-border-soft bg-white px-4 py-3 text-sm text-charcoal focus:border-brand focus:outline-none"
          />
          {errors.companyName ? (
            <span className="text-xs text-brand-dark">{errors.companyName.message}</span>
          ) : null}
        </label>
        <label className="space-y-2 text-sm font-medium text-charcoal">
          Country *
          <input
            type="text"
            {...register("country")}
            className="w-full rounded-xl border border-border-soft bg-white px-4 py-3 text-sm text-charcoal focus:border-brand focus:outline-none"
          />
          {errors.country ? (
            <span className="text-xs text-brand-dark">{errors.country.message}</span>
          ) : null}
        </label>
        <label className="space-y-2 text-sm font-medium text-charcoal">
          Email *
          <input
            type="email"
            {...register("email")}
            className="w-full rounded-xl border border-border-soft bg-white px-4 py-3 text-sm text-charcoal focus:border-brand focus:outline-none"
          />
          {errors.email ? (
            <span className="text-xs text-brand-dark">{errors.email.message}</span>
          ) : null}
        </label>
        <label className="space-y-2 text-sm font-medium text-charcoal">
          WhatsApp Number *
          <input
            type="tel"
            {...register("whatsapp")}
            className="w-full rounded-xl border border-border-soft bg-white px-4 py-3 text-sm text-charcoal focus:border-brand focus:outline-none"
          />
          {errors.whatsapp ? (
            <span className="text-xs text-brand-dark">{errors.whatsapp.message}</span>
          ) : null}
        </label>
        <label className="space-y-2 text-sm font-medium text-charcoal">
          Estimated Weekly Volume *
          <input
            type="text"
            {...register("estimatedVolume")}
            placeholder="e.g. 20 boxes (or N/A for general inquiries)"
            className="w-full rounded-xl border border-border-soft bg-white px-4 py-3 text-sm text-charcoal focus:border-brand focus:outline-none"
          />
          {errors.estimatedVolume ? (
            <span className="text-xs text-brand-dark">{errors.estimatedVolume.message}</span>
          ) : null}
        </label>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium text-charcoal">Topics of Interest *</p>
        <p className="text-xs text-muted">
          Select flower varieties, general information topics, or both.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {varietyOptions.map((option) => (
            <label key={option} className="flex items-center gap-3 rounded-xl border border-border-soft bg-white px-4 py-3 text-sm text-charcoal">
              <input type="checkbox" value={option} {...register("varieties")} className="h-4 w-4" />
              {option}
            </label>
          ))}
        </div>
        {errors.varieties ? (
          <span className="text-xs text-brand-dark">{errors.varieties.message}</span>
        ) : null}
      </div>

      <label className="space-y-2 text-sm font-medium text-charcoal">
        Message *
        <textarea
          rows={5}
          {...register("message")}
          className="w-full rounded-xl border border-border-soft bg-white px-4 py-3 text-sm text-charcoal focus:border-brand focus:outline-none"
        />
        {errors.message ? (
          <span className="text-xs text-brand-dark">{errors.message.message}</span>
        ) : null}
      </label>

      <label className="sr-only">
        Website
        <input type="text" {...register("website")} autoComplete="off" />
      </label>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Sending..." : "Submit Inquiry"}
        </button>
        <p className="text-sm text-muted">
          By submitting, you agree to our privacy policy and communication terms.
        </p>
      </div>

      <AnimatePresence>
        {status === "success" ? (
          <motion.div
            className="rounded-2xl border border-success/30 bg-success/10 p-5 text-sm text-success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            Thank you! Your inquiry has been received. Our team will reply within 24 hours.
          </motion.div>
        ) : null}
        {status === "error" ? (
          <motion.div
            className="rounded-2xl border border-brand-dark/30 bg-brand-dark/10 p-5 text-sm text-brand-dark"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            Something went wrong. Please try again or contact us on WhatsApp.
          </motion.div>
        ) : null}
      </AnimatePresence>
    </form>
  );
}
