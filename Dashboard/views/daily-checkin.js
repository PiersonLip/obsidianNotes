const container = input?.container || dv.container;

let config = {};
try {
  config = JSON.parse(await dv.io.load("Dashboard/config.json"));
} catch {
  /* defaults */
}

const folder = config?.daily?.folder || "Dashboard/Daily";
const today = window.moment().format("YYYY-MM-DD");
const notePath = `${folder}/${today}.md`;

const header = container.createDiv({ cls: "dash-daily-header" });
header.createEl("div", { cls: "dash-daily-date", text: window.moment().format("dddd, MMMM D") });

const openBtn = header.createEl("button", { text: "Open daily note", cls: "dash-btn dash-btn-small" });
openBtn.onclick = async () => {
  const existing = app.vault.getAbstractFileByPath(notePath);
  if (!existing) {
    await app.vault.createFolder(folder).catch(() => {});
    await app.vault.create(
      notePath,
      `---\ntags:\n  - dashboard/daily\n---\n\n# ${today}\n\n## Check-in\n\n- [ ] \n\n## Focus\n\n\n## Notes\n\n`
    );
  }
  await app.workspace.openLinkText(notePath, "", false);
};

const prompts = container.createDiv({ cls: "dash-section" });
prompts.createEl("h4", { text: "Today" });
const checks = [
  "Review TickTick / inbox",
  "Skim [[Home]] or active project",
  "One thing to finish before noon",
];
const ul = prompts.createEl("ul", { cls: "dash-list dash-checkin-list" });
for (const label of checks) {
  const li = ul.createEl("li");
  li.createEl("input", { type: "checkbox", cls: "dash-checkbox" });
  li.createSpan({ text: ` ${label}` });
}

container.createEl("p", {
  cls: "dash-muted",
  text: "Checkboxes are session-only; use the daily note for persistence.",
});
