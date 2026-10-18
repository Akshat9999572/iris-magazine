import { eq } from "drizzle-orm";
import type { Section } from "@/lib/articles";
import { getDb } from "@/lib/db/client";
import { ensureSingleFeatured } from "@/lib/db/seed";
import { articles } from "@/lib/db/schema";

export type ArticleInput = {
  slug: string;
  section: Section;
  title: string;
  dek: string;
  author: string;
  readMinutes: number;
  publishedAt: string;
  imageSrc: string;
  imageAlt: string;
  body: string[];
  featured: boolean;
  status: "draft" | "published";
};

export async function createArticle(input: ArticleInput) {
  const db = getDb();
  const now = new Date().toISOString();
  const result = await db
    .insert(articles)
    .values({
      slug: input.slug,
      section: input.section,
      title: input.title,
      dek: input.dek,
      author: input.author,
      readMinutes: input.readMinutes,
      publishedAt: input.publishedAt,
      imageSrc: input.imageSrc,
      imageAlt: input.imageAlt,
      bodyJson: JSON.stringify(input.body),
      featured: input.featured,
      status: input.status,
      updatedAt: now,
    })
    .returning();
  if (input.featured && result[0]) {
    await ensureSingleFeatured(result[0].id);
  }
  return result[0];
}

export async function updateArticle(id: number, input: ArticleInput) {
  const db = getDb();
  const now = new Date().toISOString();
  const result = await db
    .update(articles)
    .set({
      slug: input.slug,
      section: input.section,
      title: input.title,
      dek: input.dek,
      author: input.author,
      readMinutes: input.readMinutes,
      publishedAt: input.publishedAt,
      imageSrc: input.imageSrc,
      imageAlt: input.imageAlt,
      bodyJson: JSON.stringify(input.body),
      featured: input.featured,
      status: input.status,
      updatedAt: now,
    })
    .where(eq(articles.id, id))
    .returning();
  if (input.featured) {
    await ensureSingleFeatured(id);
  }
  return result[0];
}

export async function deleteArticle(id: number) {
  const db = getDb();
  await db.delete(articles).where(eq(articles.id, id));
}
