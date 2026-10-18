import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "About",
  description: "About Iris magazine.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="flex items-center gap-4">
        <Image src="/iris-logo-mark.jpg" alt="" width={72} height={72} className="size-[4.5rem] rounded-full ring-1 ring-iris/25 object-cover" />
        <div>
          <h1 className="font-heading text-4xl text-foreground">About Iris</h1>
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">ideas in bloom</p>
        </div>
      </div>
      <div className="mt-8 space-y-5 text-lg leading-relaxed text-foreground/90">
        <p>
          Iris is a demonstration magazine built as a respectful reconstruction exercise: editorial
          layout and reading patterns inspired by contemporary essay sites, with{" "}
          <strong className="font-medium text-foreground">original writing, branding, and artwork</strong>.
        </p>
        <p>
          The name Iris refers to both the flower and the aperture — a opening that lets in light.
          We publish slow journalism for readers who want context, not just headlines.
        </p>
      </div>
      <Link href="/" className="mt-10 inline-flex text-sm font-semibold text-iris hover:underline">
        ← Back to home
      </Link>
    </main>
  );
}
