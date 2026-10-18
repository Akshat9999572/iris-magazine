"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import type { Section } from "@/lib/articles";
import { sections } from "@/lib/articles";
import type { AdminArticle } from "@/lib/data/articles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type ArticleEditorProps = {
  article?: AdminArticle;
};

export function ArticleEditor({ article }: ArticleEditorProps) {
  const router = useRouter();
  const isEdit = Boolean(article);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [slug, setSlug] = useState(article?.slug ?? "");
  const [section, setSection] = useState<Section>(article?.section ?? "ideas");
  const [title, setTitle] = useState(article?.title ?? "");
  const [dek, setDek] = useState(article?.dek ?? "");
  const [author, setAuthor] = useState(article?.author ?? "");
  const [readMinutes, setReadMinutes] = useState(String(article?.readMinutes ?? 8));
  const [publishedAt, setPublishedAt] = useState(article?.publishedAt ?? "2026-10-18");
  const [imageSrc, setImageSrc] = useState(article?.image.src ?? "");
  const [imageAlt, setImageAlt] = useState(article?.image.alt ?? "");
  const [bodyText, setBodyText] = useState(article?.body.join("\n\n") ?? "");
  const [featured, setFeatured] = useState(article?.featured ?? false);
  const [status, setStatus] = useState<"draft" | "published">(article?.status ?? "draft");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      slug,
      section,
      title,
      dek,
      author,
      readMinutes,
      publishedAt,
      imageSrc,
      imageAlt,
      bodyText,
      featured,
      status,
    };

    const url = isEdit ? `/api/admin/articles/${article!.id}` : "/api/admin/articles";
    const method = isEdit ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);
    if (!res.ok) {
      const data = (await res.json()) as { error?: unknown };
      setError(typeof data.error === "string" ? data.error : "Could not save article.");
      return;
    }

    router.push("/admin/articles");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="section">Section</Label>
          <select
            id="section"
            value={section}
            onChange={(e) => setSection(e.target.value as Section)}
            className="h-8 w-full rounded-lg border border-input bg-background px-2.5 text-sm"
          >
            {sections.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="dek">Dek</Label>
          <Textarea id="dek" value={dek} onChange={(e) => setDek(e.target.value)} rows={3} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="author">Author</Label>
          <Input id="author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="readMinutes">Read time (minutes)</Label>
          <Input
            id="readMinutes"
            type="number"
            min={1}
            value={readMinutes}
            onChange={(e) => setReadMinutes(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="publishedAt">Publish date</Label>
          <Input
            id="publishedAt"
            type="date"
            value={publishedAt}
            onChange={(e) => setPublishedAt(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as "draft" | "published")}
            className="h-8 w-full rounded-lg border border-input bg-background px-2.5 text-sm"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="imageSrc">Hero image URL</Label>
          <Input id="imageSrc" value={imageSrc} onChange={(e) => setImageSrc(e.target.value)} required />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="imageAlt">Hero image alt text</Label>
          <Input id="imageAlt" value={imageAlt} onChange={(e) => setImageAlt(e.target.value)} required />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="bodyText">Body (paragraphs separated by a blank line)</Label>
          <Textarea
            id="bodyText"
            value={bodyText}
            onChange={(e) => setBodyText(e.target.value)}
            rows={12}
            required
          />
        </div>
        <label className="flex items-center gap-2 text-sm sm:col-span-2">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="size-4 rounded border-input"
          />
          Feature on homepage
        </label>
      </div>

      {error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving…" : isEdit ? "Update article" : "Create article"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/articles")}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
