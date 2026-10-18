import Link from "next/link";
import { Logo } from "@/components/logo";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-grey-light bg-background">
      <div className="mx-auto grid max-w-[84rem] gap-12 px-4 py-14 sm:px-8 lg:grid-cols-[1.4fr_1fr] lg:px-12">
        <div>
          <Logo showTagline />
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
            Iris publishes long-form essays for readers who want depth, context, and unhurried
            thinking — original writing, independent of the daily news cycle.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 text-base">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Sections
            </p>
            <ul className="space-y-2 text-foreground">
              <li>
                <Link href="/ideas" className="hover:underline">
                  Ideas
                </Link>
              </li>
              <li>
                <Link href="/culture" className="hover:underline">
                  Culture
                </Link>
              </li>
              <li>
                <Link href="/nature" className="hover:underline">
                  Nature
                </Link>
              </li>
              <li>
                <Link href="/science" className="hover:underline">
                  Science
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Iris
            </p>
            <ul className="space-y-2 text-foreground">
              <li>
                <Link href="/about" className="hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link href="/#newsletter" className="hover:underline">
                  Newsletter
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-grey-light py-5 text-center text-xs text-muted-foreground">
        © 2026 Iris Magazine
      </div>
    </footer>
  );
}
