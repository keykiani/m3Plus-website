import Image from "next/image";
import type { Testimonial } from "@/lib/types";

interface TestimonialBlockProps {
  testimonial: Testimonial;
  /** "light" = cream bg (default), "sky" = sky-blue bg */
  bgVariant?: "light" | "sky";
}

export default function TestimonialBlock({
  testimonial,
  bgVariant = "light",
}: TestimonialBlockProps) {
  const bg = bgVariant === "sky" ? "bg-sky" : "bg-cream";

  // Render quote with a bolded phrase if provided
  const renderQuote = () => {
    if (!testimonial.boldPhrase) {
      return <span>{testimonial.quote}</span>;
    }
    const parts = testimonial.quote.split(testimonial.boldPhrase);
    return (
      <>
        {parts[0]}
        <strong className="font-bold text-neutral-900">
          {testimonial.boldPhrase}
        </strong>
        {parts[1]}
      </>
    );
  };

  return (
    <section className={`${bg} section-pad`} aria-label="Community testimonial">
      <div className="container-content max-w-3xl mx-auto">
        <div className="flex flex-col items-center text-center gap-6">
          {/* Decorative quote mark */}
          <span className="quote-mark text-primary" aria-hidden="true">
            &ldquo;
          </span>

          <blockquote className="text-xl md:text-2xl font-body text-neutral-700 leading-relaxed -mt-8">
            {renderQuote()}
          </blockquote>

          <footer className="flex items-center gap-4 mt-2">
            {testimonial.photo && (
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-primary shrink-0">
                <Image
                  src={testimonial.photo}
                  alt={testimonial.author}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </div>
            )}
            <div className={testimonial.photo ? "text-left" : "text-center"}>
              <p className="font-heading font-bold text-neutral-900">
                {testimonial.author}
              </p>
              <p className="text-sm text-neutral-700 font-body">{testimonial.role}</p>
            </div>
          </footer>
        </div>
      </div>
    </section>
  );
}
