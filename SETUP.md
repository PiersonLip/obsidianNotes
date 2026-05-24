---
category: meta
tags:
  - astro-notes/meta
---

# Obsidian setup

**Full reference:** [[memory]] (layout, tags, frontmatter, QuickAdd macros).

## Open the vault

`/home/pierson/obsidianTesting/Astro Notes` — start at [[Home]].

## Essentials

1. **Citations** — Zotero Integration → `Bibliography/AstroNotes.bib` + `Bibliography/sources.bib`; write `[@citekey]` in notes.
2. **New Astrobite** — **QuickAdd: Run** → **New Astrobite Note** (script: `Scripts/new-astrobite.js`). Reload Obsidian after QuickAdd config changes.
3. **Glossary** — **QuickAdd: New Glossary Term** or link `[[TESS]]` manually (`Glossary/`, tag `#glossary`; see [[memory]]).
4. **Math** — Latex Suite; display math `$$…$$`.

## Hubs

- [[Class Notes/Astro210/Astro210]] — class topics (`#astro210`)
- [[Physics of Binary Star Evolution/Physics of Binary Star Evolution]] — book chapters

## Publishing (Quartz on VPS)

Vault repo: [PiersonLip/obsidianNotes](https://github.com/PiersonLip/obsidianNotes). Quartz builds this vault to static HTML; the VPS pulls and rebuilds on a timer.

### Obsidian Git (local → GitHub)

In **Settings → Obsidian Git**:

| Setting | Value |
|---------|--------|
| Vault backup interval | `5` (minutes) — or keep *backup after file change* |
| Auto push interval | `5` (minutes) |
| Auto pull on startup | on |
| Pull before push | on |

[Plugin docs](https://github.com/denolehov/obsidian-git)

### Local preview

```bash
cd "/home/pierson/obsidianTesting/Astro Notes"
npm ci
npm run serve   # http://localhost:8080
```

### VPS one-time setup

```bash
# Node 22+ required (https://quartz.jzhao.xyz/)
sudo mkdir -p /var/www
sudo git clone https://github.com/PiersonLip/obsidianNotes.git /var/www/obsidianNotes
sudo chown -R www-data:www-data /var/www/obsidianNotes

cd /var/www/obsidianNotes
sudo -u www-data npm ci
sudo -u www-data npm run build

# Web server — pick Caddy or nginx (examples in deploy/)
sudo cp deploy/Caddyfile /etc/caddy/Caddyfile   # or merge into existing file
sudo systemctl reload caddy

# Rebuild every 5 minutes when GitHub has new commits
sudo cp deploy/quartz-deploy.{service,timer} /etc/systemd/system/
sudo chmod +x deploy/vps-build.sh
sudo systemctl daemon-reload
sudo systemctl enable --now quartz-deploy.timer
```

Site URL: `https://obsidianNotes.piersonl.com` (set in `quartz.config.ts` → `baseUrl`).

After Zotero exports `Bibliography/AstroNotes.bib`, refresh the merged cite file:

```bash
cat Bibliography/AstroNotes.bib Bibliography/sources.bib > Bibliography/all.bib
```

Pull Quartz upstream updates: `git remote add upstream https://github.com/jackyzha0/quartz.git` then merge `upstream/v4` when needed.
