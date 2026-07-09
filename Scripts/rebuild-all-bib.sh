#!/usr/bin/env bash
# Merge vault bibliographies for Pandoc Reference List / Quartz.
set -euo pipefail
root="$(cd "$(dirname "$0")/.." && pwd)"
cat "$root/Bibliography/AstroNotes.bib" "$root/Bibliography/sources.bib" > "$root/Bibliography/all.bib" 2>/dev/null \
  || cat "$root/Bibliography/AstroNotes.bib" > "$root/Bibliography/all.bib"
echo "Wrote $root/Bibliography/all.bib"
