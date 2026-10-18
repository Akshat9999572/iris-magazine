import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/articles";
import { cn } from "@/lib/utils";

type ArticleCardProps = {
  article: Article;
  variant?: "default" | "compact";
  className?: string;
};

export function ArticleCard({ article, variant = "default", className }: ArticleCardProps) {
  const href = `/essays/${article.slug}`;

  if (variant === "compact") {
    return (
      <article className={cn("group", className)}>
        <Link href={href} className="block no-underline">
          <h3 className="font-heading text-lg font-semibold leading-snug text-foreground group-hover:text-iris transition-colors">
            {article.title}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">{article.author}</p>
        </Link>
      </article>
    );
  }

  return (
    <article className={cn("group flex flex-col", className)}>
      <Link href={href} className="relative mb-4 block aspect-[4/3] overflow-hidden rounded-lg bg-muted">
        <Image
          src={article.image.src}
          alt={article.image.alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </Link>
      <p className="text-xs font-medium uppercase tracking-widest text-iris">{article.section}</p>
      <Link href={href} className="no-underline">
        <h3 className="mt-2 font-heading text-xl font-semibold leading-snug text-foreground group-hover:text-iris transition-colors">
          {article.title}
        </h3>
      </Link>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{article.dek}</p>
      <p className="mt-3 text-sm text-muted-foreground">
        {article.author} · {article.readMinutes} min read
      </p>
    </article>
  );
}
