import Image from "next/image";
import type { Testimonial } from "@/lib/types";

interface TestimonialBlockProps {
  testimonial: Testimonial;
  /** "light" = cream bg (default), "sky" = sky-blue bg */
  bgVariant?: "light" | "sky";
  /** Reverse column order — photo on right, quote on left */
  reversed?: boolean;
}

export default function TestimonialBlock({
  testimonial,
  bgVariant = "light",
  reversed = false,
}: TestimonialBlockProps) {
  const bg = bgVariant === "sky" ? "bg-sky" : "bg-cream";

  const renderQuote = () => {
    if (!testimonial.boldPhrase) return <span>{testimonial.quote}</span>;
    const parts = testimonial.quote.split(testimonial.boldPhrase);
    return (
      <>
        {parts[0]}
        <strong className="font-bold text-neutral-900">{testimonial.boldPhrase}</strong>
        {parts[1]}
      </>
    );
  };

  return (
    <section className={`${bg} section-pad`} aria-label="Community testimonial">
      <div className="container-content max-w-4xl mx-auto">
        <div
          className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 ${
            reversed ? "md:flex-row-reverse" : ""
          }`}
        >
          {/* ── Photo ─────────────────────────────────────────────────── */}
          <div className="shrink-0">
            {testimonial.photo ? (
              <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-primary shadow-card">
                <Image
                  src={testimonial.photo}
                  alt={testimonial.author}
                  fill
                  className="object-cover"
                  sizes="128px"
                />
              </div>
            ) : (
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-primary-subtle border-2 border-primary flex items-center justify-center">
                <span className="text-primary font-heading font-bold text-2xl">
                  {testimonial.author.charAt(0)}
                </span>
              </div>
            )}
          </div>

          {/* ── Quote ─────────────────────────────────────────────────── */}
          <div className="flex-1">
            <span className="quote-mark text-primary block mb-2" aria-hidden="true">
              &ldquo;
            </span>
            <blockquote className="text-xl md:text-2xl font-body text-neutral-700 leading-relaxed -mt-6 mb-4">
              {renderQuote()}
            </blockquote>
            <footer>
              <p className="font-heading font-bold text-neutral-900">{testimonial.author}</p>
              <p className="text-sm text-neutral-700 font-body">{testimonial.role}</p>
            </footer>
          </div>
        </div>
      </div>
    </section>
  );
}
