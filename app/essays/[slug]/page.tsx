import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/article-card";
import { articles, getArticle } from "@/lib/articles";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.dek,
  };
}

export default async function EssayPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = articles
    .filter((a) => a.section === article.section && a.slug !== article.slug)
    .slice(0, 2);

  return (
    <main className="pb-16">
      <article>
        <div className="border-b border-border bg-muted/20">
          <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
            <Link
              href={`/${article.section}`}
              className="text-xs font-medium uppercase tracking-[0.25em] text-iris hover:underline"
            >
              {article.section}
            </Link>
            <h1 className="mt-4 font-heading text-3xl leading-tight text-foreground sm:text-4xl lg:text-5xl">
              {article.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{article.dek}</p>
            <p className="mt-6 text-sm text-muted-foreground">
              By <span className="font-medium text-foreground">{article.author}</span> ·{" "}
              {article.readMinutes} min read ·{" "}
              {new Date(article.publishedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
          <div className="relative mx-auto aspect-[2/1] max-w-5xl overflow-hidden rounded-t-xl px-4 sm:px-6">
            <div className="relative h-full w-full overflow-hidden rounded-t-xl bg-muted">
              <Image
                src={article.image.src}
                alt={article.image.alt}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
          <div className="prose prose-neutral max-w-none">
            {article.body.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="mb-6 text-lg leading-relaxed text-foreground/90">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </article>

      {related.length > 0 ? (
        <section className="mx-auto max-w-6xl border-t border-border px-4 pt-12 sm:px-6">
          <h2 className="font-heading text-2xl text-foreground">More in {article.section}</h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            {related.map((item) => (
              <ArticleCard key={item.slug} article={item} variant="compact" />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
