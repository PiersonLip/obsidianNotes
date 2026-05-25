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
      `---\ntags:\n  - dashboard/daily\n---\n\n# ${today}\n\n## Notes\n\n`
    );
  }
  await app.workspace.openLinkText(notePath, "", false);
};
