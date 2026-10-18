import { z } from "zod";

const sectionSchema = z.enum(["ideas", "culture", "nature", "science"]);

export const articleInputSchema = z.object({
  slug: z
    .string()
    .min(2)
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens."),
  section: sectionSchema,
  title: z.string().min(4).max(240),
  dek: z.string().min(10).max(500),
  author: z.string().min(2).max(120),
  readMinutes: z.coerce.number().int().min(1).max(120),
  publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  imageSrc: z.string().url(),
  imageAlt: z.string().min(2).max(240),
  bodyText: z.string().min(20),
  featured: z.boolean().optional().default(false),
  status: z.enum(["draft", "published"]).default("draft"),
});

export function parseBodyText(bodyText: string): string[] {
  return bodyText
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}
