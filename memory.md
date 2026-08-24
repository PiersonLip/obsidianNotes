---
category: meta
tags:
  - astro-notes/meta
---

# Astro Notes — project memory

Canonical reference for this vault’s layout, tags, frontmatter, and macros. Update here when adding note types or automation.

**Vault:** `/home/pierson/obsidianTesting/Astro Notes`  
**Entry point:** [[Home]] · [[SETUP]]

---

## Vault layout

```
Astro Notes/
├── memory.md               # this file
├── Astronomy/
│   ├── AstroBites/         # one note per article; [[Astronomy/AstroBites/Astrobites]] = index
│   ├── Astro Glossary/     # one note per term (wikilink targets)
│   ├── General Notes/      # misc topic notes
│   └── Physics of Binary Star Evolution/   # book hub + chapter notes
├── Research/
│   ├── Meetings/           # weekly research meetings
│   ├── Paper Notes/        # one note per paper
│   └── POSYDON/            # POSYDON tooling / docs
├── Class Notes/            # [[Class Notes/Class Notes]] course index
├── Class Notes/Astro210/   # [[Class Notes/Astro210/Astro210]] topic index
├── Programming/            # python / bash notes
├── Wikipedia/              # Wikipedia article notes
├── Bibliography/           # AstroNotes.bib (Zotero) + sources.bib (manual/Astrobites)
├── Attachments/            # figures (PNG)
├── Scripts/                # QuickAdd user scripts
└── Bases/                  # Astro Glossary, Papers, Astrobites, Binary book, Astro210, Class Notes
```

---

## Note types & frontmatter

Every note gets `category` plus auto-style tags `astro-notes/<category>`. Add extra tags in YAML when useful (e.g. `#astro210`).

### Astrobites (`Astronomy/AstroBites/<Article title>.md`)

```yaml
astrobites-url: "https://astrobites.org/..."
citekey: Amen2026
tags:
  - astro-notes/astrobite
```

Body pattern:

- `# Title [@citekey]`
- `---` (horizontal rule under the title)
- `[Astrobites post](url)` below the rule
- Body starts after the link line; add your own sections as needed.
- Wikilinks to glossary: `[[TESS]]`, `[[PISN]]`

**Index:** [[Astronomy/AstroBites/Astrobites]] — inline **Bases** list (updates automatically; new notes appear when you open the hub).

**Create:** QuickAdd macro **New Astrobite Note** (see below).

### Paper notes (`Research/Paper Notes/<Title> (<short>).md`)

```yaml
category: paper
citekey: greenUpperLimitFrequency2025
tags:
  - astro-notes/paper
```

Body: `# Title [@citekey]`, then `---`, then sections (`## Abstract`, bullets, …). Use **Zotero/BBT cite keys** in `citekey` and `[@…]` in text.

**Create:** duplicate an existing paper note or add a row via **Bases → Papers**; add the reference to `Bibliography/AstroNotes.bib` (Zotero) or `sources.bib` if manual.

### Wikipedia (`Wikipedia/<Article title>.md`)

```yaml
wikipedia-url: "https://en.wikipedia.org/wiki/..."
citekey: Electrondegeneracy2026
tags:
  - wikipedia
```

Body: Wikipedia link first, then `# Title [@citekey]`, then `---`. Bib: `@online{…}` in `sources.bib`; **QuickAdd → New Wikipedia Note** also rebuilds `Bibliography/all.bib` for Pandoc Reference List.

### General notes (`Astronomy/General Notes/<Topic>.md`)

```yaml
category: general
tags:
  - astro-notes/general
```

Standalone topics (WD SNe, Pauli Exclusion Principle, Gravitational Waves, etc.). No hub folder.

### Class — Astro210 (`Class Notes/Astro210/`)

**Course index:** [[Class Notes/Class Notes]] — auto-lists course hubs (`Class Notes/<Course>/<Course>.md`).

**Astro210 hub:** [[Class Notes/Astro210/Astro210]] — auto-lists all topic notes in that folder.

**Section notes:** `Early Astronomy.md`, … — tag `#astro210`; optional back-link to the hub.

### Class — Physics212 (`Class Notes/Physics212/`)

**Physics212 hub:** [[Class Notes/Physics212/Physics212]] — auto-lists topic notes in that folder.

