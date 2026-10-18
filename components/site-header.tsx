"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/logo";
import { sections } from "@/lib/articles";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navLinks = [
  ...sections.map((s) => ({ href: `/${s.id}`, label: s.label })),
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="relative border-b border-grey-light bg-background">
      <div className="mx-auto flex max-w-[84rem] items-center justify-between px-4 py-4 sm:px-8 lg:px-12">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="shrink-0 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
          <span className="sr-only">Toggle menu</span>
        </Button>

        <div className="hidden flex-1 lg:block" aria-hidden />

        <Logo showTagline centered className="mx-auto lg:mx-0 lg:absolute lg:left-1/2 lg:-translate-x-1/2" />

        <div className="flex flex-1 justify-end">
          <Link
            href="/#newsletter"
            className="hidden text-sm text-foreground hover:underline sm:inline"
          >
            Newsletter
          </Link>
        </div>
      </div>

      <nav
        className="mx-auto hidden max-w-[84rem] border-t border-grey-light px-4 py-3 sm:px-8 lg:flex lg:justify-center lg:gap-8 lg:px-12"
        aria-label="Primary"
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground",
              pathname === link.href && "text-foreground",
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {open ? (
        <nav
          id="mobile-nav"
          className="border-t border-grey-light px-4 py-4 lg:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "font-mono text-sm uppercase tracking-[0.15em]",
                    pathname === link.href ? "text-foreground" : "text-muted-foreground",
                  )}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/#newsletter"
                className="font-mono text-sm uppercase tracking-[0.15em] text-foreground"
                onClick={() => setOpen(false)}
              >
                Newsletter
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
