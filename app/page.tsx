import Image from "next/image";
import Link from "next/link";
import { ArticleCard } from "@/components/article-card";
import { NewsletterForm } from "@/components/newsletter-form";
import { articles, getFeaturedArticle } from "@/lib/articles";

export default function Home() {
  const featured = getFeaturedArticle();
  const rest = articles.filter((a) => a.slug !== featured.slug);

  return (
    <main>
      <section className="border-b border-border bg-linear-to-b from-iris-muted/80 to-background">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-16">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-iris">Featured essay</p>
            <Link href={`/essays/${featured.slug}`} className="mt-4 block no-underline group">
              <h1 className="font-heading text-3xl font-normal leading-tight text-foreground sm:text-4xl lg:text-5xl group-hover:text-iris transition-colors">
                {featured.title}
              </h1>
            </Link>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">{featured.dek}</p>
            <p className="mt-6 text-sm font-medium text-foreground">
              {featured.author}{" "}
              <span className="font-normal text-muted-foreground">· {featured.readMinutes} min read</span>
            </p>
            <Link
              href={`/essays/${featured.slug}`}
              className="mt-6 inline-flex text-sm font-semibold text-iris hover:underline"
            >
              Read essay →
            </Link>
          </div>
          <Link
            href={`/essays/${featured.slug}`}
            className="relative block aspect-[4/3] overflow-hidden rounded-xl bg-muted shadow-lg ring-1 ring-border"
          >
            <Image
              src={featured.image.src}
              alt={featured.image.alt}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="mb-10 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-heading text-3xl text-foreground">Latest</h2>
            <p className="mt-1 text-muted-foreground">New and noteworthy from across Iris.</p>
          </div>
          <Link href="/ideas" className="text-sm font-semibold text-iris hover:underline">
            Browse Ideas →
          </Link>
        </div>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      <section
        id="newsletter"
        className="border-t border-border bg-muted/30 py-14 scroll-mt-24"
      >
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <NewsletterForm />
        </div>
      </section>
    </main>
  );
}
