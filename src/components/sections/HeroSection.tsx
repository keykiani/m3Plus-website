import Image from "next/image";
import Button from "@/components/ui/Button";

interface HeroSectionProps {
  headline: string;
  subtext: string;
  ctaLabel: string;
  ctaHref: string;
  imageSrc?: string;
  imageAlt?: string;
}

export default function HeroSection({
  headline,
  subtext,
  ctaLabel,
  ctaHref,
  imageSrc,
  imageAlt = "M3+ community",
}: HeroSectionProps) {
  // Split headline to bold/underline "M3+" portion
  const headlineParts = headline.split("M3+");

  return (
    <section
      className="bg-cream section-pad overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="container-content">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* ── Text Column ─────────────────────────────────────────── */}
          <div className="order-2 lg:order-1">
            <h1
              id="hero-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-neutral-900 leading-tight mb-6"
            >
              {headlineParts[0]}
              {headlineParts.length > 1 && (
                <>
                  <span className="brand-underline text-primary">M3+</span>
                  {headlineParts[1]}
                </>
              )}
            </h1>

            <p className="text-xl text-neutral-700 font-body leading-relaxed mb-8 max-w-lg">
              {subtext}
            </p>

            <Button variant="primary" size="lg" href={ctaHref}>
              {ctaLabel}
            </Button>
          </div>

          {/* ── Image Column ─────────────────────────────────────────── */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative rounded-card overflow-hidden aspect-[4/3] bg-sky shadow-card-hover">
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                /* Placeholder when no image provided */
                <div className="absolute inset-0 flex items-center justify-center bg-sky">
                  <p className="text-primary font-heading font-bold text-lg opacity-50">
                    Add hero image to<br />
                    <code className="text-sm font-mono">/public/images/hero.jpg</code>
                  </p>
                </div>
              )}
            </div>

            {/* Decorative accent dot */}
            <div
              aria-hidden="true"
              className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-yellow opacity-80 hidden lg:block"
            />
            <div
              aria-hidden="true"
              className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-primary opacity-20 hidden lg:block"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
