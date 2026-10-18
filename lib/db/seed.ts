import bcrypt from "bcryptjs";
import { count, eq } from "drizzle-orm";
import { seedArticles } from "@/lib/seed-data";
import { getDb } from "./client";
import { admins, articles } from "./schema";

export async function seedDatabase() {
  const db = getDb();

  const [{ value: adminCount }] = await db.select({ value: count() }).from(admins);
  if (adminCount === 0) {
    const email = (process.env.ADMIN_EMAIL ?? "editor@iris.local").trim().toLowerCase();
    const password = process.env.ADMIN_PASSWORD ?? "iris-editor";
    const name = process.env.ADMIN_NAME ?? "Iris Editor";
    const passwordHash = await bcrypt.hash(password, 12);

    await db.insert(admins).values({
      email,
      passwordHash,
      name,
    });
  }

  const [{ value: articleCount }] = await db.select({ value: count() }).from(articles);
  if (articleCount === 0) {
    for (const article of seedArticles) {
      await db.insert(articles).values({
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
      });
    }
  }
}

export async function ensureSingleFeatured(excludeId?: number) {
  const db = getDb();
  const featured = await db.select().from(articles).where(eq(articles.featured, true));
  if (featured.length <= 1) return;
  for (const row of featured) {
    if (row.id !== excludeId) {
      await db.update(articles).set({ featured: false }).where(eq(articles.id, row.id));
    }
  }
}
