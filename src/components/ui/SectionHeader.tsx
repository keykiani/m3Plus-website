import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label?: string;      // Small uppercase label above the title (e.g. "ABOUT US")
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
  id?: string;         // Optional id for aria-labelledby targets
  /** Heading level. Use "h1" when this is the page's top-level heading. */
  as?: "h1" | "h2" | "h3";
}

export default function SectionHeader({
  label,
  title,
  subtitle,
  centered = false,
  className,
  id,
  as: Heading = "h2",
}: SectionHeaderProps) {
  return (
    <div className={cn(centered && "text-center", className)}>
      {label && (
        // primary-dark, not primary: #2977BD is only 4.06:1 on bg-sky and
        // 4.11:1 on bg-cream, and this label is 14px so 4.5:1 applies.
        <p className="text-sm font-heading font-bold tracking-widest uppercase text-primary-dark mb-2">
          {label}
        </p>
      )}
      <Heading id={id} className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-neutral-900 leading-tight">
        {title}
      </Heading>
      {subtitle && (
        <p className="mt-4 text-lg text-neutral-700 max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
