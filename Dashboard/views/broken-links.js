const container = input?.container || dv.container;

let config = {};
try {
  config = JSON.parse(await dv.io.load("Dashboard/config.json"));
} catch {
  /* defaults */
}

const excludePaths = config?.brokenLinks?.excludePaths ?? [
  "node_modules/",
  "quartz/",
  "public/",
  ".quartz-cache/",
];
const createFolder = config?.brokenLinks?.createFolder ?? "General Notes";

function isExcludedPath(filePath) {
  const norm = filePath.replace(/\\/g, "/");
  return excludePaths.some((prefix) => norm.startsWith(prefix) || norm.includes(`/${prefix}`));
}

function isRealMissingNote(linkTarget) {
  if (!linkTarget || linkTarget.startsWith("#")) return false;
  if (/^[a-z]+:\/\//i.test(linkTarget)) return false;
  return true;
}

function titleFromTarget(target) {
  return target.split("/").pop().trim();
}

function pathFromTarget(target) {
  const title = titleFromTarget(target).replace(/[\\/:*?"<>|]/g, "").trim();
  return `${createFolder}/${title}.md`;
}

async function openOrCreateNote(target) {
  const title = titleFromTarget(target);
  const notePath = pathFromTarget(target);

  let file = app.vault.getAbstractFileByPath(notePath);
  if (!file) {
    const existing = app.metadataCache.getFirstLinkpathDest(target, "/");
    if (existing) {
      file = existing;
    } else {
      file = await app.vault.create(
        notePath,
        `---
category: general
tags:
  - astro-notes/generalNotes
---

# ${title}


`
      );
      new Notice(`Created ${notePath}`);
    }
  }

  await app.workspace.openLinkText(file.path, "", false);
}

function unresolvedLinkTargets() {
  const counts = new Map();
  const sources = new Map();

  for (const file of app.vault.getMarkdownFiles()) {
    if (isExcludedPath(file.path)) continue;
    const cache = app.metadataCache.getFileCache(file);
    if (!cache?.links?.length) continue;
    for (const link of cache.links) {
      if (!isRealMissingNote(link.link)) continue;
      const dest = app.metadataCache.getFirstLinkpathDest(link.link, file.path);
      if (dest) continue;
      const key = link.link;
      counts.set(key, (counts.get(key) || 0) + 1);
      if (!sources.has(key)) sources.set(key, []);
      const list = sources.get(key);
      if (list.length < 5) list.push(file.basename);
    }
  }

  return [...counts.entries()]
    .map(([target, count]) => ({ target, count, sources: sources.get(target) || [] }))
    .sort((a, b) => b.count - a.count || a.target.localeCompare(b.target));
}

const items = unresolvedLinkTargets();

if (items.length === 0) {
  container.createEl("p", { cls: "dash-muted", text: "No broken wikilinks — nice." });
  return;
}

container.createEl("p", {
  cls: "dash-muted dash-summary-note",
  text: `${items.length} link target(s) referenced but no note exists yet · click to create in ${createFolder}/`,
});

const list = container.createEl("ul", { cls: "dash-list dash-broken-links" });
for (const item of items.slice(0, 20)) {
  const li = list.createEl("li");
  li.createSpan({ cls: "dash-pill", text: String(item.count) });
  li.createSpan({ text: " " });
  const link = li.createEl("button", {
    cls: "dash-broken-link",
    text: item.target,
    attr: { type: "button", title: `Create ${pathFromTarget(item.target)}` },
  });
  link.onclick = () => openOrCreateNote(item.target);
  if (item.sources.length) {
    li.createEl("div", {
      cls: "dash-muted dash-link-sources",
      text: `from: ${item.sources.join(", ")}`,
    });
  }
}

if (items.length > 20) {
  container.createEl("p", {
    cls: "dash-muted",
    text: `…and ${items.length - 20} more`,
  });
}
