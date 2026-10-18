#!/usr/bin/env bash
set -euo pipefail

REPO_NAME="${1:-iris-magazine}"
VISIBILITY="${2:-public}"

if ! command -v gh >/dev/null 2>&1; then
  echo "GitHub CLI (gh) is required." >&2
  exit 1
fi

if ! gh auth status >/dev/null 2>&1; then
  echo "Not logged into GitHub. Run: gh auth login -h github.com -p https -w" >&2
  echo "Or set GH_TOKEN with repo scope." >&2
  exit 1
fi

if git remote get-url github >/dev/null 2>&1; then
  git remote remove github
fi

if [ "$VISIBILITY" = "private" ]; then
  gh repo create "$REPO_NAME" --private --source=. --remote=github --push \
    --description "Iris magazine — Next.js editorial site with admin CMS"
else
  gh repo create "$REPO_NAME" --public --source=. --remote=github --push \
    --description "Iris magazine — Next.js editorial site with admin CMS"
fi

echo "Done. Repository: $(gh repo view "$REPO_NAME" --json url -q .url)"
