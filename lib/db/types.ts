import type { Section } from "@/lib/articles";

export type DbAdmin = {
  id: number;
  email: string;
  passwordHash: string;
  name: string;
  createdAt: string;
};

export type DbArticle = {
  id: number;
  slug: string;
  section: Section;
  title: string;
  dek: string;
  author: string;
  readMinutes: number;
  publishedAt: string;
  imageSrc: string;
  imageAlt: string;
  bodyJson: string;
  featured: boolean;
  status: "draft" | "published";
  createdAt: string;
  updatedAt: string;
};

export type StoreData = {
  admins: DbAdmin[];
  articles: DbArticle[];
  nextAdminId: number;
  nextArticleId: number;
};
