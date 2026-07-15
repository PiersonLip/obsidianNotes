# Zotero Integration (this vault)

## Why there is no "Literature note" command

That name comes from blog posts. In **Zotero Integration**, you define **Import formats** yourself. This vault uses one named **Paper note**.

After changing plugin settings, run **Reload app without saving** (`Ctrl+R`) so the new command appears.

## Commands to use

| Command | Use for |
|---------|---------|
| **Paper note** | Full paper note; saved as `Research/Paper Notes/{{title}} ({{citekey}}).md` (same style as your older paper notes) |
| **Pandoc** (citation format) | Insert `[@citekey]` at cursor |
| **Data explorer** | Debug template variables for one Zotero item |

## Commands to avoid

| Command | Problem |
|---------|---------|
| **Import notes** | Only copies Zotero *child notes* (often just arXiv "Comment: …"), not PDF annotations. This caused the broken `Zotero/fragos….md` file. |
| **Insert notes into current document** | Same raw-note dump into whatever file is open |

## Citation keys (Better BibTeX)

**Formula:** `auth.lower + year` → e.g. `fragos2023`, `green2025` (adds `a`, `b`, … if two papers share the same author+year).

Configured in Zotero prefs; **restart Zotero** after a manual edit so it reloads.

**New items** get short keys automatically.

**Existing items** keep old keys until you refresh them in Zotero:

1. Select items in Zotero
2. Right-click → **Better BibTeX** → **Refresh citation keys** (or per-item refresh on the citation key field)

Then update matching `citekey` properties and `[@…]` in vault notes. Re-run **Paper note** if the note filename was `{{citekey}}.md`.

**Auto-export:** BBT currently writes `AstroNotes.bib` at the vault root. Quartz builds use `Bibliography/AstroNotes.bib` — in BBT, point auto-export at `Bibliography/AstroNotes.bib` if you want one canonical file (or keep copying/syncing both).

After Zotero adds or updates entries, run **QuickAdd → Rebuild Bibliography** (merges into `Bibliography/all.bib`), then **Reload app without saving** (`Ctrl+R`). Or from a terminal: `Scripts/rebuild-all-bib.sh`.

## Wikipedia notes (not in Zotero)

**QuickAdd → New Wikipedia Note** adds `@online{…}` to `Bibliography/sources.bib` and rebuilds `Bibliography/all.bib`.

If a Wikipedia cite shows “No citation found” after creating the note, rebuild `all.bib` (below) and reload Obsidian.

Citekeys are auto-generated from the article title + year (e.g. `Electrondegeneracy2026`), not `auth.lower + year` (no author on Wikipedia).

## Pandoc Reference List (inline `[@citekey]`)

If you see **“No citation found for …”**, the bibliography path is missing or stale.

1. Settings → **Pandoc Reference List** → **Bibliography file:** `Bibliography/all.bib`
2. Regenerate after bib changes (Zotero export does **not** do this automatically): **QuickAdd → Rebuild Bibliography**, or:
   ```bash
   Scripts/rebuild-all-bib.sh
   ```
3. Reload Obsidian: **Reload app without saving** (`Ctrl+R`). There is no “Refresh bibliography” command in this plugin.
4. Optional: set a **numeric CSL** (IEEE, Nature) so Reading view shows `[1]` instead of the raw citekey

Vault config is in `.obsidian/plugins/obsidian-pandoc-reference-list/data.json`.

## Prerequisites

1. **Zotero** running on this machine
2. **Better BibTeX** installed; auto-export `Bibliography/AstroNotes.bib` (see above)
3. Zotero → Settings → Advanced → **Allow other applications to communicate with Zotero**
4. Import format **Bibliography style**: pick a CSL style you have installed in Zotero (e.g. APA). If import errors mention bibliography, install that style in Zotero → Settings → Cite → Styles.

## Re-import annotations

Run **Paper note** again on the same item. New highlights append under `## Annotations` (older blocks are kept via `{% persist %}`).

## PDF highlights missing?

- Annotate in **Zotero’s built-in PDF reader**, not only in an external app
- Use **Data explorer** on the item to confirm `annotations` is non-empty
