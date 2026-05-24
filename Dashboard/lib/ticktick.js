/** Shared TickTick logic — mirrors ~/.config/ticktick/lib.py and Waybar widget. */
const fs = require("fs");

const DEFAULT_TOKEN_PATH = "/home/pierson/.config/ticktick/token";
const BASE_URL = "https://api.ticktick.com/open/v1";

async function readConfig(dv) {
  try {
    return JSON.parse(await dv.io.load("Dashboard/config.json"));
  } catch {
    return {};
  }
}

function getToken(config) {
  const path = config?.ticktick?.tokenPath || DEFAULT_TOKEN_PATH;
  try {
    return fs.readFileSync(path, "utf8").trim() || null;
  } catch {
    return null;
  }
}

function isOpenTask(task) {
  if (task.status === 2) return false;
  if (task.completedTime) return false;
  return true;
}

function parseDue(dueStr) {
  return new Date(dueStr.replace("+0000", "+00:00"));
}

function comparisonDue(dueDt) {
  const h = dueDt.getHours();
  if (h >= 0 && h < 8) {
    return new Date(dueDt.getTime() - 8 * 3600 * 1000);
  }
  return dueDt;
}

async function apiFetch(path, token, options = {}) {
  const resp = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      ...(options.headers || {}),
    },
  });
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`${resp.status} ${path}: ${text.slice(0, 120)}`);
  }
  if (resp.status === 204) return null;
  return resp.json();
}

async function fetchProjectsAndTasks(token) {
  const projects = (await apiFetch("/project", token)).filter((p) => !p.closed);
  const allTasks = [];
  for (const proj of projects) {
    try {
      const data = await apiFetch(`/project/${proj.id}/data`, token);
      for (const task of data.tasks || []) {
        task._projectId = proj.id;
        task._projectName = proj.name || "";
        allTasks.push(task);
      }
    } catch {
      /* skip broken project */
    }
  }
  return { projects, allTasks };
}

function bucketUpcoming(tasks, now = new Date()) {
  const t12 = new Date(now.getTime() + 12 * 3600 * 1000);
  const t24 = new Date(now.getTime() + 24 * 3600 * 1000);
  const t72 = new Date(now.getTime() + 72 * 3600 * 1000);
  const labels = ["Next 12h", "Next 12–24h", "Next 24–72h"];
  const buckets = labels.map((label) => ({ label, tasks: [] }));

  for (const task of tasks) {
    if (!isOpenTask(task) || !task.dueDate) continue;
    const dueDt = parseDue(task.dueDate);
    const cmp = comparisonDue(dueDt);
    const title = task.title || task.content || "Untitled";
    const displayTime = dueDt.toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    const entry = { title, displayTime, task, dueDt };
    if (cmp < t12) buckets[0].tasks.push(entry);
    else if (cmp < t24) buckets[1].tasks.push(entry);
    else if (cmp < t72) buckets[2].tasks.push(entry);
  }
  return buckets;
}

function tasksDueToday(tasks, now = new Date()) {
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const end = new Date(start.getTime() + 24 * 3600 * 1000);
  const out = [];

  for (const task of tasks) {
    if (!isOpenTask(task) || !task.dueDate) continue;
    const dueDt = parseDue(task.dueDate);
    if (dueDt >= end) continue;
    const title = task.title || task.content || "Untitled";
    const displayTime = dueDt.toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    out.push({
      title,
      displayTime,
      label: dueDt < start ? "overdue" : "today",
      task,
    });
  }
  out.sort((a, b) => {
    if (a.label !== b.label) return a.label === "overdue" ? -1 : 1;
    return a.displayTime.localeCompare(b.displayTime);
  });
  return out;
}

function defaultProjectId(projects) {
  const inbox = projects.find((p) => (p.name || "").toLowerCase().includes("inbox"));
  if (inbox) return inbox.id;
  return projects[0]?.id || null;
}

async function createTask(token, { title, projectId, dueDate }) {
  const body = { title, projectId };
  if (dueDate) body.dueDate = dueDate;
  return apiFetch("/task", token, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

function ticktickDueToday(dueDate) {
  const d = new Date(dueDate);
  d.setHours(23, 59, 59, 0);
  const pad = (n) => String(n).padStart(2, "0");
  const off = -d.getTimezoneOffset();
  const sign = off >= 0 ? "+" : "-";
  const abs = Math.abs(off);
  const hh = pad(Math.floor(abs / 60));
  const mm = pad(abs % 60);
  return (
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}` +
    `T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}` +
    `${sign}${hh}${mm}`
  );
}

module.exports = {
  readConfig,
  getToken,
  fetchProjectsAndTasks,
  bucketUpcoming,
  tasksDueToday,
  defaultProjectId,
  createTask,
  ticktickDueToday,
};
