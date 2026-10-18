import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/article-card";
import {
  getArticlesBySection,
  sectionColors,
  sections,
  type Section,
} from "@/lib/articles";

type PageProps = {
  params: Promise<{ section: string }>;
};

function isSection(value: string): value is Section {
  return sections.some((s) => s.id === value);
}

export async function generateStaticParams() {
  return sections.map((s) => ({ section: s.id }));
}

export async function generateMetadata({ params }: PageProps) {
  const { section: sectionId } = await params;
  const section = sections.find((s) => s.id === sectionId);
  if (!section) return {};
  return {
    title: section.label,
    description: section.description,
  };
}

export default async function SectionPage({ params }: PageProps) {
  const { section: sectionId } = await params;
  if (!isSection(sectionId)) notFound();

  const section = sections.find((s) => s.id === sectionId)!;
  const items = getArticlesBySection(sectionId);

  return (
    <main className="mx-auto max-w-[84rem] px-4 py-12 sm:px-8 lg:px-12 lg:py-16">
      <p
        style={{ color: sectionColors[sectionId] }}
        className="font-mono text-xs uppercase tracking-[0.2em]"
      >
        Section
      </p>
      <h1 className="mt-3 font-serif text-5xl font-semibold leading-none text-foreground">
        {section.label}
      </h1>
      <p className="mt-5 max-w-2xl font-serif text-xl leading-snug text-muted-foreground">
        {section.description}
      </p>

      {items.length === 0 ? (
        <p className="mt-14 text-base text-muted-foreground">Essays coming soon in this section.</p>
      ) : (
        <div className="mt-14 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((article) => (
            <ArticleCard key={article.slug} article={article} variant="standard" />
          ))}
        </div>
      )}
    </main>
  );
}
