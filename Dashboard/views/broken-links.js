const container = input?.container || dv.container;

function unresolvedLinkTargets() {
  const counts = new Map();
  const sources = new Map();

  for (const file of app.vault.getMarkdownFiles()) {
    const cache = app.metadataCache.getFileCache(file);
    if (!cache?.links?.length) continue;
    for (const link of cache.links) {
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
  text: `${items.length} link target(s) referenced but no note exists yet`,
});

const list = container.createEl("ul", { cls: "dash-list dash-broken-links" });
for (const item of items.slice(0, 20)) {
  const li = list.createEl("li");
  li.createSpan({ cls: "dash-pill", text: String(item.count) });
  li.createSpan({ text: " " });
  li.createEl("code", { text: item.target });
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
