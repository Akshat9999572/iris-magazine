import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { seedDatabase } from "@/lib/db/seed";
import { admins } from "@/lib/db/schema";

export async function verifyAdminCredentials(email: string, password: string) {
  await seedDatabase();
  const db = getDb();
  const normalized = email.trim().toLowerCase();
  const rows = await db.select().from(admins).where(eq(admins.email, normalized)).limit(1);
  const admin = rows[0];
  if (!admin) return null;
  const valid = await bcrypt.compare(password, admin.passwordHash);
  if (!valid) return null;
  return admin;
}
