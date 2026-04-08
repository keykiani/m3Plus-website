import type { Metadata } from "next";
import Image from "next/image";
import { MapPin, Clock, BookOpen, Images } from "lucide-react";
import { getArchiveEvents } from "@/lib/markdown";
import { siteConfig } from "@/lib/siteConfig";
import Button from "@/components/ui/Button";
import SectionHeader from "@/components/ui/SectionHeader";
import LumaEventSection from "@/components/sections/LumaEventSection";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Explore upcoming M3+ community events and browse our archive of past sessions, slideshows, and resources.",
};

export default async function EventsPage() {
  const archive = await getArchiveEvents();

  // Group archive events by year (most recent first)
  const archiveByYear = archive.reduce<Record<number, typeof archive>>(
    (acc, event) => {
      const year = event.year ?? new Date(event.date).getFullYear();
      acc[year] = acc[year] ?? [];
      acc[year].push(event);
      return acc;
    },
    {}
  );
  const archiveYears = Object.keys(archiveByYear).map(Number).sort((a, b) => b - a);

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="bg-sky grid-bg section-pad overflow-hidden" aria-labelledby="events-hero-heading">
        <div className="container-content">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Text column */}
            <div className="order-2 lg:order-1">
              <h1
                id="events-hero-heading"
                className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-tight mb-4"
              >
                Explore Our Community!
              </h1>
              <p className="text-xl text-neutral font-body leading-relaxed max-w-xl">
                Join our free monthly meetups and grow your network and design skills.
              </p>
            </div>

            {/* Photo column */}
            <div className="order-1 lg:order-2 relative flex items-center justify-center py-8">
              {/* Browser-frame card */}
              <div className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-card-hover border-2 border-foreground bg-white">
                {/* Browser chrome bar */}
                <div className="flex items-center gap-1.5 px-4 py-2.5 border-b-2 border-foreground bg-white">
                  <span className="w-3 h-3 rounded-full border-2 border-foreground" aria-hidden="true" />
                  <span className="w-3 h-3 rounded-full border-2 border-foreground" aria-hidden="true" />
                  <span className="w-3 h-3 rounded-full border-2 border-foreground" aria-hidden="true" />
                </div>
                {/* Photo area */}
                <div className="relative aspect-[4/3] bg-primary-subtle flex items-center justify-center">
                  <p className="text-primary font-heading font-bold text-sm opacity-60 text-center px-4">
                    Add events hero photo to<br />
                    <code className="font-mono">/public/images/events-hero.jpg</code>
                  </p>
                </div>
              </div>

              {/* Cursor sticker — bottom-right */}
              <div
                className="absolute -bottom-2 right-0 lg:-bottom-4 lg:-right-2 w-20 h-20 lg:w-28 lg:h-28 pointer-events-none select-none"
                aria-hidden="true"
              >
                <Image
                  src="/images/hero-sticker-cursor.png"
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

      {/* ── Upcoming Events — auto-updated via Luma ───────────────── */}
      <LumaEventSection
        embedUrl={siteConfig.lumaEmbedUrl}
        sectionLabel="Upcoming Events"
        sectionSubtext="Join our free monthly meetups — register on Luma to save your spot."
      />

      {/* ── Event Archive ─────────────────────────────────────────── */}
      {archiveYears.length > 0 && (
        <section className="bg-cream section-pad">
          <div className="container-content">
            <SectionHeader title="Event Archive" className="mb-10" />
            {archiveYears.map((year) => (
              <div key={year} className="mb-12">
                <h3 className="text-2xl font-heading font-bold text-foreground border-b border-neutral-200 pb-3 mb-6">
                  {year}
                </h3>
                <div className="space-y-8">
                  {archiveByYear[year].map((event) => (
                    <article
                      key={event.slug}
                      className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-6 items-start"
                    >
                      {/* Archive thumbnail */}
                      <div className="relative aspect-video rounded-card overflow-hidden bg-coral shadow-card">
                        {event.image ? (
                          <Image
                            src={event.image}
                            alt={event.title}
                            fill
                            className="object-cover"
                            sizes="180px"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-coral flex items-center justify-center">
                            <span className="text-white font-heading font-bold text-xl opacity-30">M3+</span>
                          </div>
                        )}
                      </div>

                      <div>
                        <p className="text-sm text-neutral font-body mb-1">{event.displayDate}</p>
                        <h4 className="text-xl font-heading font-bold text-foreground mb-2 leading-tight">
                          {event.title}
                        </h4>
                        <p className="text-neutral font-body text-sm leading-relaxed mb-4">
                          {event.description}
                        </p>

                        {/* Archive action buttons — link to Google Drive if set, else internal page */}
                        <div className="flex flex-wrap gap-3">
                          <Button
                            variant="secondary"
                            href={event.resourcesDriveUrl || `/events/${event.slug}`}
                            external={!!event.resourcesDriveUrl}
                            size="sm"
                          >
                            <BookOpen size={14} aria-hidden="true" />
                            View Resources
                          </Button>
                          <Button
                            variant="outline"
                            href={event.photosDriveUrl || `/events/${event.slug}/photos`}
                            external={!!event.photosDriveUrl}
                            size="sm"
                          >
                            <Images size={14} aria-hidden="true" />
                            Event Photos
                          </Button>
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
