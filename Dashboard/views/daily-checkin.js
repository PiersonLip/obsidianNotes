const container = input?.container || dv.container;

const header = container.createDiv({ cls: "dash-daily-header" });
header.createEl("div", { cls: "dash-daily-date", text: window.moment().format("dddd, MMMM D") });

async function openBuiltInDailyNote() {
  const daily = app.internalPlugins.getPluginById("daily-notes");
  if (daily?.enabled && daily.instance?.openDailyNote) {
    await daily.instance.openDailyNote(window.moment());
    return;
  }

  const periodic = app.plugins.getPlugin("periodic-notes");
  if (periodic?.openDailyNote) {
    await periodic.openDailyNote(window.moment());
    return;
  }

  const commandIds = [
    "daily-notes:open-daily-note",
    "periodic-notes:open-daily-note",
  ];
  for (const id of commandIds) {
    if (app.commands.commands[id]) {
      await app.commands.executeCommandById(id);
      return;
    }
  }

  new Notice("Enable Daily notes in Settings → Core plugins");
}

const openBtn = header.createEl("button", { text: "Open daily note", cls: "dash-btn dash-btn-small" });
openBtn.onclick = () => openBuiltInDailyNote();
