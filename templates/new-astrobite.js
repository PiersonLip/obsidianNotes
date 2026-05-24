/**
 * QuickAdd: New Astrobite Note (URL → scraped metadata → vault note)
 *
 * Matches AstroBites/*.md frontmatter in this vault (see memory.md).
 * Bib entries go to Bibliography/sources.bib only (Obsidian vault).
 */

const NOTES_DIR = "AstroBites";
const BIB_FILE = "Bibliography/sources.bib";

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

function buildNoteContent(title, citeKey, url) {
  const citeLine = citeKey ? ` [@${citeKey}]` : "";
  const yamlCite = citeKey ? `citekey: ${citeKey}\n` : "";
  return `---
astrobites-url: "${url}"
${yamlCite}tags:
  - astro-notes/astrobite
---
# ${title}${citeLine}

[Astrobites post](${url})

`;
}

async function fetchAstrobitesMetadata(url) {
  try {
    const resp = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html",
      },
    });
    if (!resp.ok) return { title: null, author: null };
    const html = await resp.text();

    let title = null;
    const ogTitle = html.match(
      /<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i
    );
    if (ogTitle) {
      title = ogTitle[1].replace(/\s*[-|–].*Astrobites.*$/i, "").trim();
    } else {
      const titleTag = html.match(/<title>([^<]+)<\/title>/i);
      if (titleTag) {
        title = titleTag[1].replace(/\s*[-|–].*Astrobites.*$/i, "").trim();
      }
    }

    let author = null;
    const metaAuthor = html.match(
      /<meta\s+name=["']author["']\s+content=["']([^"']+)["']/i
    );
    if (metaAuthor) author = metaAuthor[1].trim();

    return { title, author };
  } catch {
    return { title: null, author: null };
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

  let { title, author } = await fetchAstrobitesMetadata(url);

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

  await app.vault.adapter.mkdir(NOTES_DIR).catch(() => {});
  const content = buildNoteContent(title, citeKey, url);
  await app.vault.create(notePath, content);
  await app.workspace.openLinkText(notePath, "", false);

  new Notice(`Created ${notePath.split("/").pop()}\n${bibNote}`, 7000);
};
