import type { SessionOptions } from "iron-session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export type AdminSession = {
  adminId?: number;
  email?: string;
  name?: string;
  isLoggedIn: boolean;
};

function sessionPassword(): string {
  const secret = process.env.SESSION_SECRET;
  if (secret && secret.length >= 32) return secret;
  if (process.env.NODE_ENV === "production" && process.env.NEXT_RUNTIME) {
    throw new Error("SESSION_SECRET must be set to at least 32 characters in production.");
  }
  return "dev-only-iris-session-secret-32chars-min";
}

function adminSessionOptions(): SessionOptions {
  return {
    password: sessionPassword(),
    cookieName: "iris_admin_session",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    },
  };
}

export async function getAdminSession() {
  return getIronSession<AdminSession>(await cookies(), adminSessionOptions());
}

export async function requireAdminSession() {
  const session = await getAdminSession();
  if (!session.isLoggedIn || !session.adminId) {
    return null;
  }
  return session;
}
