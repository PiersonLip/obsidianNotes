#!/usr/bin/env bash
# Pull latest vault from GitHub and rebuild the Quartz site.
# Intended to run on the VPS via systemd timer (every 5 minutes).
set -euo pipefail

REPO_DIR="${REPO_DIR:-/var/www/obsidianNotes}"
BRANCH="${BRANCH:-master}"
LOG_TAG="quartz-deploy"

log() { echo "[$LOG_TAG] $*"; }

if [[ ! -d "$REPO_DIR/.git" ]]; then
  log "ERROR: $REPO_DIR is not a git repository"
  exit 1
fi

cd "$REPO_DIR"

# Required when repo is owned by www-data but script runs as root
git config --global --add safe.directory "$REPO_DIR" 2>/dev/null || true

BEFORE="$(git rev-parse HEAD)"
git fetch origin "$BRANCH"
git reset --hard "origin/$BRANCH"
AFTER="$(git rev-parse HEAD)"

NEEDS_BUILD=false
if [[ "$BEFORE" != "$AFTER" ]]; then
  log "Updated $BEFORE -> $AFTER"
  NEEDS_BUILD=true
elif [[ ! -f public/index.html ]]; then
  log "public/index.html missing — rebuilding"
  NEEDS_BUILD=true
else
  log "No changes on $BRANCH ($AFTER)"
  exit 0
fi

if ! command -v node >/dev/null; then
  log "ERROR: Node.js is required (Quartz needs Node >= 22)"
  exit 1
fi

export HOME="${HOME:-$REPO_DIR}"
export npm_config_cache="${npm_config_cache:-$REPO_DIR/.npm-cache}"
export NODE_OPTIONS="${NODE_OPTIONS:---max-old-space-size=512}"
mkdir -p "$npm_config_cache"

if [[ ! -d node_modules ]] || [[ ! -f node_modules/.package-lock.json ]] || [[ package-lock.json -nt node_modules/.package-lock.json ]]; then
  npm ci --prefer-offline --no-audit --no-fund
fi
npm run build

log "Build complete -> $REPO_DIR/public"
