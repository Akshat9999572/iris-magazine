import Link from "next/link";
import { listAllArticlesAdmin } from "@/lib/data/articles";

export const metadata = {
  title: "Articles",
};

export default async function AdminArticlesPage() {
  const articles = await listAllArticlesAdmin();

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-foreground">Articles</h1>
          <p className="mt-2 text-muted-foreground">Create drafts, publish essays, and set the homepage feature.</p>
        </div>
        <Link
          href="/admin/articles/new"
          className="inline-flex h-9 items-center rounded-lg bg-foreground px-4 text-sm font-medium text-background hover:opacity-90"
        >
          New article
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto border border-grey-light bg-background">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-grey-light bg-grey-light-bg/80 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Section</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Updated</th>
              <th className="px-4 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.id} className="border-b border-grey-light last:border-0">
                <td className="px-4 py-3">
                  <p className="font-medium text-foreground">{article.title}</p>
                  <p className="text-xs text-muted-foreground">/{article.slug}</p>
                </td>
                <td className="px-4 py-3 capitalize text-muted-foreground">{article.section}</td>
                <td className="px-4 py-3">
                  <span
                    className={
                      article.status === "published"
                        ? "font-mono text-xs uppercase tracking-wide text-foreground"
                        : "font-mono text-xs uppercase tracking-wide text-muted-foreground"
                    }
                  >
                    {article.status}
                    {article.featured ? " · featured" : ""}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{article.updatedAt.replace("T", " ").slice(0, 16)}</td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/articles/${article.id}/edit`} className="hover:underline">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {articles.length === 0 ? (
          <p className="px-4 py-8 text-center text-muted-foreground">No articles yet.</p>
        ) : null}
      </div>
    </div>
  );
}
