# Iris

**Iris** is a demo long-form magazine site (tagline: *ideas in bloom*), with a small editorial CMS backend similar to what a publication like Aeon would run internally.

Stack: Next.js (App Router), TypeScript, Tailwind CSS v4, shadcn/ui, SQLite (`better-sqlite3` + Drizzle-style schema).

## Run locally

```bash
npm install
cp .env.example .env.local   # optional; dev session secret has a fallback
npm run db:seed              # optional locally; production seeds on first request
npm run dev -- --port 43123
```

Requires **Node.js ≥ 20** (Hostinger default 20.20.2 is supported).

- Public site: [http://127.0.0.1:43123](http://127.0.0.1:43123)
- Admin CMS: [http://127.0.0.1:43123/admin/login](http://127.0.0.1:43123/admin/login)

### Default admin (first seed only)

| Field | Value |
|--------|--------|
| Email | `editor@iris.local` |
| Password | `iris-editor` |

Override before the first seed with `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `ADMIN_NAME` in `.env.local`.

## CMS features

- Session-based admin login (httpOnly cookie via `iron-session`)
- CRUD for essays (draft / published)
- Homepage “featured” flag
- Public pages read from SQLite; publishing revalidates the site

## Project layout

- `app/(site)/` — public magazine routes
- `app/admin/` — CMS UI + protected layouts
- `app/api/` — auth + admin JSON API
- `lib/db/` — SQLite client, schema, seed
- `lib/data/` — article queries and mutations
- `data/iris.sqlite` — local database (gitignored)

Newsletter signup on the public site is a client-side demo only; no email is sent.

## Deploy on Hostinger

Step-by-step hPanel instructions (GitHub Web App, env vars, SQLite notes): **[docs/DEPLOY-HOSTINGER.md](docs/DEPLOY-HOSTINGER.md)**.

Copy [hostinger.env.example](hostinger.env.example) into hPanel → **Environment variables** (do not commit real secrets).

## Production notes

Set `SESSION_SECRET` to at least 32 random characters. Change the admin password after first login (re-seed or update the DB). Use a persistent volume for `DATABASE_PATH` if you deploy the app.
