/**
 * QuickAdd: Rebuild Bibliography/all.bib
 *
 * Merges AstroNotes.bib (Zotero/BBT) + sources.bib (Wikipedia, Astrobites, etc.).
 * Run after Zotero auto-export adds new citekeys, then reload Obsidian (Ctrl+R)
 * so Pandoc Reference List picks up the change.
 */

const path = require("path");

module.exports = async (params) => {
  const { app } = params;
  const { mergeAllBib, buildMergedBib, MERGED_BIB } = require(path.join(
    app.vault.adapter.getBasePath(),
    "Scripts/bib-merge.js"
  ));

  try {
    const stats = await buildMergedBib(app);
    await mergeAllBib(app);
    const total = stats.zoteroEntries + stats.sourceEntries;
    new Notice(
      `Updated ${MERGED_BIB} (${total} entries: ${stats.zoteroEntries} Zotero + ${stats.sourceEntries} other).\nReload Obsidian (Ctrl+R) if citations still show “not found”.`,
      8000
    );
  } catch (err) {
    new Notice(`Bibliography merge failed: ${err.message}`, 8000);
    console.error(err);
  }
};
