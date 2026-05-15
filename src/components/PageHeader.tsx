import type { ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  description: string;
  eyebrow?: string;
  children?: ReactNode;
};

export default function PageHeader({ title, description, eyebrow, children }: PageHeaderProps) {
  return (
    <section className="bg-rose/70">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-16">
        {eyebrow ? (
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">
            {eyebrow}
          </span>
        ) : null}
        <h1 className="text-3xl font-semibold text-charcoal md:text-4xl">{title}</h1>
        <p className="max-w-3xl text-base text-muted md:text-lg">{description}</p>
        {children}
      </div>
    </section>
  );
}
