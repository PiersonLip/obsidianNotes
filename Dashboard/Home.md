---
category: meta
tags:
  - astro-notes/index
  - dashboard
cssclasses:
  - dashboard-home
properties: false
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

const layout = root.createDiv({ cls: "dash-layout" });
const leftCol = layout.createDiv({ cls: "dash-col dash-col-left" });
const rightCol = layout.createDiv({ cls: "dash-col dash-col-right" });

async function mountWidget(widget, parent) {
  const box = parent.createDiv({ cls: "dash-box" });
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

for (const widget of registry.widgets) {
  const parent = widget.column === "right" ? rightCol : leftCol;
  await mountWidget(widget, parent);
}
```
