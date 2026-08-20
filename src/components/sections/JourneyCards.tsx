import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";

interface JourneyCard {
  title: string;
  description?: string;
  image: string;
  imageAlt: string;
}

interface JourneyCardsProps {
  headline: string;
  subtitle?: string;
  cards: JourneyCard[];
}

export default function JourneyCards({ headline, subtitle, cards }: JourneyCardsProps) {
  return (
    <section className="bg-neutral-100 grid-bg section-pad" aria-labelledby="journey-heading">
      <div className="container-content">
        <SectionHeader
          id="journey-heading"
          title={headline}
          subtitle={subtitle}
          className="mb-10"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <div
              key={i}
              className="relative rounded-card overflow-hidden aspect-[3/4] group shadow-card hover:shadow-card-hover transition-shadow duration-300"
            >
              {/* Background image */}
              {card.image ? (
                <Image
                  src={card.image}
                  alt={card.imageAlt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              ) : (
                <div className="absolute inset-0 bg-sky" />
              )}

              {/* Dark gradient scrim. Measured against the real rendered photos:
                  at via-30% the caption area bottomed out at 3.98:1 over the
                  lightest pixel of journey-starting, under the 4.5:1 minimum.
                  Deepening the midpoint keeps the text legible whatever photo
                  is swapped in later. */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-neutral-900/95 via-neutral-900/60 to-transparent"
                aria-hidden="true"
              />

              {/* Title + description anchored to bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-white font-heading font-bold text-xl leading-snug mb-1">
                  {card.title}
                </h3>
                {card.description && (
                  /* Full white, not white/80 — the 20% transparency was costing
                     roughly a full point of contrast over a mid-tone photo. */
                  <p className="text-white font-body text-sm leading-relaxed">
                    {card.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
