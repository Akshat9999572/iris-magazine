import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  showTagline?: boolean;
  centered?: boolean;
};

export function Logo({ className, showTagline = false, centered = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex flex-col no-underline hover:opacity-80 transition-opacity",
        centered && "items-center text-center",
        className,
      )}
      aria-label="Iris home"
    >
      <span className="font-serif text-[2rem] font-semibold leading-none tracking-tight text-foreground sm:text-[2.35rem]">
        Iris
      </span>
      {showTagline ? (
        <span className="mt-1.5 font-mono text-[11px] font-normal uppercase tracking-[0.28em] text-muted-foreground">
          ideas in bloom
        </span>
      ) : null}
    </Link>
  );
}
