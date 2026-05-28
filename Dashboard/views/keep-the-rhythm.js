const container = input?.container || dv.container;

const plugin = app.plugins.getPlugin("keep-the-rhythm");
if (!plugin) {
  container.createEl("p", { cls: "dash-muted", text: "Keep the Rhythm plugin not enabled." });
  return;
}

const settings = plugin.data?.settings ?? {};
const goal = settings.dailyWritingGoal ?? 500;
const heatmapCfg = settings.heatmapConfig ?? {};
const colors = heatmapCfg.colors?.dark ?? {
  "0": "#ebedf015", "1": "#0e4429", "2": "#006d32", "3": "#26a641", "4": "#39d353",
};
const roundCells = heatmapCfg.roundCells !== false;
const intensityStops = heatmapCfg.intensityStops ?? { low: 100, medium: 500, high: 1000 };
const startOfWeek = (settings.startOfTheWeek === "SUNDAY") ? 0 : 1;
const numWeeks = Math.min(heatmapCfg.numberOfWeeks ?? 52, 52);
const slots = settings.sidebarConfig?.slots ?? [];
const todayStr = window.moment().format("YYYY-MM-DD");
const vaultName = app.vault.getName();
const dbName = `KTRDatabase-${vaultName}`;

// ── read from IndexedDB directly ──────────────────────────────────────────────

function openKTRDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(dbName);
    req.onerror = () => reject(req.error);
    req.onsuccess = () => resolve(req.result);
  });
}

function getAllActivity(db) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction("dailyActivity", "readonly");
    const store = tx.objectStore("dailyActivity");
    const req = store.getAll();
    req.onerror = () => reject(req.error);
    req.onsuccess = () => resolve(req.result);
  });
}

let activity = [];
try {
  const db = await openKTRDB();
  activity = await getAllActivity(db);
  db.close();
} catch (err) {
  // fall back to snapshot in plugin.data
  activity = plugin.data?.stats?.dailyActivity ?? [];
}

// ── helpers ───────────────────────────────────────────────────────────────────

function entryDiff(entry) {
  const changes = entry.changes ?? [];
  if (changes.length === 0) return 0;
  const last = changes[changes.length - 1].w ?? 0;
  return Math.max(0, last - (entry.wordCountStart ?? 0));
}

function dayTotalMap() {
  const map = new Map();
  for (const e of activity) {
    const diff = entryDiff(e);
    if (diff > 0) map.set(e.date, (map.get(e.date) ?? 0) + diff);
  }
  return map;
}

const dayTotals = dayTotalMap();

function wordCountThisWeek() {
  const now = window.moment();
  const weekStart = now.clone().startOf(startOfWeek === 0 ? "week" : "isoWeek");
  let total = 0;
  for (const [date, words] of dayTotals) {
    const d = window.moment(date);
    if (!d.isBefore(weekStart) && !d.isAfter(now)) total += words;
  }
  return total;
}

function wordCountLast30Days() {
  const cutoff = window.moment().subtract(30, "days").startOf("day");
  let total = 0;
  for (const [date, words] of dayTotals) {
    if (!window.moment(date).isBefore(cutoff)) total += words;
  }
  return total;
}

function todayEntries() {
  return activity.filter(e => e.date === todayStr && entryDiff(e) > 0);
}

function intensityColor(words) {
  if (words === 0) return colors["0"];
  if (words < intensityStops.low) return colors["1"];
  if (words < intensityStops.medium) return colors["2"];
  if (words < intensityStops.high) return colors["3"];
  return colors["4"];
}

// ── stat slots ────────────────────────────────────────────────────────────────

const slotsDiv = container.createDiv({ cls: "ktr-slots" });

