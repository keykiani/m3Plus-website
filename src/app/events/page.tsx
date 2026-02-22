import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock } from "lucide-react";
import { getUpcomingEvents, getArchiveEvents } from "@/lib/markdown";
import Button from "@/components/ui/Button";
import SectionHeader from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Events",
  description: "Explore upcoming M3+ community events and browse our archive of past sessions, slideshows, and resources.",
};

export default async function EventsPage() {
  const [upcoming, archive] = await Promise.all([
    getUpcomingEvents(),
    getArchiveEvents(),
  ]);

  // Group archive events by year
  const archiveByYear = archive.reduce<Record<number, typeof archive>>(
    (acc, event) => {
      const year = event.year ?? new Date(event.date).getFullYear();
      acc[year] = acc[year] ?? [];
      acc[year].push(event);
      return acc;
    },
    {}
  );

  const archiveYears = Object.keys(archiveByYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="bg-sky section-pad">
        <div className="container-content">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-neutral-900 leading-tight mb-4">
            Explore Our Community!
          </h1>
          <p className="text-xl text-neutral-700 font-body leading-relaxed max-w-xl">
            Join our free monthly meetups and grow your network and design skills.
          </p>
        </div>
      </section>

      {/* ── Upcoming Events ───────────────────────────────────────── */}
      {upcoming.length > 0 && (
        <section className="bg-neutral-100 section-pad">
          <div className="container-content">
            <SectionHeader title="Upcoming Events" className="mb-8" />
            <div className="space-y-6">
              {upcoming.map((event) => (
                <article
                  key={event.slug}
                  className="border-2 border-neutral-900 rounded-card overflow-hidden grid grid-cols-1 md:grid-cols-[240px_1fr] shadow-card"
                >
                  <div className="relative aspect-[4/3] md:aspect-auto bg-coral">
                    {event.image ? (
                      <Image src={event.image} alt={event.title} fill className="object-cover" sizes="240px" />
                    ) : (
                      <div className="absolute inset-0 bg-coral flex items-center justify-center">
                        <span className="text-white font-heading font-bold text-3xl opacity-30">M3+</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-heading font-bold text-neutral-900 mb-3 leading-tight">
                        {event.title}
                      </h2>
                      <ul className="space-y-1 text-neutral-700 font-body text-sm mb-3">
                        {event.displayDate && (
                          <li className="flex items-center gap-2">
                            <Clock size={14} className="text-primary shrink-0" aria-hidden="true" />
                            {event.displayDate}{event.time && `, ${event.time}`}
                          </li>
                        )}
                        {event.location && (
                          <li className="flex items-center gap-2">
                            <MapPin size={14} className="text-primary shrink-0" aria-hidden="true" />
                            {event.location}
                          </li>
                        )}
                      </ul>
                      {event.description && (
                        <p className="text-neutral-700 font-body text-sm leading-relaxed">{event.description}</p>
                      )}
                    </div>
                    {event.registerUrl && (
                      <Button variant="primary" href={event.registerUrl} external size="sm">
                        Register
                      </Button>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Event Archive ─────────────────────────────────────────── */}
      {archiveYears.length > 0 && (
        <section className="bg-cream section-pad">
          <div className="container-content">
            <SectionHeader title="Event Archive" className="mb-10" />
            {archiveYears.map((year) => (
              <div key={year} className="mb-12">
                <h3 className="text-2xl font-heading font-bold text-neutral-900 border-b border-neutral-200 pb-3 mb-6">
                  {year}
                </h3>
                <div className="space-y-6">
                  {archiveByYear[year].map((event) => (
                    <article
                      key={event.slug}
                      className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-6 items-start"
                    >
                      <div className="relative aspect-video rounded-card overflow-hidden bg-coral shadow-card">
                        {event.image ? (
                          <Image src={event.image} alt={event.title} fill className="object-cover" sizes="180px" />
                        ) : (
                          <div className="absolute inset-0 bg-coral flex items-center justify-center">
                            <span className="text-white font-heading font-bold text-xl opacity-30">M3+</span>
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-neutral-700 font-body mb-1">{event.displayDate}</p>
                        <h4 className="text-xl font-heading font-bold text-neutral-900 mb-2 leading-tight">
                          {event.title}
                        </h4>
                        <p className="text-neutral-700 font-body text-sm leading-relaxed mb-4">
                          {event.description}
                        </p>
                        <div className="flex flex-wrap gap-3">
                          <Link
                            href={`/events/${event.slug}`}
                            className="inline-flex items-center gap-1 px-4 py-2 rounded-btn bg-yellow text-neutral-900 font-heading font-bold text-sm hover:bg-yellow/80 transition-colors"
                          >
                            View Resources
                          </Link>
                          <Link
                            href={`/events/${event.slug}/photos`}
                            className="inline-flex items-center gap-1 px-4 py-2 rounded-btn bg-yellow text-neutral-900 font-heading font-bold text-sm hover:bg-yellow/80 transition-colors"
                          >
                            Event Photos
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
