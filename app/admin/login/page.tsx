import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin/login-form";
import { getAdminSession } from "@/lib/auth/session";

export const metadata = {
  title: "Admin sign in",
};

export const instant = false;

export default async function AdminLoginPage() {
  const session = await getAdminSession();
  if (session.isLoggedIn) {
    redirect("/admin");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-md border border-grey-light bg-background p-8 sm:p-10">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Iris CMS</p>
        <h1 className="mt-2 font-serif text-3xl text-foreground">Editorial sign in</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Manage essays, drafts, and homepage featuring — the kind of backend a magazine site runs
          behind the scenes.
        </p>
        <div className="mt-8">
          <AdminLoginForm />
        </div>
        <p className="mt-8 text-center text-xs text-muted-foreground">
          Local default: <code className="text-foreground">editor@iris.local</code> /{" "}
          <code className="text-foreground">iris-editor</code>
        </p>
        <p className="mt-4 text-center text-sm">
          <Link href="/" className="text-foreground hover:underline">
            ← Back to Iris
          </Link>
        </p>
      </div>
    </main>
  );
}
