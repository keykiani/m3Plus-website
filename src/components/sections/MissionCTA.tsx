import Button from "@/components/ui/Button";

interface MissionCTAProps {
  label?: string;
  headline: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
}

export default function MissionCTA({
  label = "Our Mission",
  headline,
  body,
  ctaLabel,
  ctaHref,
}: MissionCTAProps) {
  return (
    <section className="bg-sky section-pad" aria-labelledby="mission-heading">
      <div className="container-content max-w-3xl mx-auto text-center">
        <p className="text-sm font-heading font-bold tracking-widest uppercase text-primary mb-3">
          {label}
        </p>
        <h2
          id="mission-heading"
          className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-neutral-900 leading-tight mb-6"
        >
          {headline}
        </h2>
        <p className="text-lg md:text-xl text-neutral-700 font-body leading-relaxed mb-8">
          {body}
        </p>
        <Button variant="secondary" size="lg" href={ctaHref}>
          {ctaLabel}
        </Button>
      </div>
    </section>
  );
}
