# Deploy Iris on Hostinger

Iris is a **Next.js 16** app with **SQLite** (`better-sqlite3`) and an admin CMS. Hostinger’s managed **Node.js Web App** flow is the simplest path (Business or Cloud plan with Web Apps).

Official references:

- [Next.js on Hostinger](https://docs.hostinger.com/node.js/overview-1/next)
- [Create a Node.js app](https://docs.hostinger.com/node.js/creating-an-app)
- [Environment variables](https://docs.hostinger.com/node.js/environment-variables)

## Before you deploy

1. **Put the code on GitHub** (Hostinger connects via the Hostinger GitHub App). Push this repository to a GitHub repo you control.
2. **Generate secrets** (keep these out of git):

```bash
openssl rand -base64 32
```

Use that value for `SESSION_SECRET` in hPanel.

## hPanel: Node.js Web App (recommended)

1. Log in to **hPanel** → **Websites** → **Add Website** → **Node.js web app**.
2. **Import Git repository** → connect GitHub → select your Iris repo → branch `main`.
3. Confirm Hostinger detects **Next.js** (application type `next`). Suggested settings:

| Setting | Value |
|--------|--------|
| Node.js version | **22** or **24** — **not 20**. This repo requires **Node ≥ 22.13** (`better-sqlite3`, `iron-session`, `cn`). |
| Build command | `build` |
| Output directory | `.next` |
| Start | (Hostinger runs the standalone Next server automatically) |

> If the build log shows `EBADENGINE` for Node 20.x, open **Deploy settings** and change **Node.js version** to **22**, then redeploy. A failed `prebuild` / `db:seed` step is no longer used; the database is created on first request at runtime.

4. **Environment variables** (required):

| Key | Value |
|-----|--------|
| `SESSION_SECRET` | Your 32+ character random string |
| `ADMIN_EMAIL` | e.g. `editor@yourdomain.com` |
| `ADMIN_PASSWORD` | Strong password (used only when the DB has no admin yet) |
| `ADMIN_NAME` | Display name for CMS |
| `NODE_ENV` | `production` |

Optional:

| Key | Value |
|-----|--------|
| `DATABASE_PATH` | Absolute path if Hostinger gives you persistent storage outside the app root |

5. Click **Deploy**. Wait for the build log to finish (`npm install` → `npm run build`).

6. Open your assigned URL → public site. Admin: `https://your-domain/admin/login`.

### After first deploy

- The SQLite file lives under `data/iris.sqlite` in the app workspace. On redeploy, Hostinger usually **keeps** app files on the same Web App; if you ever lose the database, set `ADMIN_*` again and redeploy (empty DB re-seeds).
- Change the default password by updating the admin row or redeploying with a fresh DB and new `ADMIN_PASSWORD` before first boot.

## Build notes (this repo)

- `next.config.ts` exports a **plain object** (required by Hostinger’s standalone merge).
- `output: "standalone"` is set for VPS/manual deploys; Hostinger also enforces standalone for `next` apps.
- **No `prebuild` seed** — do not add `npm run db:seed` before `next build`. Seeding runs automatically on first app request when the DB is empty (`lib/db/seed.ts`).
- `.npmrc` sets `engine-strict=true` so installs fail fast on Node 20 instead of breaking on native modules.

## VPS (manual)

If you use a **Hostinger VPS** instead of Web Apps:

```bash
# On the server (Node 22+)
git clone <your-repo> iris && cd iris
npm ci
npm run build
cp -r public .next/standalone/
cp -r .next/static .next/standalone/.next/

export SESSION_SECRET='...'
export ADMIN_EMAIL='...'
export ADMIN_PASSWORD='...'
export PORT=3000
export HOSTNAME=127.0.0.1
node .next/standalone/server.js
```

Use **PM2** + **Nginx** reverse proxy + HTTPS (see Hostinger’s Node VPS tutorials).

## Troubleshooting

| Symptom | Fix |
|--------|-----|
| Build fails on `better-sqlite3` / `EBADENGINE` | Set Node.js **22** (≥ 22.13) in hPanel deploy settings and redeploy. |
| Old log mentions `prebuild` / `db:seed` | Pull latest `main` — prebuild was removed. |
| Admin login always fails | Set `SESSION_SECRET` in hPanel and redeploy; check email/password match seed env. |
| Empty public site | Publish articles in CMS or confirm seed ran (visit `/admin` after login). |
| “SESSION_SECRET must be set…” | Add `SESSION_SECRET` (32+ chars) in Environment variables and redeploy. |

## What we cannot do from this agent

Deploying to **your** Hostinger account requires **your** hPanel login or GitHub connection. Complete the hPanel steps above after pushing this repo to GitHub.
