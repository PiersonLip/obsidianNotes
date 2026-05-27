const container = input?.container || dv.container;

const plugin = app.plugins.getPlugin("keep-the-rhythm");
if (!plugin) {
  container.createEl("p", { cls: "dash-muted", text: "Keep the Rhythm plugin not enabled." });
  return;
}

const data = plugin.data;
const settings = data?.settings ?? {};
const stats = data?.stats ?? {};
const activity = stats.dailyActivity ?? [];
const goal = settings.dailyWritingGoal ?? 500;
const heatmapCfg = settings.heatmapConfig ?? {};
const colors = heatmapCfg.colors?.dark ?? {
  "0": "#ebedf015", "1": "#0e4429", "2": "#006d32", "3": "#26a641", "4": "#39d353",
};
const roundCells = heatmapCfg.roundCells !== false;
const intensityStops = heatmapCfg.intensityStops ?? { low: 100, medium: 500, high: 1000 };
const startOfWeek = (settings.startOfTheWeek === "SUNDAY") ? 0 : 1;
const numWeeks = Math.min(heatmapCfg.numberOfWeeks ?? 52, 52);

// ── helpers ──────────────────────────────────────────────────────────────────

function wordCountForDate(dateStr) {
  let total = 0;
  for (const entry of activity) {
    if (entry.date !== dateStr) continue;
    const changes = entry.changes ?? [];
    if (changes.length === 0) continue;
    const start = entry.wordCountStart ?? 0;
    const last = changes[changes.length - 1].w ?? 0;
    total += Math.max(0, last - start);
  }
  return total;
}

function wordCountThisWeek() {
  const now = window.moment();
  const weekStart = now.clone().startOf("isoWeek");
  if (startOfWeek === 0) weekStart.weekday(0);
  let total = 0;
  for (const entry of activity) {
    const d = window.moment(entry.date);
    if (!d.isBefore(weekStart) && !d.isAfter(now)) {
      const changes = entry.changes ?? [];
      if (changes.length === 0) continue;
      const start = entry.wordCountStart ?? 0;
      const last = changes[changes.length - 1].w ?? 0;
      total += Math.max(0, last - start);
    }
  }
  return total;
}

function wordCountDaysRange(days) {
  const entries = new Map();
  const cutoff = window.moment().subtract(days, "days").startOf("day");
  for (const entry of activity) {
    if (window.moment(entry.date).isBefore(cutoff)) continue;
    const changes = entry.changes ?? [];
    if (changes.length === 0) continue;
    const start = entry.wordCountStart ?? 0;
    const last = changes[changes.length - 1].w ?? 0;
    const diff = Math.max(0, last - start);
    entries.set(entry.date, (entries.get(entry.date) ?? 0) + diff);
  }
  let total = 0;
  for (const v of entries.values()) total += v;
  return { total, days: entries.size || 1 };
}

function intensityColor(words) {
  if (words === 0) return colors["0"];
  if (words < intensityStops.low) return colors["1"];
  if (words < intensityStops.medium) return colors["2"];
  if (words < intensityStops.high) return colors["3"];
  return colors["4"];
}

function todayKey() {
  return window.moment().format("YYYY-MM-DD");
}

// ── stat slots ────────────────────────────────────────────────────────────────

const slots = settings.sidebarConfig?.slots ?? [];

const slotsDiv = container.createDiv({ cls: "ktr-slots" });

for (const slot of slots) {
  const box = slotsDiv.createDiv({ cls: "ktr-slot" });
  let label = "", value = 0, unit = slot.unit === "WORD" ? "words" : "chars";

  switch (slot.option) {
    case "CURRENT_FILE":
      label = "This File";
      value = wordCountForDate(todayKey());
      break;
    case "CURRENT_WEEK":
      label = "This Week";
      value = wordCountThisWeek();
      break;
    case "LAST_MONTH": {
      const r = wordCountDaysRange(30);
      label = "Last 30 Days";
      value = slot.calc === "AVG" ? Math.round(r.total / 30) : r.total;
      unit += slot.calc === "AVG" ? "/day" : "";
      break;
    }
    default:
      label = slot.option;
      value = 0;
  }

  box.createEl("div", { cls: "ktr-slot-label", text: label });
  const valRow = box.createDiv({ cls: "ktr-slot-value" });
  valRow.createEl("span", { cls: "ktr-slot-number", text: value.toLocaleString() });
  valRow.createEl("span", { cls: "ktr-slot-unit", text: ` ${unit}` });

  // goal progress bar for today
  if (slot.option === "CURRENT_FILE" || slot.option === "CURRENT_WEEK") {
    const pct = Math.min(100, Math.round((value / goal) * 100));
    const bar = box.createDiv({ cls: "ktr-bar-track" });
    const fill = bar.createDiv({ cls: "ktr-bar-fill" });
    fill.style.width = `${pct}%`;
  }
}

