/**
 * QuickAdd: New Wikipedia Note (URL → article metadata → vault note)
 *
 * Matches Wikipedia/*.md frontmatter pattern (see memory.md).
 */

const NOTES_DIR = "Wikipedia";
const BIB_FILE = "Bibliography/sources.bib";
const path = require("path");

function loadBibMerge(app) {
  return require(path.join(app.vault.adapter.getBasePath(), "Scripts/bib-merge.js"));
}

function notePathFromTitle(title) {
  const safe = title.replace(/[\\/:*?"<>|]/g, "").trim();
  return `${NOTES_DIR}/${safe}.md`;
}

function wikiTitleFromUrl(url) {
  try {
    const u = new URL(url);
    if (!/wikipedia\.org$/i.test(u.hostname.replace(/^www\./, ""))) {
      return null;
    }
    const parts = u.pathname.split("/").filter(Boolean);
    const wikiIdx = parts.findIndex((p) => p.toLowerCase() === "wiki");
    if (wikiIdx === -1 || wikiIdx + 1 >= parts.length) return null;
    return decodeURIComponent(parts.slice(wikiIdx + 1).join("/")).replace(/_/g, " ");
  } catch {
    return null;
  }
}

function canonicalWikiUrl(title) {
  const slug = title.trim().replace(/ /g, "_");
  return `https://en.wikipedia.org/wiki/${encodeURIComponent(slug)}`;
}

function makeCiteKey(title, existingKeys) {
  const year = new Date().getFullYear().toString();
  const words = title.replace(/[^A-Za-z0-9\s]/g, "").trim().split(/\s+/);
  let base = (words.slice(0, 2).join("") + year).replace(/[^A-Za-z0-9]/g, "");
  if (!base) base = `Wiki${year}`;
  base = base.charAt(0).toUpperCase() + base.slice(1);
  let key = base;
  let n = 2;
  while (existingKeys.has(key)) {
    key = n < 27 ? base + String.fromCharCode(96 + n) : base + n;
    n++;
  }
  return key;
}

function readBibKeys(bibContent) {
  const keys = new Set();
  for (const m of bibContent.matchAll(/@\w+\{([^,]+),/g)) {
    keys.add(m[1].trim());
  }
  return keys;
}

function urlInBib(bibContent, url) {
  return bibContent.includes(url);
}

function findCiteKeyForUrl(bibContent, url) {
  const entries = [...bibContent.matchAll(/@\w+\{([^,]+),/g)];
  for (let i = 0; i < entries.length; i++) {
    const start = entries[i].index;
    const end =
      i + 1 < entries.length ? entries[i + 1].index : bibContent.length;
    const chunk = bibContent.slice(start, end);
    if (chunk.includes(url)) return entries[i][1].trim();
  }
  return null;
}

function buildBibEntry(key, title, url) {
  const today = new Date().toISOString().slice(0, 10);
  return `
@online{${key},
  title = {${title}},
  url = {${url}},
  organization = {Wikipedia},
  urldate = {${today}}
}
`;
}

async function mergeAllBib(app) {
  const { mergeAllBib: merge } = loadBibMerge(app);
  await merge(app);
}

function defaultAliases(title) {
  const lines = [title.trim()];
  const short = title.replace(/^(A|An|The)\s+/i, "").trim();
  if (short && short.toLowerCase() !== title.trim().toLowerCase()) {
    lines.push(short);
  }
  return lines;
}

function buildNoteContent(title, citeKey, url) {
  const citeLine = citeKey ? ` [@${citeKey}]` : "";
  const yamlCite = citeKey ? `citekey: ${citeKey}\n` : "";
  const aliasLines = defaultAliases(title)
    .map((a) => `  - ${a}`)
    .join("\n");
  return `---
wikipedia-url: "${url}"
${yamlCite}tags:
  - astro-notes/wikipedia
aliases:
${aliasLines}
---
# ${title}${citeLine}
---

[Wikipedia article](${url})

`;
}

async function fetchWikipediaMetadata(url) {
  const titleFromUrl = wikiTitleFromUrl(url);
  if (!titleFromUrl) return { title: null, url: null };

  const apiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(titleFromUrl.replace(/ /g, "_"))}`;
  try {
    const resp = await fetch(apiUrl, {
      headers: {
        Accept: "application/json",
        "User-Agent": "AstroNotesObsidianVault/1.0 (personal notes)",
      },
    });
    if (!resp.ok) return { title: titleFromUrl, url: canonicalWikiUrl(titleFromUrl) };
    const data = await resp.json();
    return {
      title: data.title || titleFromUrl,
      url: data.content_urls?.desktop?.page || canonicalWikiUrl(titleFromUrl),
    };
  } catch {
    return { title: titleFromUrl, url: canonicalWikiUrl(titleFromUrl) };
  }
}

module.exports = async (params) => {
  const { quickAddApi: qa, app } = params;

  const inputUrl = (
    await qa.inputPrompt(
      "Wikipedia URL",
      "https://en.wikipedia.org/wiki/Pulsar"
    )
  )?.trim();
  if (!inputUrl) return;

  new Notice("Fetching Wikipedia metadata…", 3000);

  let { title, url } = await fetchWikipediaMetadata(inputUrl);

  if (!title) {
    title = (
      await qa.inputPrompt(
        "Article title (could not parse URL)",
        "Pulsar"
      )
    )?.trim();
    if (!title) return;
    url = canonicalWikiUrl(title);
  }

  const notePath = notePathFromTitle(title);

  const existing = app.vault.getAbstractFileByPath(notePath);
  if (existing) {
    new Notice(`Note already exists: ${notePath}`, 5000);
    await app.workspace.openLinkText(notePath, "", false);
    return;
  }

  let citeKey = null;
  let bibNote = "";

  const bibFile = app.vault.getAbstractFileByPath(BIB_FILE);
  let bibContent = bibFile ? await app.vault.read(bibFile) : "";

  if (urlInBib(bibContent, url)) {
    citeKey = findCiteKeyForUrl(bibContent, url);
    bibNote = `Bib: URL already in ${BIB_FILE} (${citeKey})`;
  } else {
    citeKey = makeCiteKey(title, readBibKeys(bibContent));
    const bibBlock = buildBibEntry(citeKey, title, url);
    if (bibFile) {
      await app.vault.modify(bibFile, bibContent + bibBlock);
    } else {
      await app.vault.adapter.mkdir("Bibliography").catch(() => {});
      await app.vault.create(BIB_FILE, bibBlock.trim() + "\n");
    }
    bibNote = `Bib: added @online{${citeKey}}`;
  }

  await mergeAllBib(app);
  const { MERGED_BIB } = loadBibMerge(app);
  if (citeKey) bibNote += ` · ${MERGED_BIB} updated`;

  await app.vault.adapter.mkdir(NOTES_DIR).catch(() => {});
  const content = buildNoteContent(title, citeKey, url);
  await app.vault.create(notePath, content);
  await app.workspace.openLinkText(notePath, "", false);

  new Notice(`Created ${notePath.split("/").pop()}\n${bibNote}`, 7000);
};
