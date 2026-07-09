/**
 * Merge Bibliography/AstroNotes.bib + Bibliography/sources.bib → Bibliography/all.bib
 * Used by Pandoc Reference List and Quartz builds.
 */

const ZOTERO_BIB = "Bibliography/AstroNotes.bib";
const SOURCES_BIB = "Bibliography/sources.bib";
const MERGED_BIB = "Bibliography/all.bib";

function countBibEntries(content) {
  return (content.match(/@\w+\{/g) || []).length;
}

/** @returns {{ merged: string, zoteroEntries: number, sourceEntries: number }} */
async function buildMergedBib(app) {
  const zotero = app.vault.getAbstractFileByPath(ZOTERO_BIB);
  const sources = app.vault.getAbstractFileByPath(SOURCES_BIB);

  if (!zotero && !sources) {
    throw new Error(
      `No ${ZOTERO_BIB} or ${SOURCES_BIB} found in the vault.`
    );
  }

  const parts = [];
  let zoteroEntries = 0;
  let sourceEntries = 0;

  if (zotero) {
    const zoteroContent = await app.vault.read(zotero);
    zoteroEntries = countBibEntries(zoteroContent);
    parts.push(zoteroContent);
  }
  if (sources) {
    const sourcesContent = await app.vault.read(sources);
    sourceEntries = countBibEntries(sourcesContent);
    parts.push(sourcesContent);
  }

  return {
    merged: parts.join("\n").trim() + "\n",
    zoteroEntries,
    sourceEntries,
  };
}

async function mergeAllBib(app) {
  const { merged } = await buildMergedBib(app);
  const out = app.vault.getAbstractFileByPath(MERGED_BIB);
  if (out) await app.vault.modify(out, merged);
  else {
    await app.vault.adapter.mkdir("Bibliography").catch(() => {});
    await app.vault.create(MERGED_BIB, merged);
  }
}

module.exports = {
  ZOTERO_BIB,
  SOURCES_BIB,
  MERGED_BIB,
  mergeAllBib,
  buildMergedBib,
};
