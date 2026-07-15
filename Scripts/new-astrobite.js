/**
 * QuickAdd: New Astrobite Note (URL → scraped metadata → vault note)
 *
 * Matches Astronomy/AstroBites/*.md frontmatter in this vault (see memory.md).
 * Bib entries go to Bibliography/sources.bib; merged into all.bib for Pandoc Reference List.
 */

const NOTES_DIR = "Astronomy/AstroBites";
const BIB_FILE = "Bibliography/sources.bib";
const path = require("path");

function loadBibMerge(app) {
  return require(path.join(app.vault.adapter.getBasePath(), "Scripts/bib-merge.js"));
}

function notePathFromTitle(title) {
  const safe = title.replace(/[\\/:*?"<>|]/g, "").trim();
  return `${NOTES_DIR}/${safe}.md`;
}

function parseDateFromUrl(url) {
  const m = url.match(/astrobites\.org\/(\d{4})\/(\d{2})\/(\d{2})\//i);
  return m ? `${m[1]}-${m[2]}-${m[3]}` : null;
}

function surnameFromAuthor(name) {
  name = name.trim();
  if (!name) return "";
  if (name.includes(",")) return name.split(",")[0].trim();
  const parts = name.split(/\s+/);
  return parts[parts.length - 1] || "";
}

function makeCiteKey(author, pubDate, existingKeys) {
  const year = pubDate
    ? pubDate.slice(0, 4)
    : new Date().getFullYear().toString();
  let base = (surnameFromAuthor(author) + year).replace(/[^A-Za-z0-9]/g, "");
  if (!base) base = `Astrobite${year}`;
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

function buildBibEntry(key, author, title, pubDate, url) {
  const today = new Date().toISOString().slice(0, 10);
  return `
@online{${key},
  author = {${author}},
  title = {${title}},
  date = {${pubDate}},
  url = {${url}},
  organization = {Astrobites},
  urldate = {${today}}
}
`;
}

async function mergeAllBib(app) {
  const { mergeAllBib: merge } = loadBibMerge(app);
  await merge(app);
}

function buildNoteContent(title, citeKey, url) {
  const citeLine = citeKey ? ` [@${citeKey}]` : "";
  const yamlCite = citeKey ? `citekey: ${citeKey}\n` : "";
  return `---
astrobites-url: "${url}"
${yamlCite}tags:
  - astro-notes/astrobite
---
# ${title}${citeLine}
---

[Astrobites post](${url})

`;
}

function metaContent(html, nameOrProperty) {
  const want = nameOrProperty.toLowerCase();
  for (const m of html.matchAll(/<meta\s+[^>]+>/gi)) {
    const tag = m[0];
    const name = tag.match(/\bname=["']([^"']+)["']/i)?.[1]?.toLowerCase();
    const prop = tag.match(/\bproperty=["']([^"']+)["']/i)?.[1]?.toLowerCase();
    if (name !== want && prop !== want) continue;
    const content = tag.match(/\bcontent=["']([^"']*)["']/i)?.[1];
    if (content) return content.trim();
  }
  return null;
}

function cleanAstrobitesTitle(raw) {
  return raw.replace(/\s*[-|–]\s*.*Astrobites.*$/i, "").trim();
}

function extractAuthor(html) {
  const fromMeta =
    metaContent(html, "author") ||
    metaContent(html, "shareaholic:article_author_name");
  if (fromMeta) return fromMeta;

  const byline = html.match(
    /<p\s+class=["']post-meta["'][^>]*>\s*by\s*<a[^>]*\brel=["']author["'][^>]*>([^<]+)<\/a>/i
  );
  if (byline) return byline[1].trim();

  const authorBox = html.match(
    /<div\s+class=["'][^"']*\bpp-author-boxes-name\b[^"']*["'][^>]*>\s*<a[^>]*\brel=["']author["'][^>]*>([^<]+)<\/a>/is
  );
  if (authorBox) return authorBox[1].trim();

  return null;
}

function looksLikeBlockedPage(html) {
  return (
    /cf-browser-verification|challenge-platform|Just a moment/i.test(html) &&
    !/<p\s+class=["']post-meta["']/i.test(html)
  );
}

async function fetchAstrobitesMetadata(url) {
  try {
    const resp = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });
    if (!resp.ok) return { title: null, author: null, blocked: false };
    const html = await resp.text();
    if (looksLikeBlockedPage(html)) {
      return { title: null, author: null, blocked: true };
    }

    let title = metaContent(html, "og:title");
    if (title) title = cleanAstrobitesTitle(title);
    if (!title) {
      const titleTag = html.match(/<title>([^<]+)<\/title>/i);
      if (titleTag) title = cleanAstrobitesTitle(titleTag[1]);
    }

    const author = extractAuthor(html);
    return { title, author, blocked: false };
  } catch {
    return { title: null, author: null, blocked: false };
  }
}

module.exports = async (params) => {
  const { quickAddApi: qa, app } = params;

  const url = (
    await qa.inputPrompt(
      "Astrobites URL",
      "https://astrobites.org/2026/05/09/many-mergers-might-fill-mass-gap/"
    )
  )?.trim();
  if (!url) return;

  new Notice("Fetching Astrobites metadata…", 3000);

  let { title, author, blocked } = await fetchAstrobitesMetadata(url);
  if (blocked) {
    new Notice(
      "Astrobites returned a bot-check page — enter title/author manually",
      6000
    );
  }

  if (!title) {
    title = (
      await qa.inputPrompt(
        "Title (could not fetch from page)",
        "Many Mergers Might Fill the Mass Gap"
      )
    )?.trim();
    if (!title) return;
  }
  if (!author) {
    author =
      (
        await qa.inputPrompt(
          "Author (optional — leave blank if unknown)",
          ""
        )
      )?.trim() || "";
  }

  const pubDate = parseDateFromUrl(url);
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
  } else if (author && pubDate) {
    citeKey = makeCiteKey(author, pubDate, readBibKeys(bibContent));
    const bibBlock = buildBibEntry(citeKey, author, title, pubDate, url);
    if (bibFile) {
      await app.vault.modify(bibFile, bibContent + bibBlock);
    } else {
      await app.vault.adapter.mkdir("Bibliography").catch(() => {});
      await app.vault.create(BIB_FILE, bibBlock.trim() + "\n");
    }
    bibNote = `Bib: added @online{${citeKey}}`;
  } else if (!author) {
    bibNote = "Bib: skipped (no author — add @online manually)";
  } else {
    bibNote = "Bib: skipped (URL must be astrobites.org/YYYY/MM/DD/…)";
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
