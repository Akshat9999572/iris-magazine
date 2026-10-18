import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/auth/session";
import { deleteArticle, updateArticle } from "@/lib/data/article-mutations";
import { getArticleByIdAdmin } from "@/lib/data/articles";
import { articleInputSchema, parseBodyText } from "@/lib/validation/article";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: idParam } = await context.params;
  const id = Number(idParam);
  if (!Number.isFinite(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const article = await getArticleByIdAdmin(id);
  if (!article) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ article });
}

export async function PATCH(request: Request, context: RouteContext) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: idParam } = await context.params;
  const id = Number(idParam);
  if (!Number.isFinite(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const existing = await getArticleByIdAdmin(id);
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
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
    const updated = await updateArticle(id, {
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
    revalidatePath(`/essays/${existing.slug}`);
    if (updated.slug !== existing.slug) {
      revalidatePath(`/essays/${updated.slug}`);
    }

    return NextResponse.json({ article: updated });
  } catch {
    return NextResponse.json({ error: "Could not update article." }, { status: 409 });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: idParam } = await context.params;
  const id = Number(idParam);
  if (!Number.isFinite(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const existing = await getArticleByIdAdmin(id);
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await deleteArticle(id);

  revalidatePath("/");
  revalidatePath(`/essays/${existing.slug}`);

  return NextResponse.json({ ok: true });
}
