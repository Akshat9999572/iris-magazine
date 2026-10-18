import { and, desc, eq } from "drizzle-orm";
import type { Article, Section } from "@/lib/articles";
import { getDb } from "@/lib/db/client";
import { articles as articlesTable, type DbArticle } from "@/lib/db/schema";
import { seedDatabase } from "@/lib/db/seed";

function mapRow(row: DbArticle): Article {
  return {
    slug: row.slug,
    section: row.section as Section,
    title: row.title,
    dek: row.dek,
    author: row.author,
    readMinutes: row.readMinutes,
    publishedAt: row.publishedAt,
    image: { src: row.imageSrc, alt: row.imageAlt },
    featured: row.featured,
    body: JSON.parse(row.bodyJson) as string[],
  };
}

async function readyDb() {
  await seedDatabase();
  return getDb();
}

export type AdminArticle = Article & {
  id: number;
  status: "draft" | "published";
  updatedAt: string;
};

function mapAdminRow(row: DbArticle): AdminArticle {
  return {
    ...mapRow(row),
    id: row.id,
    status: row.status as "draft" | "published",
    updatedAt: row.updatedAt,
  };
}

export async function listPublishedArticles(): Promise<Article[]> {
  const db = await readyDb();
  const rows = await db
    .select()
    .from(articlesTable)
    .where(eq(articlesTable.status, "published"))
    .orderBy(desc(articlesTable.publishedAt));
  return rows.map(mapRow);
}

export async function getPublishedArticle(slug: string): Promise<Article | undefined> {
  const db = await readyDb();
  const rows = await db
    .select()
    .from(articlesTable)
    .where(and(eq(articlesTable.slug, slug), eq(articlesTable.status, "published")))
    .limit(1);
  return rows[0] ? mapRow(rows[0]) : undefined;
}

export async function getFeaturedArticle(): Promise<Article | undefined> {
  const db = await readyDb();
  const featured = await db
    .select()
    .from(articlesTable)
    .where(and(eq(articlesTable.status, "published"), eq(articlesTable.featured, true)))
    .limit(1);
  if (featured[0]) return mapRow(featured[0]);
  const fallback = await db
    .select()
    .from(articlesTable)
    .where(eq(articlesTable.status, "published"))
    .orderBy(desc(articlesTable.publishedAt))
    .limit(1);
  return fallback[0] ? mapRow(fallback[0]) : undefined;
}

export async function getArticlesBySection(section: Section): Promise<Article[]> {
  const all = await listPublishedArticles();
  return all.filter((a) => a.section === section);
}

export async function listAllArticlesAdmin(): Promise<AdminArticle[]> {
  const db = await readyDb();
  const rows = await db.select().from(articlesTable).orderBy(desc(articlesTable.updatedAt));
  return rows.map(mapAdminRow);
}

export async function getArticleByIdAdmin(id: number): Promise<AdminArticle | undefined> {
  const db = await readyDb();
  const rows = await db.select().from(articlesTable).where(eq(articlesTable.id, id)).limit(1);
  return rows[0] ? mapAdminRow(rows[0]) : undefined;
}

export async function getArticleBySlugAdmin(slug: string): Promise<AdminArticle | undefined> {
  const db = await readyDb();
  const rows = await db.select().from(articlesTable).where(eq(articlesTable.slug, slug)).limit(1);
  return rows[0] ? mapAdminRow(rows[0]) : undefined;
}

export async function listPublishedSlugs(): Promise<string[]> {
  const db = await readyDb();
  const rows = await db
    .select({ slug: articlesTable.slug })
    .from(articlesTable)
    .where(eq(articlesTable.status, "published"));
  return rows.map((r) => r.slug);
}
