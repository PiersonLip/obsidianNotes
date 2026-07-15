const container = input?.container || dv.container;

let config = {};
try {
  config = JSON.parse(await dv.io.load("Dashboard/config.json"));
} catch {
  /* defaults */
}

const limit = config?.recentlyOpened?.limit ?? 12;
const excludePaths = config?.recentlyOpened?.excludePaths ?? [
  "Dashboard/",
  "Dashboard/Home.md",
  "memory.md",
  ".trash/",
];

function isExcluded(path) {
  const norm = path.replace(/\\/g, "/");
  return excludePaths.some(
    (prefix) =>
      norm === prefix ||
      norm.startsWith(prefix) ||
      norm.includes(`/${prefix}`)
  );
}

const recent = (app.workspace.getLastOpenFiles?.() || [])
  .filter((p) => p?.endsWith(".md") && !isExcluded(p))
  .slice(0, limit);

if (recent.length === 0) {
  container.createEl("p", {
    cls: "dash-muted",
    text: "No recently opened notes yet.",
  });
  return;
}

const list = container.createEl("ul", { cls: "dash-list dash-recent" });
for (const path of recent) {
  const file = app.vault.getAbstractFileByPath(path);
  const li = list.createEl("li");
  if (file) {
    const a = li.createEl("a", {
      cls: "internal-link",
      text: file.basename,
      href: path,
      attr: { "data-href": path },
    });
    a.onclick = (e) => {
      e.preventDefault();
      app.workspace.openLinkText(path, "", false);
    };
    li.createEl("div", {
      cls: "dash-muted dash-link-sources",
      text: path.includes("/") ? path.split("/").slice(0, -1).join("/") : "",
    });
  } else {
    li.createSpan({ cls: "dash-muted", text: path });
  }
}
