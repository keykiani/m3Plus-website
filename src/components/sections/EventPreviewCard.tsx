import Image from "next/image";
import { MapPin, Clock } from "lucide-react";
import Button from "@/components/ui/Button";
import type { Event } from "@/lib/types";

interface EventPreviewCardProps {
  event: Event;
  sectionLabel?: string;
}

export default function EventPreviewCard({
  event,
  sectionLabel = "Don't Miss Our Next Event!",
}: EventPreviewCardProps) {
  return (
    <section className="bg-neutral-100 section-pad" aria-label="Next event">
      <div className="container-content">
        <p className="text-sm font-heading font-bold tracking-widest uppercase text-primary mb-6">
          {sectionLabel}
        </p>

        <div className="border-2 border-neutral-900 rounded-card overflow-hidden grid grid-cols-1 md:grid-cols-[280px_1fr] shadow-card">
          {/* ── Thumbnail ─────────────────────────────────────────── */}
          <div className="relative aspect-[4/3] md:aspect-auto bg-coral">
            {event.image ? (
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover"
                sizes="280px"
              />
            ) : (
              <div className="absolute inset-0 bg-coral flex items-center justify-center">
                <span className="text-white font-heading font-bold text-4xl opacity-30">
                  M3+
                </span>
              </div>
            )}
          </div>

          {/* ── Details ───────────────────────────────────────────── */}
          <div className="p-6 md:p-8 flex flex-col justify-between gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-neutral-900 mb-4 leading-tight">
                {event.title}
              </h2>

              <ul className="space-y-2 text-neutral-700 font-body">
                {event.displayDate && (
                  <li className="flex items-center gap-2">
                    <Clock size={16} className="text-primary shrink-0" aria-hidden="true" />
                    <span>
                      {event.displayDate}
                      {event.time && `, ${event.time}`}
                    </span>
                  </li>
                )}
                {event.location && (
                  <li className="flex items-center gap-2">
                    <MapPin size={16} className="text-primary shrink-0" aria-hidden="true" />
                    <span>{event.location}</span>
                  </li>
                )}
              </ul>

              {event.description && (
                <p className="mt-4 text-neutral-700 font-body leading-relaxed">
                  {event.description}
                </p>
              )}
            </div>

            {event.registerUrl && (
              <div>
                <Button
                  variant="secondary"
                  href={event.registerUrl}
                  external
                  size="md"
                >
                  Register Now
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
