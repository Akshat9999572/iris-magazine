import Link from "next/link";
import { redirect } from "next/navigation";
import { LogoutButton } from "@/components/admin/logout-button";
import { getAdminSession } from "@/lib/auth/session";

export default async function AdminProtectedLayout({ children }: LayoutProps<"/admin">) {
  const session = await getAdminSession();
  if (!session.isLoggedIn) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-grey-light-bg/40">
      <header className="border-b border-grey-light bg-background">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">Iris CMS</p>
            <p className="text-sm text-foreground">{session.name ?? session.email}</p>
          </div>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/admin" className="hover:underline">
              Dashboard
            </Link>
            <Link href="/admin/articles" className="hover:underline">
              Articles
            </Link>
            <Link href="/" className="text-muted-foreground hover:text-foreground hover:underline">
              View site
            </Link>
            <LogoutButton />
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">{children}</main>
    </div>
  );
}
