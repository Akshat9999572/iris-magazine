import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/article-card";
import { getArticlesBySection, sections, type Section } from "@/lib/articles";

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
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-xs font-medium uppercase tracking-[0.25em] text-iris">Section</p>
      <h1 className="mt-3 font-heading text-4xl text-foreground">{section.label}</h1>
      <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{section.description}</p>

      {items.length === 0 ? (
        <p className="mt-12 text-muted-foreground">Essays coming soon in this section.</p>
      ) : (
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      )}
    </main>
  );
}
