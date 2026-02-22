import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import type { Event, TeamMember, Testimonial } from "./types";

const contentDir = path.join(process.cwd(), "content");

// ─── Generic Markdown Reader ───────────────────────────────────────────────

/** Read and parse a single Markdown file, returning frontmatter + HTML content */
export async function getMarkdownFile(relativePath: string) {
  const fullPath = path.join(contentDir, relativePath);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await remark()
    .use(remarkHtml)
    .process(content);

  return {
    data,
    content: processedContent.toString(),
  };
}

/** Read all .md files in a directory, returning an array of parsed results */
export async function getMarkdownCollection(relativeDir: string) {
  const dirPath = path.join(contentDir, relativeDir);
  if (!fs.existsSync(dirPath)) return [];

  const filenames = fs.readdirSync(dirPath).filter((f) => f.endsWith(".md"));

  const items = await Promise.all(
    filenames.map(async (filename) => {
      const slug = filename.replace(/\.md$/, "");
      const { data, content } = await getMarkdownFile(
        path.join(relativeDir, filename)
      );
      return { slug, data, content };
    })
  );

  return items;
}

// ─── Events ───────────────────────────────────────────────────────────────

export async function getUpcomingEvents(): Promise<Event[]> {
  const items = await getMarkdownCollection("events/upcoming");
  return items
    .map(({ slug, data }) => ({ slug, ...(data as Omit<Event, "slug">) }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export async function getArchiveEvents(): Promise<Event[]> {
  const items = await getMarkdownCollection("events/archive");
  return items
    .map(({ slug, data }) => ({ slug, ...(data as Omit<Event, "slug">) }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getEventBySlug(
  slug: string,
  type: "upcoming" | "archive"
): Promise<Event & { content: string }> {
  const { data, content } = await getMarkdownFile(
    `events/${type}/${slug}.md`
  );
  return { slug, content, ...(data as Omit<Event, "slug">) };
}

// ─── Team ─────────────────────────────────────────────────────────────────

export async function getTeamMembers(): Promise<TeamMember[]> {
  const items = await getMarkdownCollection("team");
  return items
    .map(({ slug, data }) => ({ slug, ...(data as Omit<TeamMember, "slug">) }))
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

// ─── Testimonials ─────────────────────────────────────────────────────────

export async function getTestimonials(): Promise<Testimonial[]> {
  const items = await getMarkdownCollection("testimonials");
  return items
    .map(({ slug, data }) => ({
      slug,
      ...(data as Omit<Testimonial, "slug">),
    }))
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}
