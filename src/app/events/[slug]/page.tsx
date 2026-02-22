import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Download, Presentation } from "lucide-react";
import { getEventBySlug, getArchiveEvents } from "@/lib/markdown";
import Button from "@/components/ui/Button";
import SectionHeader from "@/components/ui/SectionHeader";
import type { ResourceLink } from "@/lib/types";

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
    title: event.title,
    description: event.description,
  };
}

export default async function EventResourcesPage({ params }: Props) {
  const event = await getEventBySlug(params.slug, "archive");

  return (
    <>
      {/* ── Back nav ──────────────────────────────────────────────── */}
      <div className="bg-neutral-100 border-b border-neutral-200">
        <div className="container-content py-4">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-neutral-700 hover:text-primary font-body text-sm transition-colors"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back to Events
          </Link>
        </div>
      </div>

      {/* ── Slideshow Viewer ──────────────────────────────────────── */}
      <section className="bg-neutral-100 section-pad">
        <div className="container-content">
          <SectionHeader title={`${event.title} Slideshow`} className="mb-8" />

          {/* Main image viewer */}
          <div className="relative aspect-video bg-sky rounded-card overflow-hidden shadow-card-hover mb-6">
            {event.slideshowUrl ? (
              <Image
                src={event.slideshowUrl}
                alt={`Slide from ${event.title}`}
                fill
                className="object-contain"
                sizes="100vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-neutral-700 font-body opacity-50 text-center">
                  Slideshow images coming soon.<br />
                  Add images to <code className="font-mono text-sm">/public/images/events/</code>
                </p>
              </div>
            )}
          </div>

          {/* Download / Open buttons */}
          <div className="flex flex-wrap gap-3">
            {event.pdfUrl && (
              <Button variant="primary" href={event.pdfUrl} external>
                <Download size={16} aria-hidden="true" />
                PDF Download
              </Button>
            )}
            {event.slideshowUrl && (
              <Button variant="primary" href={event.slideshowUrl} external>
                <Presentation size={16} aria-hidden="true" />
                Slideshow
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* ── Additional Links ──────────────────────────────────────── */}
      {event.resourceLinks && event.resourceLinks.length > 0 && (
        <section className="bg-cream section-pad">
          <div className="container-content">
            <SectionHeader title="Additional Links" className="mb-8" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {event.resourceLinks.map((link: ResourceLink, i: number) => (
                <div
                  key={i}
                  className="bg-white rounded-card border border-neutral-200 p-6 flex flex-col gap-3 shadow-card hover:shadow-card-hover transition-shadow"
                >
                  <span className="text-3xl" aria-hidden="true">{link.emoji}</span>
                  <h3 className="font-heading font-bold text-neutral-900">{link.title}</h3>
                  <p className="text-sm text-neutral-700 font-body leading-relaxed flex-1">
                    {link.description}
                  </p>
                  <Button variant="secondary" href={link.url} external size="sm">
                    {link.buttonLabel}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
