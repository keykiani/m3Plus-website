import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label?: string;      // Small uppercase label above the title (e.g. "ABOUT US")
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
  id?: string;         // Optional id for aria-labelledby targets
  /**
   * Heading level to render. Defaults to `h2` — pages that use this component
   * for their primary heading (event detail, event photos) pass `h1` so the
   * document doesn't start at h2.
   */
  as?: "h1" | "h2";
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
        <p className="text-sm font-heading font-bold tracking-widest uppercase text-primary mb-2">
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
