import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Images } from "lucide-react";
import { getEventBySlug, getArchiveEvents } from "@/lib/markdown";
import Button from "@/components/ui/Button";
import SectionHeader from "@/components/ui/SectionHeader";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const events = await getArchiveEvents();
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const event = await getEventBySlug(params.slug, "archive");
  return {
    title: `${event.title} — Photos`,
    description: `Photo gallery from the M3+ event: ${event.title}`,
  };
}

export default async function EventPhotosPage({ params }: Props) {
  const event = await getEventBySlug(params.slug, "archive");

  return (
    <>
      {/* ── Back nav ──────────────────────────────────────────────── */}
      <div className="bg-neutral-100 border-b border-neutral-200">
        <div className="container-content py-4">
          <Link
            href={`/events/${params.slug}`}
            className="inline-flex items-center gap-2 text-neutral-700 hover:text-primary font-body text-sm transition-colors"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back to Resources
          </Link>
        </div>
      </div>

      {/* ── Photo Gallery ─────────────────────────────────────────── */}
      <section className="bg-neutral-100 section-pad">
        <div className="container-content">
          <SectionHeader
            title={event.title}
            label="Event Photos"
            className="mb-10"
          />

          {event.photosDriveUrl ? (
            /* Drive folder link */
            <div className="rounded-card bg-cream border border-neutral-200 p-12 text-center">
              <Images size={40} className="text-primary mx-auto mb-4" aria-hidden="true" />
              <p className="text-neutral font-body text-lg mb-2">
                Photos from this event are available on Google Drive.
              </p>
              <p className="text-sm text-neutral/60 font-body mb-8">
                Opens in a new tab — no sign-in required.
              </p>
              <Button variant="primary" href={event.photosDriveUrl} external>
                <ExternalLink size={16} aria-hidden="true" />
                View Photos on Google Drive
              </Button>
            </div>
          ) : (
            /* Coming soon */
            <div className="rounded-card bg-cream border border-neutral-200 p-12 text-center">
              <Images size={40} className="text-neutral/30 mx-auto mb-4" aria-hidden="true" />
              <p className="text-neutral font-body text-lg">
                Photos for this event are coming soon.
              </p>
              <p className="text-sm text-neutral/60 mt-2 font-body">
                Upload photos to Google Drive and add the folder link to this event&apos;s markdown file.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
