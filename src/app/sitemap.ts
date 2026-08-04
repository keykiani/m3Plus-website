import type { MetadataRoute } from "next";
import { getArchiveEvents } from "@/lib/markdown";
import { siteConfig } from "@/lib/siteConfig";

/**
 * Sitemap for search engines.
 *
 * Deliberately excludes:
 *  - /site-squad — noindex by design (linked subtly from the footer)
 *  - /events/[slug]/photos where `photosDriveUrl` is empty — those render a
 *    "coming soon" placeholder and are noindex until a Drive link is added
 *  - `_`-prefixed markdown, which `getArchiveEvents()` already filters out
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/events`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/get-involved`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];

  const events = await getArchiveEvents();

  const eventRoutes: MetadataRoute.Sitemap = events.flatMap((event) => {
    const lastModified = Number.isNaN(new Date(event.date).getTime())
      ? now
      : new Date(event.date);

    const entries: MetadataRoute.Sitemap = [
      {
        url: `${base}/events/${event.slug}`,
        lastModified,
        changeFrequency: "yearly",
        priority: 0.6,
      },
    ];

    // Only list the photos page once it actually links somewhere.
    if (event.photosDriveUrl) {
      entries.push({
        url: `${base}/events/${event.slug}/photos`,
        lastModified,
        changeFrequency: "yearly",
        priority: 0.4,
      });
    }

    return entries;
  });

  return [...staticRoutes, ...eventRoutes];
}
