import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/article-card";
import { articles, getArticle, sectionColors } from "@/lib/articles";

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
    <main className="pb-20">
      <article>
        <header className="mx-auto max-w-[46rem] px-4 pt-12 sm:px-8 lg:pt-16">
          <Link
            href={`/${article.section}`}
            style={{ color: sectionColors[article.section] }}
            className="font-mono text-xs uppercase tracking-[0.2em] hover:underline"
          >
            {article.section}
          </Link>
          <h1 className="mt-5 font-serif text-[2rem] font-semibold leading-[1.08] font-synthesis-auto text-foreground sm:text-5xl lg:text-[3.25rem]">
            {article.title}
          </h1>
          <p className="mt-6 font-serif text-xl leading-snug text-foreground/80">{article.dek}</p>
          <p className="mt-6 text-base text-muted-foreground">
            <span className="text-foreground">{article.author}</span> · {article.readMinutes} min
            read ·{" "}
            {new Date(article.publishedAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </header>

        <div className="relative mx-auto mt-10 aspect-[16/10] max-w-[84rem] overflow-hidden bg-grey-light-bg px-4 sm:px-8 lg:px-12">
          <div className="relative mx-auto h-full max-w-[68rem] overflow-hidden">
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

        <div className="mx-auto max-w-[46rem] px-4 py-12 sm:px-8">
          {article.body.map((paragraph) => (
            <p
              key={paragraph.slice(0, 32)}
              className="mb-6 font-serif text-[1.125rem] leading-[1.75] text-foreground/90"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </article>

      {related.length > 0 ? (
        <section className="mx-auto max-w-[84rem] border-t border-grey-light px-4 pt-12 sm:px-8 lg:px-12">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            More in {article.section}
          </h2>
          <div className="mt-8 grid gap-10 sm:grid-cols-2">
            {related.map((item) => (
              <ArticleCard key={item.slug} article={item} variant="compact" />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
