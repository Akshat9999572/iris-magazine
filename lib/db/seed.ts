import bcrypt from "bcryptjs";
import { seedArticles } from "@/lib/seed-data";
import { getStore, saveStore } from "./store";

export async function seedDatabase() {
  const store = getStore();

  if (store.admins.length === 0) {
    const email = (process.env.ADMIN_EMAIL ?? "editor@iris.local").trim().toLowerCase();
    const password = process.env.ADMIN_PASSWORD ?? "iris-editor";
    const name = process.env.ADMIN_NAME ?? "Iris Editor";
    const passwordHash = await bcrypt.hash(password, 12);
    const now = new Date().toISOString();

    store.admins.push({
      id: store.nextAdminId++,
      email,
      passwordHash,
      name,
      createdAt: now,
    });
  }

  if (store.articles.length === 0) {
    const now = new Date().toISOString();
    for (const article of seedArticles) {
      store.articles.push({
        id: store.nextArticleId++,
        slug: article.slug,
        section: article.section,
        title: article.title,
        dek: article.dek,
        author: article.author,
        readMinutes: article.readMinutes,
        publishedAt: article.publishedAt,
        imageSrc: article.image.src,
        imageAlt: article.image.alt,
        bodyJson: JSON.stringify(article.body),
        featured: article.featured ?? false,
        status: "published",
        createdAt: now,
        updatedAt: now,
      });
    }
  }

  saveStore();
}

export async function ensureSingleFeatured(excludeId?: number) {
  const store = getStore();
  for (const row of store.articles) {
    if (row.featured && row.id !== excludeId) {
      row.featured = false;
    }
  }
  saveStore();
}
