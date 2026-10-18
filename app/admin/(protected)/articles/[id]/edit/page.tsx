import { notFound } from "next/navigation";
import { ArticleEditor } from "@/components/admin/article-editor";
import { getArticleByIdAdmin } from "@/lib/data/articles";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const article = await getArticleByIdAdmin(Number(id));
  return { title: article ? `Edit · ${article.title}` : "Edit article" };
}

export default async function AdminEditArticlePage({ params }: PageProps) {
  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isFinite(id)) notFound();

  const article = await getArticleByIdAdmin(id);
  if (!article) notFound();

  return (
    <div>
      <h1 className="font-serif text-3xl text-foreground">Edit article</h1>
      <p className="mt-2 text-muted-foreground">{article.title}</p>
      <div className="mt-8 border border-grey-light bg-background p-6 sm:p-8">
        <ArticleEditor article={article} />
      </div>
    </div>
  );
}
