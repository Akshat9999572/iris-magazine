import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  showTagline?: boolean;
};

export function Logo({ className, showTagline = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-3 no-underline", className)}
      aria-label="Iris home"
    >
      <Image
        src="/iris-logo-mark.jpg"
        alt=""
        width={44}
        height={44}
        className="size-11 rounded-full ring-1 ring-iris/20 object-cover"
        priority
      />
      <span className="flex flex-col">
        <span className="font-heading text-2xl font-semibold tracking-tight text-foreground group-hover:text-iris transition-colors">
          Iris
        </span>
        {showTagline ? (
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            ideas in bloom
          </span>
        ) : null}
      </span>
    </Link>
  );
}
