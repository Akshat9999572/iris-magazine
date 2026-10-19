import bcrypt from "bcryptjs";
import { seedDatabase } from "@/lib/db/seed";
import { getStore } from "@/lib/db/store";

export async function verifyAdminCredentials(email: string, password: string) {
  await seedDatabase();
  const store = getStore();
  const normalized = email.trim().toLowerCase();
  const admin = store.admins.find((row) => row.email === normalized);
  if (!admin) return null;
  const valid = await bcrypt.compare(password, admin.passwordHash);
  if (!valid) return null;
  return admin;
}
