import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label?: string;      // Small uppercase label above the title (e.g. "ABOUT US")
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
  id?: string;         // Optional id for aria-labelledby targets
}

export default function SectionHeader({
  label,
  title,
  subtitle,
  centered = false,
  className,
  id,
}: SectionHeaderProps) {
  return (
    <div className={cn(centered && "text-center", className)}>
      {label && (
        <p className="text-sm font-heading font-bold tracking-widest uppercase text-primary mb-2">
          {label}
        </p>
      )}
      <h2 id={id} className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-neutral-900 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-neutral-700 max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
