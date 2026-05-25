#!/usr/bin/env bash
# Pull vault from GitHub, overlay Quartz customizations, build static site on VPS.
# Quartz engine lives in QUARTZ_DIR; markdown content in CONTENT_DIR.
set -euo pipefail

CONTENT_DIR="${CONTENT_DIR:-/var/www/obsidianNotes}"
QUARTZ_DIR="${QUARTZ_DIR:-/var/www/obsidianNotes-quartz}"
BRANCH="${BRANCH:-master}"
LOG_TAG="quartz-deploy"

log() { echo "[$LOG_TAG] $*"; }

if [[ ! -d "$CONTENT_DIR/.git" ]]; then
  log "ERROR: $CONTENT_DIR is not a git repository"
  exit 1
fi

git config --global --add safe.directory "$CONTENT_DIR" 2>/dev/null || true

cd "$CONTENT_DIR"

# One-time migration: move engine off content dir *before* pull drops tracked Quartz files
if [[ ! -f "$QUARTZ_DIR/package.json" ]] && [[ -f "$CONTENT_DIR/package.json" ]]; then
  log "Migrating Quartz from $CONTENT_DIR to $QUARTZ_DIR"
  mkdir -p "$QUARTZ_DIR"
  for item in quartz node_modules package.json package-lock.json quartz.config.ts quartz.layout.ts globals.d.ts index.d.ts .npm-cache; do
    if [[ -e "$CONTENT_DIR/$item" ]]; then
      mv "$CONTENT_DIR/$item" "$QUARTZ_DIR/"
    fi
  done
fi

BEFORE="$(git rev-parse HEAD)"
git fetch origin "$BRANCH"
git reset --hard "origin/$BRANCH"
AFTER="$(git rev-parse HEAD)"

if [[ ! -f "$QUARTZ_DIR/quartz/bootstrap-cli.mjs" ]]; then
  log "ERROR: Quartz not installed at $QUARTZ_DIR (run bootstrap or copy engine first)"
  exit 1
fi

if [[ ! -d "$CONTENT_DIR/deploy/quartz-custom" ]]; then
  log "ERROR: missing $CONTENT_DIR/deploy/quartz-custom"
  exit 1
fi

rsync -a --delete \
  --exclude node_modules \
  --exclude public \
  --exclude .quartz-cache \
  "$CONTENT_DIR/deploy/quartz-custom/" "$QUARTZ_DIR/"

PUBLIC_DIR="$QUARTZ_DIR/public"
NEEDS_BUILD=false
if [[ "$BEFORE" != "$AFTER" ]]; then
  log "Content updated $BEFORE -> $AFTER"
  NEEDS_BUILD=true
elif [[ ! -f "$PUBLIC_DIR/index.html" ]]; then
  log "$PUBLIC_DIR/index.html missing — rebuilding"
  NEEDS_BUILD=true
else
  log "No content changes on $BRANCH ($AFTER)"
  exit 0
fi

if ! command -v node >/dev/null; then
  log "ERROR: Node.js is required (Quartz needs Node >= 22)"
  exit 1
fi

export HOME="${HOME:-$QUARTZ_DIR}"
export npm_config_cache="${npm_config_cache:-$QUARTZ_DIR/.npm-cache}"
export NODE_OPTIONS="${NODE_OPTIONS:---max-old-space-size=512}"
mkdir -p "$npm_config_cache"

cd "$QUARTZ_DIR"
if [[ ! -d node_modules ]] || [[ ! -f node_modules/.package-lock.json ]] || [[ package-lock.json -nt node_modules/.package-lock.json ]]; then
  npm ci --prefer-offline --no-audit --no-fund
fi

if [[ -f "$CONTENT_DIR/Bibliography/AstroNotes.bib" ]] && [[ -f "$CONTENT_DIR/Bibliography/sources.bib" ]]; then
  cat "$CONTENT_DIR/Bibliography/AstroNotes.bib" "$CONTENT_DIR/Bibliography/sources.bib" >"$CONTENT_DIR/Bibliography/all.bib"
fi

npx quartz build -d "$CONTENT_DIR"
log "Build complete -> $PUBLIC_DIR"
