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
├── Home.md                 # index (map of content)
├── memory.md               # this file
├── SETUP.md                # short onboarding
├── AstroBites/             # one note per article; [[AstroBites/Astrobites]] = index
├── Paper Notes/            # one note per paper
├── General Notes/          # misc topic notes
├── Class Notes/            # [[Class Notes/Class Notes]] course index
├── Class Notes/Astro210/   # [[Class Notes/Astro210/Astro210]] topic index
├── Physics of Binary Star Evolution/   # book hub + chapter notes
├── Glossary/               # one note per term (wikilink targets)
├── Bibliography/           # AstroNotes.bib (Zotero) + sources.bib (manual/Astrobites)
├── Attachments/            # figures (PNG)
├── Scripts/                # QuickAdd user scripts
└── Bases/                  # Glossary, Papers, Astrobites, Binary book, Astro210, Class Notes
```

---

## Note types & frontmatter

Every note gets `category` plus auto-style tags `astro-notes/<category>`. Add extra tags in YAML when useful (e.g. `#astro210`).

### Astrobites (`AstroBites/<Article title>.md`)

```yaml
astrobites-url: "https://astrobites.org/..."
citekey: Amen2026
tags:
  - astro-notes/astrobite
```

Body pattern:

- `# Title [@citekey]`
- `[Astrobites post](url)` under the title
- Body starts after the Astrobites link line; add your own sections as needed.
- Wikilinks to glossary: `[[TESS]]`, `[[PISN]]`

**Index:** [[AstroBites/Astrobites]] — inline **Bases** list (updates automatically; new notes appear when you open the hub).

**Create:** QuickAdd macro **New Astrobite Note** (see below).

### Paper notes (`Paper Notes/<Title> (<short>).md`)

```yaml
category: paper
citekey: greenUpperLimitFrequency2025
tags:
  - astro-notes/paper
```

Body: `# Title [@citekey]`, `## Abstract`, bullet sections. Use **Zotero/BBT cite keys** in `citekey` and `[@…]` in text.

**Create:** duplicate an existing paper note or add a row via **Bases → Papers**; add the reference to `Bibliography/AstroNotes.bib` (Zotero) or `sources.bib` if manual.

### General notes (`General Notes/<Topic>.md`)

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

### Book — Physics of Binary Star Evolution

**Hub:** [[Physics of Binary Star Evolution/Physics of Binary Star Evolution]] — short intro + inline **Bases** chapter list (automatic).

**Chapter notes:** one file per chapter in the same folder.

### Glossary (`Glossary/<Term>.md`)

One note per term. Link in prose with `[[TESS]]`, `[[kilonova]]`, etc. (filename = link target).

```yaml
aliases:
  - Transiting Exoplanet Survey Satellite   # optional: full phrase, alternate names
tags:
  - glossary
```

- **`aliases`** — only when the link text differs from the filename (e.g. `TESS.md` + alias for the spelled-out name) or for alternate spellings.
- **No** `glossary-key`, `latex-glossary-key`, `ac:…`, or acronym/observatory sub-tags.

Use **Bases → Glossary** or `tag:#glossary` / `path:Glossary`.

**Create:** new file in `Glossary/`; `#` heading matches how you want the term to read; add `aliases` if needed for extra link targets.

### Meta

`Home.md`, `memory.md`, `SETUP.md` — `category: meta`, tag `astro-notes/meta`.

---

## Tags (quick filters)

| Tag | Use |
|-----|-----|
| `#astro210` | All Astro210 hub + section notes |
| `#astro-notes/astrobite` | Astrobites |
| `#astro-notes/paper` | Papers |
| `#astro-notes/physics-of-binary-star-evolution` | Binary star book |
| `#glossary` | All glossary terms |
| `#astro-notes/index` | Home |

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
2. Create `AstroBites/<Article title>.md` with standard frontmatter
3. Append `@online{…}` to `Bibliography/sources.bib` when author + dated URL exist
4. Open the new note

**After editing QuickAdd config:** reload Obsidian (`Ctrl+R`). If choices vanish, re-add the macro in QuickAdd settings (Macro → User Script → `Scripts/new-astrobite.js`).

Duplicate script copy may exist under `templates/` — **QuickAdd should use `Scripts/new-astrobite.js` only.**

### Folder indexes (automatic, like Glossary)

Hub notes use an inline `base` code block — Obsidian rebuilds the list from the folder whenever you open the note. No refresh commands.

| Hub | Folder |
|-----|--------|
| [[AstroBites/Astrobites]] | `AstroBites/*.md` (except hub) |
| [[Class Notes/Class Notes]] | `Class Notes/<Course>/<Course>.md` |
| [[Class Notes/Astro210/Astro210]] | `Class Notes/Astro210/*.md` (except hub) |
| [[Physics of Binary Star Evolution/Physics of Binary Star Evolution]] | book chapters |

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

**Creates:** `Glossary/<term>.md` with `tags: [glossary]` and optional `aliases`, then opens the note.

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
| Zotero Integration | `[@citekey]` |
| Latex Suite | Math |
| Notebook Navigator | Navigation |
| Excalidraw | Diagrams (optional) |

---

## Adding content (checklist)

| Goal | Action |
|------|--------|
| New Astrobite | QuickAdd **New Astrobite Note** |
| New paper | New note in `Paper Notes/` + Zotero item / bib entry |
| New glossary term | QuickAdd **New Glossary Term**, or manual note in `Glossary/` |
| New Astro210 topic | New note in `Class Notes/Astro210/` + link on [[Class Notes/Astro210/Astro210]] |
| New book chapter | New note in `Physics of Binary Star Evolution/` + link on hub |
| New general topic | New note in `General Notes/` |
| Update Home index | Edit [[Home]] when you add a major section |

---

## Conventions

- **Links:** `[[Note title]]` or `[[path/to/note|label]]` for hubs
- **Cites:** Zotero BBT keys everywhere (`greenUpperLimitFrequency2025`, not legacy `green_upper_2025`)
- **Titles:** Astrobites use full article titles as filenames; papers often include a short parenthetical (`(greenUpper)`)
- **Edit here:** this vault is the working notes system; keep `memory.md` in sync when structure changes
