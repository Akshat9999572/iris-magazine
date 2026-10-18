import Link from "next/link";
import { Logo } from "@/components/logo";

export const metadata = {
  title: "About",
  description: "About Iris magazine.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-[46rem] px-4 py-12 sm:px-8 sm:py-16">
      <Logo showTagline />
      <h1 className="mt-10 font-serif text-4xl font-semibold leading-tight text-foreground">
        About Iris
      </h1>
      <div className="mt-8 space-y-6 font-serif text-[1.125rem] leading-[1.75] text-foreground/90">
        <p>
          Iris is a demonstration magazine built as a respectful reconstruction exercise: editorial
          layout and reading patterns inspired by contemporary essay sites, with original writing,
          branding, and artwork.
        </p>
        <p>
          The name refers to both the flower and the aperture — an opening that lets in light. We
          publish slow journalism for readers who want context, not just headlines.
        </p>
      </div>
      <Link href="/" className="mt-10 inline-block text-base text-foreground hover:underline">
        ← Back to home
      </Link>
    </main>
  );
}
