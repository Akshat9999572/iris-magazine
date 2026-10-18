import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/articles";
import { cn } from "@/lib/utils";

type ArticleCardProps = {
  article: Article;
  variant?: "lead" | "standard" | "compact";
  className?: string;
};

export function ArticleCard({ article, variant = "standard", className }: ArticleCardProps) {
  const href = `/essays/${article.slug}`;

  if (variant === "compact") {
    return (
      <article className={cn("group", className)}>
        <Link href={href} className="block no-underline hover:opacity-90">
          <h3 className="font-serif text-[22px] font-bold leading-[1.2] font-synthesis-auto text-foreground">
            {article.title}
          </h3>
          <p className="mt-2 text-base text-muted-foreground">{article.author}</p>
        </Link>
      </article>
    );
  }

  if (variant === "lead") {
    return (
      <article className={cn("group", className)}>
        <Link href={href} className="relative mb-5 block aspect-[5/4] overflow-hidden bg-grey-light-bg sm:aspect-[4/3]">
          <Image
            src={article.image.src}
            alt={article.image.alt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </Link>
        <Link href={href} className="no-underline hover:opacity-90">
          <h3 className="font-serif text-[25px] font-bold leading-[1.2] font-synthesis-auto text-foreground">
            {article.title}
          </h3>
        </Link>
        <p className="mt-2 text-base text-muted-foreground">{article.author}</p>
      </article>
    );
  }

  return (
    <article className={cn("group flex flex-col", className)}>
      <Link href={href} className="relative mb-4 block aspect-[5/4] overflow-hidden bg-grey-light-bg">
        <Image
          src={article.image.src}
          alt={article.image.alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
      </Link>
      <Link href={href} className="no-underline hover:opacity-90">
        <h3 className="font-serif text-[22px] font-bold leading-[1.2] font-synthesis-auto text-foreground">
          {article.title}
        </h3>
      </Link>
      <p className="mt-2 line-clamp-3 font-serif text-base leading-snug text-muted-foreground">
        {article.dek}
      </p>
      <p className="mt-3 text-base text-muted-foreground">{article.author}</p>
    </article>
  );
}
