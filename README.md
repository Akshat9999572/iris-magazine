# Iris

**Iris** is a demo long-form magazine site (tagline: *ideas in bloom*), built as an original reconstruction exercise with its own branding, logo, and essays.

Stack: Next.js (App Router), TypeScript, Tailwind CSS v4, shadcn/ui.

## Run locally

```bash
npm install
npm run dev -- --port 43123
```

Open [http://127.0.0.1:43123](http://127.0.0.1:43123).

## Structure

- `app/` — routes (home, section hubs, essays, about)
- `lib/articles.ts` — mock editorial content
- `public/iris-logo-mark.jpg` — Iris logomark
- `public/iris-logo.svg` — favicon / vector mark

Newsletter signup is a client-side demo only; no email is sent.
