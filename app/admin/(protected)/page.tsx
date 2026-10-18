import Link from "next/link";
import { listAllArticlesAdmin } from "@/lib/data/articles";

export const metadata = {
  title: "Admin",
};

export default async function AdminDashboardPage() {
  const articles = await listAllArticlesAdmin();
  const published = articles.filter((a) => a.status === "published").length;
  const drafts = articles.filter((a) => a.status === "draft").length;

  return (
    <div>
      <h1 className="font-serif text-3xl text-foreground">Dashboard</h1>
      <p className="mt-2 text-muted-foreground">Overview of editorial content stored in the local SQLite backend.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="border border-grey-light bg-background p-5">
          <p className="text-sm text-muted-foreground">Published</p>
          <p className="mt-1 text-3xl font-semibold">{published}</p>
        </div>
        <div className="border border-grey-light bg-background p-5">
          <p className="text-sm text-muted-foreground">Drafts</p>
          <p className="mt-1 text-3xl font-semibold">{drafts}</p>
        </div>
        <div className="border border-grey-light bg-background p-5">
          <p className="text-sm text-muted-foreground">Total</p>
          <p className="mt-1 text-3xl font-semibold">{articles.length}</p>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/admin/articles/new"
          className="inline-flex h-9 items-center rounded-lg bg-foreground px-4 text-sm font-medium text-background hover:opacity-90"
        >
          New article
        </Link>
        <Link
          href="/admin/articles"
          className="inline-flex h-9 items-center rounded-lg border border-grey-light bg-background px-4 text-sm hover:bg-grey-light-bg"
        >
          Manage articles
        </Link>
      </div>
    </div>
  );
}
