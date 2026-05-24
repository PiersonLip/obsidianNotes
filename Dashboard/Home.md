---
category: meta
tags:
  - astro-notes/index
  - dashboard
cssclasses:
  - dashboard-home
---

# Home


```dataviewjs
const registry = JSON.parse(await dv.io.load("Dashboard/registry.json"));
const root = dv.container.createDiv({ cls: "dash-root" });

const header = root.createDiv({ cls: "dash-header" });
header.createEl("p", {
  cls: "dash-muted",
  text: `${window.moment().format("dddd, MMMM D · h:mm A")} · [[Home|Astro Notes index]]`,
});

const grid = root.createDiv({ cls: "dash-grid" });

for (const widget of registry.widgets) {
  const box = grid.createDiv({
    cls: `dash-box${widget.span ? ` dash-span-${widget.span}` : ""}`,
  });
  const titleRow = box.createDiv({ cls: "dash-box-title" });
  titleRow.createEl("h3", { text: widget.title });
  if (widget.subtitle) {
    titleRow.createEl("span", { cls: "dash-muted", text: widget.subtitle });
  }
  const body = box.createDiv({ cls: "dash-box-body" });
  try {
    await dv.view(widget.view, { container: body });
  } catch (err) {
    body.createEl("p", {
      cls: "dash-error",
      text: `Widget failed (${widget.id}): ${err.message || err}`,
    });
  }
}
```

---

**Add a widget:** create `Dashboard/views/your-widget.js`, then add an entry to `Dashboard/registry.json`.

**Shared TickTick logic:** `~/.config/ticktick/lib.py` (Waybar) · `Dashboard/lib/ticktick.js` (Obsidian).
