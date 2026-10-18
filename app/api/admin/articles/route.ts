import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/auth/session";
import { createArticle } from "@/lib/data/article-mutations";
import { listAllArticlesAdmin } from "@/lib/data/articles";
import { articleInputSchema, parseBodyText } from "@/lib/validation/article";

export async function GET() {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const articles = await listAllArticlesAdmin();
  return NextResponse.json({ articles });
}

export async function POST(request: Request) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = articleInputSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const body = parseBodyText(parsed.data.bodyText);
  if (body.length === 0) {
    return NextResponse.json({ error: "Add at least one paragraph in the body." }, { status: 400 });
  }

  try {
    const created = await createArticle({
      slug: parsed.data.slug,
      section: parsed.data.section,
      title: parsed.data.title,
      dek: parsed.data.dek,
      author: parsed.data.author,
      readMinutes: parsed.data.readMinutes,
      publishedAt: parsed.data.publishedAt,
      imageSrc: parsed.data.imageSrc,
      imageAlt: parsed.data.imageAlt,
      body,
      featured: parsed.data.featured ?? false,
      status: parsed.data.status,
    });

    revalidatePath("/");
    revalidatePath("/ideas");
    revalidatePath("/culture");
    revalidatePath("/nature");
    revalidatePath("/science");
    if (created.status === "published") {
      revalidatePath(`/essays/${created.slug}`);
    }

    return NextResponse.json({ article: created }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Could not create article. Slug may already exist." }, { status: 409 });
  }
}
