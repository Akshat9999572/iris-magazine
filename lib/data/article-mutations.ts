import type { Section } from "@/lib/articles";
import { ensureSingleFeatured } from "@/lib/db/seed";
import { getStore, saveStore } from "@/lib/db/store";
import type { DbArticle } from "@/lib/db/types";

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

function applyInput(row: DbArticle, input: ArticleInput, now: string) {
  row.slug = input.slug;
  row.section = input.section;
  row.title = input.title;
  row.dek = input.dek;
  row.author = input.author;
  row.readMinutes = input.readMinutes;
  row.publishedAt = input.publishedAt;
  row.imageSrc = input.imageSrc;
  row.imageAlt = input.imageAlt;
  row.bodyJson = JSON.stringify(input.body);
  row.featured = input.featured;
  row.status = input.status;
  row.updatedAt = now;
}

export async function createArticle(input: ArticleInput) {
  const store = getStore();
  const now = new Date().toISOString();
  const created: DbArticle = {
    id: store.nextArticleId++,
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
    createdAt: now,
    updatedAt: now,
  };
  store.articles.push(created);
  saveStore();
  if (input.featured) {
    await ensureSingleFeatured(created.id);
  }
  return created;
}

export async function updateArticle(id: number, input: ArticleInput) {
  const store = getStore();
  const existing = store.articles.find((article) => article.id === id);
  if (!existing) return undefined;
  applyInput(existing, input, new Date().toISOString());
  saveStore();
  if (input.featured) {
    await ensureSingleFeatured(id);
  }
  return existing;
}

export async function deleteArticle(id: number) {
  const store = getStore();
  store.articles = store.articles.filter((article) => article.id !== id);
  saveStore();
}
