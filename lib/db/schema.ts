import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const admins = sqliteTable("admins", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: text("name").notNull(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(datetime('now'))`),
});

export const articles = sqliteTable("articles", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  section: text("section").notNull(),
  title: text("title").notNull(),
  dek: text("dek").notNull(),
  author: text("author").notNull(),
  readMinutes: integer("read_minutes").notNull(),
  publishedAt: text("published_at").notNull(),
  imageSrc: text("image_src").notNull(),
  imageAlt: text("image_alt").notNull(),
  bodyJson: text("body_json").notNull(),
  featured: integer("featured", { mode: "boolean" }).notNull().default(false),
  status: text("status", { enum: ["draft", "published"] })
    .notNull()
    .default("draft"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(datetime('now'))`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(datetime('now'))`),
});

export type DbArticle = typeof articles.$inferSelect;
export type DbAdmin = typeof admins.$inferSelect;
