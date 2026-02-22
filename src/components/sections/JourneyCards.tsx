import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";

interface JourneyCard {
  title: string;
  image: string;
  imageAlt: string;
}

interface JourneyCardsProps {
  headline: string;
  cards: JourneyCard[];
}

export default function JourneyCards({ headline, cards }: JourneyCardsProps) {
  return (
    <section className="bg-neutral-100 section-pad" aria-labelledby="journey-heading">
      <div className="container-content">
        <SectionHeader
          id="journey-heading"
          title={headline}
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

              {/* Dark gradient overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-neutral-900/20 to-transparent"
                aria-hidden="true"
              />

              {/* Title anchored to bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-white font-heading font-bold text-xl leading-snug">
                  {card.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
