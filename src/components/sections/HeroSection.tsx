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
  const headlineParts = headline.split("M3+");

  return (
    <section
      className="bg-sky grid-bg section-pad overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="container-content">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── Text Column ───────────────────────────────────────────── */}
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

          {/* ── Image Collage Column ──────────────────────────────────── */}
          <div className="order-1 lg:order-2 relative flex items-center justify-center py-8">
            {/* Main photo — slight tilt for collage feel */}
            <div className="relative w-full max-w-sm aspect-[4/3] rounded-2xl overflow-hidden shadow-card-hover rotate-1">
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
                <div className="absolute inset-0 flex items-center justify-center bg-primary-subtle">
                  <p className="text-primary font-heading font-bold text-sm opacity-60 text-center px-4">
                    Add hero image to<br />
                    <code className="font-mono">/public/images/hero.jpg</code>
                  </p>
                </div>
              )}
            </div>

            {/* Handshake sticker — top-left */}
            <div
              className="absolute -top-2 left-2 lg:-top-4 lg:left-0 w-20 h-20 lg:w-28 lg:h-28 -rotate-12 pointer-events-none select-none"
              aria-hidden="true"
            >
              <Image
                src="/images/hero-sticker-handshake.png"
                alt=""
                fill
                className="object-contain drop-shadow-lg"
                sizes="112px"
              />
            </div>

            {/* M3+ badge sticker — bottom-right */}
            <div
              className="absolute -bottom-2 right-2 lg:-bottom-4 lg:right-0 w-20 h-20 lg:w-28 lg:h-28 rotate-6 pointer-events-none select-none"
              aria-hidden="true"
            >
              <Image
                src="/images/hero-sticker-badge.png"
                alt=""
                fill
                className="object-contain drop-shadow-lg"
                sizes="112px"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
