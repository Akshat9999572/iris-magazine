import { ArticleEditor } from "@/components/admin/article-editor";

export const metadata = {
  title: "New article",
};

export default function AdminNewArticlePage() {
  return (
    <div>
      <h1 className="font-serif text-3xl text-foreground">New article</h1>
      <p className="mt-2 text-muted-foreground">Drafts stay off the public site until you publish them.</p>
      <div className="mt-8 border border-grey-light bg-background p-6 sm:p-8">
        <ArticleEditor />
      </div>
    </div>
  );
}