**Section notes:** one per LaTeX `\section` (Coulomb's Law, Capacitors, …) plus discussion/example notes — tag `#physics212`; back-link to the hub. Equation boxes → `[!equation]` / `[!constant]` callouts linking to `Equations/<name>`; TikZ figures in `Attachments/physics212-*.png`. Canonical equations live in `Equations/` (tag `#equation` + `#physics212`) with an Examples link back to the class note.

### Book — Physics of Binary Star Evolution

**Hub:** [[Astronomy/Physics of Binary Star Evolution/Physics of Binary Star Evolution]] — short intro + inline **Bases** chapter list (automatic).

**Chapter notes:** one file per chapter in the same folder.

### Astro Glossary (`Astronomy/Astro Glossary/<Term>.md`)

One note per term. Link in prose with `[[TESS]]`, `[[kilonova]]`, etc. (filename = link target).

```yaml
aliases:
  - Transiting Exoplanet Survey Satellite   # optional: full phrase, alternate names
tags:
  - glossary
```

- **`aliases`** — only when the link text differs from the filename (e.g. `TESS.md` + alias for the spelled-out name) or for alternate spellings.
- **No** `glossary-key`, `latex-glossary-key`, `ac:…`, or acronym/observatory sub-tags.

Use **Bases → Glossary** or `tag:#glossary` / `path:"Astronomy/Astro Glossary"`.

**Create:** new file in `Astronomy/Astro Glossary/`; `#` heading matches how you want the term to read; add `aliases` if needed for extra link targets.

### Meta

`Home.md`, `memory.md`, `SETUP.md` — `category: meta`, tag `astro-notes/meta`.

---

## Tags (quick filters)

| Tag | Use |
|-----|-----|
| `#astro210` | All Astro210 hub + section notes |
| `#physics212` | All Physics212 hub + section notes |
| `#astro-notes/astrobite` | Astrobites |
| `#astro-notes/paper` | Papers |
| `#astro-notes/physics-of-binary-star-evolution` | Binary star book |
| `#glossary` | All glossary terms |
| `#astro-notes/index` | Home |
| `#programming/python` | Python notes |

### Note status (property)

Use a frontmatter property, **not** a tag:

```yaml
status: stub   # stub | draft | wip | done
```

| Value | Meaning |
|-------|---------|
| `stub` | Empty / placeholder |
| `draft` | Started, still skeletal |
| `wip` | Actively being written |
| `done` | Finished enough to treat as complete |

Obsidian will autocomplete those values once you've used them (click the `status` property and pick from suggestions). Browse with **Bases → Status** / **Bases → Stubs**.

New notes get `status: stub` automatically via Templater (`personalTemplates/auto-status-stub.md`).

---

## Bibliography & citations

| File | Source |
|------|--------|
| `Bibliography/AstroNotes.bib` | Zotero Better BibTeX export — **do not edit by hand** |
| `Bibliography/sources.bib` | Manual entries (Astrobites `@online{…}`, books without Zotero metadata) |

In notes: `[@citekey]` (Pandoc style). Plugin: **Zotero Integration** pointed at both bib files.

Astrobites URLs: store in note YAML as `astrobites-url` and as `[Astrobites post](…)` under the title.

---

## Macros & automation

### QuickAdd — New Astrobite Note

| Item | Value |
|------|--------|
| Script | `Scripts/new-astrobite.js` |
| Choice name | **New Astrobite Note** |
| Config | `.obsidian/plugins/quickadd/data.json` |

**Run:** palette → **QuickAdd: Run** → **New Astrobite Note**, or **QuickAdd: New Astrobite Note** if enabled as a command.

**Does:**

1. Prompt for Astrobites URL; scrape title/author when possible
2. Create `Astronomy/AstroBites/<Article title>.md` with standard frontmatter
3. Append `@online{…}` to `Bibliography/sources.bib` when author + dated URL exist
4. Open the new note

**After editing QuickAdd config:** reload Obsidian (`Ctrl+R`). If choices vanish, re-add the macro in QuickAdd settings (Macro → User Script → `Scripts/new-astrobite.js`).

Duplicate script copy may exist under `templates/` — **QuickAdd should use `Scripts/new-astrobite.js` only.**

### Folder indexes (automatic, like Astro Glossary)

Hub notes use an inline `base` code block — Obsidian rebuilds the list from the folder whenever you open the note. No refresh commands.

| Hub | Folder |
|-----|--------|
| [[Astronomy/AstroBites/Astrobites]] | `Astronomy/AstroBites/*.md` (except hub) |
| [[Class Notes/Class Notes]] | `Class Notes/<Course>/<Course>.md` |
| [[Class Notes/Astro210/Astro210]] | `Class Notes/Astro210/*.md` (except hub) |
| [[Astronomy/Physics of Binary Star Evolution/Physics of Binary Star Evolution]] | book chapters |

**New course:** create `Class Notes/<Name>/<Name>.md` — it appears under [[Class Notes/Class Notes]] automatically.

### QuickAdd — New Glossary Term

| Item | Value |
|------|--------|
| Script | `Scripts/new-glossary.js` |
| Choice name | **New Glossary Term** |

**Run:** **QuickAdd: Run** → **New Glossary Term**, or **QuickAdd: New Glossary Term** from the palette.

**Prompts:**

1. **Term** — wikilink / filename (e.g. `TESS`, `kilonova`). Uses editor selection if text is highlighted.
2. **Title** — `#` heading (defaults to term; e.g. `Type I SNe` for file `TI-SNe.md`).
3. **Alias** — optional full phrase (e.g. `Asymptotic Giant Branch` for `AGB.md`).
4. **Definition** — multiline; can leave blank and write after the note opens.

**Creates:** `Astronomy/Astro Glossary/<term>.md` with `tags: [glossary]` and optional `aliases`, then opens the note.

### Other note types

Papers and class notes: duplicate an existing note or add a QuickAdd script later.

---

## Figures & math

- Embedded images: `![[Attachments/filename.png]]`
- Math: `$…$` / `$$…$$`; **Latex Suite** recommended
- Footnotes in migrated text appear as inline `*(…)*` — use Obsidian footnotes `[^1]` for new work if you prefer

---

## Plugins

| Plugin | Role |
|--------|------|
| QuickAdd | New Astrobite, New Glossary Term |
| Zotero Integration | `[@citekey]`; import via command **Paper note** (not **Import notes**) — see [[Templates/ZOTERO-SETUP]] |
| Latex Suite | Math |
| Notebook Navigator | Navigation |
| Excalidraw | Diagrams (optional) |

---

## Adding content (checklist)

| Goal | Action |
|------|--------|
| New Astrobite | QuickAdd **New Astrobite Note** |
| New paper | New note in `Research/Paper Notes/` + Zotero item / bib entry |
| New glossary term | QuickAdd **New Glossary Term**, or manual note in `Astronomy/Astro Glossary/` |
| New Astro210 topic | New note in `Class Notes/Astro210/` + link on [[Class Notes/Astro210/Astro210]] |
| New book chapter | New note in `Astronomy/Physics of Binary Star Evolution/` + link on hub |
| New general topic | New note in `Astronomy/General Notes/` |
| Update Home index | Edit [[Home]] when you add a major section |

---

## Publishing (Quartz on VPS)

The public site is **not** built inside this vault folder. Obsidian only syncs markdown; the VPS holds the Quartz engine and runs the build.

| Piece | Location |
|-------|----------|
| Vault (Obsidian Git) | This folder → GitHub `PiersonLip/obsidianNotes` (`master`) |
| Live site | https://obsidiannotes.piersonl.com |
| VPS content clone | `/var/www/obsidianNotes` |
| VPS Quartz engine | `/var/www/obsidianNotes-quartz` (`node_modules`, `public/`, full `quartz/` tree — not in Obsidian Git) |
| Built HTML | `/var/www/obsidianNotes-quartz/public` (nginx `root`) |
| Custom Quartz files (in git) | `deploy/quartz-custom/` — synced onto the engine on each build |
| Deploy scripts | `deploy/vps-build.sh`, `deploy/nginx.conf`, `deploy/quartz-deploy.*` |

### Flow

1. **Obsidian Git** pushes the vault to GitHub every ~5 minutes (`autoPushInterval: 5` in `.obsidian/plugins/obsidian-git/data.json`).
2. **systemd timer** on the VPS (`quartz-deploy.timer`, every 5 min) runs `deploy/vps-build.sh` as `www-data`.
3. **vps-build.sh** hard-resets `/var/www/obsidianNotes` to `origin/master`, `rsync`s `deploy/quartz-custom/` → `/var/www/obsidianNotes-quartz/`, symlinks `Bibliography/` into the engine dir (for citations), merges bibs → `all.bib`, then `node quartz/bootstrap-cli.mjs build -d … -o …/public`.
4. **nginx** serves `/var/www/obsidianNotes-quartz/public` (see `deploy/nginx.conf`).

First deploy on a combined checkout: the script **moves** `quartz/`, `package.json`, and `node_modules` from the content dir into `obsidianNotes-quartz` automatically.

### Site homepage & index

- Quartz content root is the vault root (`-d` = content dir).
- `index.md` at vault root is the site homepage (minimal frontmatter); body is replaced by **SiteIndex** (`quartz/components/pages/SiteIndex.tsx` in `deploy/quartz-custom`).
- Obsidian entry remains [[Home]]; the published index is the auto-generated section list (Class Notes, General Notes, papers, Wikipedia folder, Astrobites by tag, book chapters, Tools).

### Internal links

- Quartz config uses `markdownLinkResolution: "absolute"` (vault-root paths, not `./` shortest paths).
- **SiteIndex** and **TagList** use root-absolute hrefs (`/General-Notes/…`) so SPA navigation does not stack folders (e.g. `Glossary/General-Notes/General-Notes/…`).

### Graph & tags on the site

- Sidebar graph: tags off, `excludePrefixes: ["Astronomy/Astro Glossary/", "Home"]`, hidden on `index` slug (`quartz.layout.ts`).
- Tag chips: `astro-notes/astrobite` links to [[Astronomy/AstroBites/Astrobites]] hub, not `/tags/…` (`TagList.tsx`).- Astrobites hub **Bases** filter: `file.tags.contains("astro-notes/astrobite")` (not folder-only).

### Citations build

Quartz needs a merged bib at build time:

```bash
# On VPS after content pull (or locally if you ever build elsewhere):
cat Bibliography/AstroNotes.bib Bibliography/sources.bib > Bibliography/all.bib
```

`quartz.config.ts` points `Plugin.Citations` at `Bibliography/all.bib`. Regenerate `all.bib` when bibs change (add to vps-build if builds fail on missing cites).

### Obsidian vs Quartz clutter

- **Obsidian graph** (`.obsidian/graph.json`): filters out `quartz`, `node_modules`, `public`, `deploy`, etc.
- **Vault `.gitignore`**: `quartz/`, `node_modules/`, `public/` so Quartz never lands in Obsidian Git again.
- Edit site behavior in **`deploy/quartz-custom/`** only; push vault → VPS overlay picks it up on next timer run.

### Homepage files

Quartz requires **`index.md`** at the vault root (minimal frontmatter); it becomes `public/index.html`. **`Home.md`** is the Obsidian entry point only. If either is deleted (e.g. mobile sync), the site returns **403** until they are restored and rebuilt.

### Manual VPS rebuild

```bash
ssh rack 'sudo -u www-data CONTENT_DIR=/var/www/obsidianNotes QUARTZ_DIR=/var/www/obsidianNotes-quartz /var/www/obsidianNotes/deploy/vps-build.sh'
```

### Local preview (optional)

Quartz is intentionally not kept in the vault working tree. To preview locally, copy `deploy/quartz-custom` to a separate directory, clone or copy the full upstream `quartz/` engine once, then `npx quartz build -d "/path/to/Astro Notes"`.

---

## Conventions

- **Links:** `[[Note title]]` or `[[path/to/note|label]]` for hubs
- **Cites:** Zotero BBT keys `auth.lower + year` (e.g. `green2025`, `fragos2023`; clashes get `a`/`b` suffix). Refresh keys in Zotero after formula changes; update `citekey` + `[@…]` in notes.
- **Titles:** Astrobites use full article titles as filenames; **Paper note** import uses `Research/Paper Notes/<title> (<citekey>).md` (wikilink `[[citekey]]` via alias)
- **Edit here:** this vault is the working notes system; keep `memory.md` in sync when structure changes
