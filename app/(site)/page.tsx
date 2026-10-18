import Image from "next/image";
import Link from "next/link";
import { ArticleCard } from "@/components/article-card";
import { NewsletterForm } from "@/components/newsletter-form";
import { sectionColors, sections } from "@/lib/articles";
import { getFeaturedArticle, listPublishedArticles } from "@/lib/data/articles";

export default async function Home() {
  const articles = await listPublishedArticles();
  const featured = (await getFeaturedArticle()) ?? articles[0];

  if (!featured) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
        <h1 className="font-serif text-4xl text-foreground">Iris</h1>
        <p className="mt-4 text-muted-foreground">No published essays yet. Sign in to the CMS to add content.</p>
        <Link href="/admin/login" className="mt-6 inline-block text-sm hover:underline">
          Admin sign in →
        </Link>
      </main>
    );
  }

  const leadColumn = articles.filter((a) => a.slug !== featured.slug).slice(0, 2);
  const gridArticles = articles.filter((a) => a.slug !== featured.slug).slice(2);

  return (
    <main>
      <section className="mx-auto max-w-[84rem] px-4 pb-12 pt-10 sm:px-8 lg:px-12 lg:pb-16 lg:pt-14">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <Link href={`/essays/${featured.slug}`} className="group block no-underline hover:opacity-95">
              <h1 className="font-serif text-[2.35rem] font-semibold leading-none font-synthesis-auto text-foreground sm:text-5xl lg:text-7xl">
                {featured.title}
              </h1>
            </Link>
            <p className="mt-6 max-w-2xl font-serif text-xl leading-snug text-foreground/85 sm:text-2xl">
              {featured.dek}
            </p>
            <p className="mt-5 text-base text-muted-foreground">{featured.author}</p>
          </div>
          <div className="lg:col-span-5">
            <Link
              href={`/essays/${featured.slug}`}
              className="relative block aspect-[4/5] overflow-hidden bg-grey-light-bg sm:aspect-square lg:aspect-[4/5]"
            >
              <Image
                src={featured.image.src}
                alt={featured.image.alt}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-grey-light">
        <div className="mx-auto grid max-w-[84rem] gap-10 px-4 py-12 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:px-12 lg:py-14">
          <div className="space-y-10 lg:col-span-4">
            {leadColumn.map((article) => (
              <ArticleCard key={article.slug} article={article} variant="lead" />
            ))}
          </div>

          <div className="lg:col-span-4">
            <div className="mb-8 border-b border-grey-light pb-6">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Sections</p>
              <ul className="mt-4 space-y-2">
                {sections.map((section) => (
                  <li key={section.id}>
                    <Link
                      href={`/${section.id}`}
                      style={{ color: sectionColors[section.id] }}
                      className="font-sans text-2xl font-semibold leading-[1.3] hover:underline md:text-[2rem]"
                    >
                      {section.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-8">
              {gridArticles.slice(0, 2).map((article) => (
                <ArticleCard key={article.slug} article={article} variant="compact" />
              ))}
            </div>
          </div>

          <div className="space-y-10 lg:col-span-4">
            {gridArticles.slice(2).map((article) => (
              <ArticleCard key={article.slug} article={article} variant="lead" />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-grey-light bg-grey-light-bg/60">
        <div className="mx-auto max-w-[84rem] px-4 py-12 sm:px-8 lg:px-12 lg:py-16">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
            {articles.slice(0, 3).map((article) => (
              <ArticleCard key={`bottom-${article.slug}`} article={article} variant="standard" />
            ))}
          </div>
        </div>
      </section>

      <section id="newsletter" className="scroll-mt-28 border-t border-grey-light py-14 lg:py-16">
        <div className="mx-auto flex max-w-[84rem] justify-center px-4 sm:px-8 lg:px-12">
          <NewsletterForm />
        </div>
      </section>
    </main>
  );
}
