async function loadTicktickLib() {
  if (window.__ticktickDashboardLib) return window.__ticktickDashboardLib;
  const src = await dv.io.load("Dashboard/lib/ticktick.js");
  const module = { exports: {} };
  const fn = new Function("module", "exports", "require", `${src}\n;return module.exports;`);
  window.__ticktickDashboardLib = fn(module, module.exports, require);
  return window.__ticktickDashboardLib;
}

const tt = await loadTicktickLib();
const container = input?.container || dv.container;
const config = await tt.readConfig(dv);
const token = tt.getToken(config);

if (!token) {
  container.createEl("p", {
    cls: "dash-muted",
    text: "No TickTick token at ~/.config/ticktick/token",
  });
  return;
}

let projects = [];
let allTasks = [];

try {
  ({ projects, allTasks } = await tt.fetchProjectsAndTasks(token));
} catch (err) {
  container.createEl("p", { cls: "dash-error", text: String(err.message || err) });
  return;
}

const today = tt.tasksDueToday(allTasks);
const buckets = tt.bucketUpcoming(allTasks);
const counts = buckets.map((b) => b.tasks.length);
const defaultProject = tt.defaultProjectId(projects);

const summary = container.createDiv({ cls: "dash-ticktick-summary" });
summary.createSpan({
  cls: counts[0] > 0 ? "dash-pill dash-pill-urgent" : "dash-pill",
  text: `TT ${counts[0]}/${counts[1]}/${counts[2]}`,
});
summary.createSpan({
  cls: "dash-muted dash-summary-note",
  text: " same buckets as Waybar",
});

const todaySection = container.createDiv({ cls: "dash-section" });
todaySection.createEl("h4", { text: "Due today" });
if (today.length === 0) {
  todaySection.createEl("p", { cls: "dash-muted", text: "Nothing due today." });
} else {
  const list = todaySection.createEl("ul", { cls: "dash-list" });
  for (const entry of today) {
    const li = list.createEl("li");
    if (entry.label === "overdue") {
      li.createSpan({ cls: "dash-pill dash-pill-urgent", text: "overdue" });
      li.createSpan({ text: " " });
    }
    li.createSpan({ text: `${entry.title} (${entry.displayTime})` });
  }
}

const upcoming = container.createDiv({ cls: "dash-section dash-section-compact" });
upcoming.createEl("h4", { text: "Upcoming" });
for (const bucket of buckets) {
  if (bucket.tasks.length === 0) continue;
  const block = upcoming.createDiv({ cls: "dash-subsection" });
  block.createEl("div", { cls: "dash-subtitle", text: bucket.label });
  const ul = block.createEl("ul", { cls: "dash-list dash-list-compact" });
  for (const entry of bucket.tasks.slice(0, 8)) {
    ul.createEl("li", { text: `${entry.title} (${entry.displayTime})` });
  }
}

const form = container.createDiv({ cls: "dash-ticktick-form" });
form.createEl("h4", { text: "Quick add" });
const row = form.createDiv({ cls: "dash-form-row" });
const titleInput = row.createEl("input", {
  type: "text",
  placeholder: "New task…",
  cls: "dash-input",
});
const dueWrap = form.createDiv({ cls: "dash-form-row" });
const dueInput = dueWrap.createEl("input", { type: "checkbox", cls: "dash-checkbox" });
dueInput.checked = true;
dueWrap.createSpan({ text: " due today" });
const addBtn = form.createEl("button", { text: "Add to TickTick", cls: "dash-btn" });
const status = form.createDiv({ cls: "dash-muted dash-form-status" });

addBtn.onclick = async () => {
  const title = titleInput.value.trim();
  if (!title) {
    status.setText("Enter a title.");
    return;
  }
  if (!defaultProject) {
    status.setText("No TickTick project found.");
    return;
  }
  addBtn.disabled = true;
  status.setText("Adding…");
  try {
    const dueDate = dueInput.checked ? tt.ticktickDueToday(new Date()) : undefined;
    await tt.createTask(token, {
      title,
      projectId: defaultProject,
      dueDate,
    });
    titleInput.value = "";
    status.setText("Added — reload note to refresh.");
    new Notice("TickTick task added");
  } catch (err) {
    status.setText(String(err.message || err));
  } finally {
    addBtn.disabled = false;
  }
};

titleInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addBtn.click();
});