for (const slot of slots) {
  const box = slotsDiv.createDiv({ cls: "ktr-slot" });
  let label = "", value = 0, unit = "words";

  switch (slot.option) {
    case "CURRENT_FILE":
      label = "This File";
      value = dayTotals.get(todayStr) ?? 0;
      break;
    case "CURRENT_WEEK":
      label = "This Week";
      value = wordCountThisWeek();
      break;
    case "LAST_MONTH": {
      const total = wordCountLast30Days();
      label = "Last 30 Days";
      value = slot.calc === "AVG" ? Math.round(total / 30) : total;
      if (slot.calc === "AVG") unit = "words/day";
      break;
    }
    default:
      label = slot.option;
  }

  box.createEl("div", { cls: "ktr-slot-label", text: label });
  const valRow = box.createDiv({ cls: "ktr-slot-value" });
  valRow.createEl("span", { cls: "ktr-slot-number", text: value.toLocaleString() });
  valRow.createEl("span", { cls: "ktr-slot-unit", text: ` ${unit}` });

  const pct = Math.min(100, Math.round((value / goal) * 100));
  const bar = box.createDiv({ cls: "ktr-bar-track" });
  const fill = bar.createDiv({ cls: "ktr-bar-fill" });
  fill.style.width = `${pct}%`;
}

// ── streak ────────────────────────────────────────────────────────────────────

const streak = plugin.data?.stats?.currentStreak ?? 0;
const best = plugin.data?.stats?.highestStreak ?? 0;
if (streak > 0 || best > 0) {
  const row = container.createDiv({ cls: "ktr-streak-row" });
  row.createEl("span", { cls: "ktr-streak", text: `🔥 ${streak}-day streak` });
  if (best > streak) row.createEl("span", { cls: "dash-muted", text: ` · best ${best}` });
}

// ── entries today ─────────────────────────────────────────────────────────────

const entries = todayEntries();
if (entries.length > 0) {
  const section = container.createDiv({ cls: "ktr-entries" });
  section.createEl("div", { cls: "ktr-entries-label", text: "ENTRIES TODAY" });
  for (const entry of entries) {
    const diff = entryDiff(entry);
    const name = entry.filePath.split("/").pop().replace(/\.md$/, "");
    const row = section.createDiv({ cls: "ktr-entry-row" });
    row.createEl("span", { cls: "ktr-entry-name", text: name });
    row.createEl("span", { cls: "ktr-entry-count", text: `+${diff.toLocaleString()} words` });
  }
}

// ── heatmap ───────────────────────────────────────────────────────────────────

const heatmap = container.createDiv({ cls: "ktr-heatmap" });
const today = window.moment();
const startOfGrid = today.clone().subtract(numWeeks - 1, "weeks");
startOfGrid.startOf(startOfWeek === 0 ? "week" : "isoWeek");

// month labels
const monthRow = heatmap.createDiv({ cls: "ktr-month-row" });
monthRow.createEl("div", { cls: "ktr-weekday-spacer" });
let lastMonth = -1;
for (let w = 0; w < numWeeks; w++) {
  const weekStart = startOfGrid.clone().add(w, "weeks");
  const month = weekStart.month();
  monthRow.createEl("div", {
    cls: "ktr-month-label",
    text: month !== lastMonth ? weekStart.format("MMM") : "",
  });
  lastMonth = month;
}

const dayNames = startOfWeek === 0
  ? ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const gridBody = heatmap.createDiv({ cls: "ktr-grid-body" });
for (let d = 0; d < 7; d++) {
  const row = gridBody.createDiv({ cls: "ktr-grid-row" });
  row.createEl("div", { cls: "ktr-weekday-label", text: d % 2 === 1 ? dayNames[d] : "" });

  for (let w = 0; w < numWeeks; w++) {
    const cellDate = startOfGrid.clone().add(w, "weeks").add(d, "days");
    const dateStr = cellDate.format("YYYY-MM-DD");
    const isFuture = cellDate.isAfter(today, "day");
    const cell = row.createDiv({ cls: `ktr-cell${roundCells ? " ktr-cell-round" : ""}` });

    if (isFuture) {
      cell.style.background = "transparent";
    } else {
      const words = dayTotals.get(dateStr) ?? 0;
      cell.style.background = intensityColor(words);
      if (words > 0) cell.title = `${dateStr}: ${words.toLocaleString()} words`;
      if (dateStr === todayStr) cell.addClass("ktr-cell-today");
    }
  }
}
