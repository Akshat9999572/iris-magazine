import Link from "next/link";
import { Logo } from "@/components/logo";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-muted/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Iris is an independent magazine of long-form essays and reported ideas.
            Original writing for readers who prefer depth over speed.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6 text-sm">
          <div>
            <p className="mb-2 font-semibold text-foreground">Sections</p>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/ideas" className="hover:text-iris">
                  Ideas
                </Link>
              </li>
              <li>
                <Link href="/culture" className="hover:text-iris">
                  Culture
                </Link>
              </li>
              <li>
                <Link href="/nature" className="hover:text-iris">
                  Nature
                </Link>
              </li>
              <li>
                <Link href="/science" className="hover:text-iris">
                  Science
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="mb-2 font-semibold text-foreground">Iris</p>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-iris">
                  About
                </Link>
              </li>
              <li>
                <Link href="/#newsletter" className="hover:text-iris">
                  Newsletter
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © 2026 Iris Magazine. Demo reconstruction for learning.
      </div>
    </footer>
  );
}