// ── streak ────────────────────────────────────────────────────────────────────

const streak = stats.currentStreak ?? 0;
const best = stats.highestStreak ?? 0;
if (streak > 0 || best > 0) {
  const streakRow = container.createDiv({ cls: "ktr-streak-row" });
  streakRow.createEl("span", { cls: "ktr-streak", text: `🔥 ${streak}-day streak` });
  if (best > streak) {
    streakRow.createEl("span", { cls: "dash-muted", text: ` · best ${best}` });
  }
}

// ── entries today ─────────────────────────────────────────────────────────────

const todayEntries = activity.filter(e => {
  if (e.date !== todayKey()) return false;
  const changes = e.changes ?? [];
  if (changes.length === 0) return false;
  const diff = Math.max(0, (changes[changes.length - 1].w ?? 0) - (e.wordCountStart ?? 0));
  return diff > 0;
});

if (todayEntries.length > 0) {
  const section = container.createDiv({ cls: "ktr-entries" });
  section.createEl("div", { cls: "ktr-entries-label", text: "ENTRIES TODAY" });
  for (const entry of todayEntries) {
    const row = section.createDiv({ cls: "ktr-entry-row" });
    const changes = entry.changes ?? [];
    const diff = Math.max(0, (changes[changes.length - 1].w ?? 0) - (entry.wordCountStart ?? 0));
    const name = entry.filePath.split("/").pop().replace(/\.md$/, "");
    row.createEl("span", { cls: "ktr-entry-name", text: name });
    row.createEl("span", { cls: "ktr-entry-count", text: `+${diff.toLocaleString()} words` });
  }
}

// ── heatmap ───────────────────────────────────────────────────────────────────

// Build per-day totals from activity
const dayTotals = new Map();
for (const entry of activity) {
  const changes = entry.changes ?? [];
  if (changes.length === 0) continue;
  const diff = Math.max(0, (changes[changes.length - 1].w ?? 0) - (entry.wordCountStart ?? 0));
  dayTotals.set(entry.date, (dayTotals.get(entry.date) ?? 0) + diff);
}

const heatmap = container.createDiv({ cls: "ktr-heatmap" });

// Build grid: numWeeks columns, 7 rows (days), going back from today
const today = window.moment();
// Find the end of the current week (Saturday if Sun start, Sunday if Mon start)
const endOfGrid = today.clone();
// Align so we end at the last day of this week
const startOfGrid = endOfGrid.clone().subtract(numWeeks - 1, "weeks").startOf("week");
if (startOfWeek === 0) {
  // Sunday start
  while (startOfGrid.day() !== 0) startOfGrid.subtract(1, "day");
} else {
  while (startOfGrid.isoWeekday() !== 1) startOfGrid.subtract(1, "day");
}

// Month labels row
const monthRow = heatmap.createDiv({ cls: "ktr-month-row" });
// Day label column header (blank)
monthRow.createEl("div", { cls: "ktr-weekday-spacer" });

let lastMonth = -1;
let colCount = 0;
for (let w = 0; w < numWeeks; w++) {
  const weekStart = startOfGrid.clone().add(w, "weeks");
  const month = weekStart.month();
  const label = month !== lastMonth ? weekStart.format("MMM") : "";
  monthRow.createEl("div", { cls: "ktr-month-label", text: label });
  if (month !== lastMonth) lastMonth = month;
}

const gridBody = heatmap.createDiv({ cls: "ktr-grid-body" });

const dayNames = startOfWeek === 0
  ? ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

for (let d = 0; d < 7; d++) {
  const row = gridBody.createDiv({ cls: "ktr-grid-row" });

  // weekday label (alternate rows)
  const lbl = d % 2 === 1 ? dayNames[d] : "";
  row.createEl("div", { cls: "ktr-weekday-label", text: lbl });

  for (let w = 0; w < numWeeks; w++) {
    const dayOffset = startOfWeek === 0 ? d : d;
    const cellDate = startOfGrid.clone().add(w, "weeks").add(d, "days");
    const dateStr = cellDate.format("YYYY-MM-DD");
    const isFuture = cellDate.isAfter(today, "day");

    const cell = row.createDiv({ cls: "ktr-cell" });
    if (roundCells) cell.addClass("ktr-cell-round");

    if (isFuture) {
      cell.style.background = "transparent";
    } else {
      const words = dayTotals.get(dateStr) ?? 0;
      cell.style.background = intensityColor(words);
      if (words > 0) {
        cell.title = `${dateStr}: ${words} words`;
      }
      if (dateStr === todayKey()) {
        cell.addClass("ktr-cell-today");
      }
    }
  }
}
