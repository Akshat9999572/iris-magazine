import { NextResponse } from "next/server";
import { z } from "zod";
import { verifyAdminCredentials } from "@/lib/auth/credentials";
import { getAdminSession } from "@/lib/auth/session";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = loginSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Enter a valid email and password." }, { status: 400 });
  }

  const admin = await verifyAdminCredentials(parsed.data.email, parsed.data.password);
  if (!admin) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  const session = await getAdminSession();
  session.adminId = admin.id;
  session.email = admin.email;
  session.name = admin.name;
  session.isLoggedIn = true;
  await session.save();

  return NextResponse.json({
    ok: true,
    admin: { email: admin.email, name: admin.name },
  });
}
