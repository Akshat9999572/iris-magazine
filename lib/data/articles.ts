import type { Article, Section } from "@/lib/articles";
import { seedDatabase } from "@/lib/db/seed";
import { getStore } from "@/lib/db/store";
import type { DbArticle } from "@/lib/db/types";

function mapRow(row: DbArticle): Article {
  return {
    slug: row.slug,
    section: row.section,
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

async function readyStore() {
  await seedDatabase();
  return getStore();
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
    status: row.status,
    updatedAt: row.updatedAt,
  };
}

function published(store: ReturnType<typeof getStore>) {
  return store.articles
    .filter((row) => row.status === "published")
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export async function listPublishedArticles(): Promise<Article[]> {
  const store = await readyStore();
  return published(store).map(mapRow);
}

export async function getPublishedArticle(slug: string): Promise<Article | undefined> {
  const store = await readyStore();
  const row = published(store).find((article) => article.slug === slug);
  return row ? mapRow(row) : undefined;
}

export async function getFeaturedArticle(): Promise<Article | undefined> {
  const store = await readyStore();
  const featured = published(store).find((article) => article.featured);
  if (featured) return mapRow(featured);
  const fallback = published(store)[0];
  return fallback ? mapRow(fallback) : undefined;
}

export async function getArticlesBySection(section: Section): Promise<Article[]> {
  const all = await listPublishedArticles();
  return all.filter((a) => a.section === section);
}

export async function listAllArticlesAdmin(): Promise<AdminArticle[]> {
  const store = await readyStore();
  return [...store.articles]
    .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))
    .map(mapAdminRow);
}

export async function getArticleByIdAdmin(id: number): Promise<AdminArticle | undefined> {
  const store = await readyStore();
  const row = store.articles.find((article) => article.id === id);
  return row ? mapAdminRow(row) : undefined;
}

export async function getArticleBySlugAdmin(slug: string): Promise<AdminArticle | undefined> {
  const store = await readyStore();
  const row = store.articles.find((article) => article.slug === slug);
  return row ? mapAdminRow(row) : undefined;
}

export async function listPublishedSlugs(): Promise<string[]> {
  const store = await readyStore();
  return published(store).map((article) => article.slug);
}
