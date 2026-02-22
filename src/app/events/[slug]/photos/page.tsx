import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getEventBySlug, getArchiveEvents } from "@/lib/markdown";
import { getMarkdownFile } from "@/lib/markdown";
import SectionHeader from "@/components/ui/SectionHeader";
import type { PhotoAlbum } from "@/lib/types";

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
  const [event, { data: albumsData }] = await Promise.all([
    getEventBySlug(params.slug, "archive"),
    getMarkdownFile("photos/albums.md"),
  ]);

  const { albums } = albumsData as { albums: PhotoAlbum[] };
  const album = albums?.find((a) => a.eventSlug === params.slug);

  return (
    <>
      {/* ── Back nav ──────────────────────────────────────────────── */}
      <div className="bg-neutral-100 border-b border-neutral-200">
        <div className="container-content py-4 flex items-center gap-4">
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
            title={`${event.title}`}
            label="Event Photos"
            className="mb-10"
          />

          {album && album.photos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {album.photos.map((photo, i) => (
                <div
                  key={i}
                  className="relative rounded-card overflow-hidden aspect-[4/3] bg-sky shadow-card hover:shadow-card-hover transition-shadow"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-card bg-cream border border-neutral-200 p-12 text-center">
              <p className="text-neutral-700 font-body text-lg">
                Photos for this event are coming soon.
              </p>
              <p className="text-sm text-neutral-700/60 mt-2 font-body">
                Add photos to <code className="font-mono">/public/images/events/photos/</code> and update{" "}
                <code className="font-mono">content/photos/albums.md</code>
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
