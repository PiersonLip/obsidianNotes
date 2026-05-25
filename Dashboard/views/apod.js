const container = input?.container || dv.container;

let config = {};
try {
  config = JSON.parse(await dv.io.load("Dashboard/config.json"));
} catch {
  /* defaults */
}

const apiKey = config?.apod?.apiKey || "DEMO_KEY";
const today = window.moment().format("YYYY-MM-DD");
const cacheDir = "Dashboard/_cache";
const cachePath = `${cacheDir}/apod-${today}.json`;

function renderApod(data, note) {
  if (note) {
    container.createEl("p", { cls: "dash-muted dash-summary-note", text: note });
  }

  const titleRow = container.createDiv({ cls: "dash-apod-title" });
  titleRow.createEl("h4", { text: data.title || "Astronomy Picture of the Day" });
  titleRow.createEl("span", {
    cls: "dash-muted dash-summary-note",
    text: data.date ? ` · ${data.date}` : "",
  });

  if (data.media_type === "video") {
    const link = container.createEl("a", { href: data.url, text: "Watch video" });
    link.target = "_blank";
  } else if (data.url) {
    const img = container.createEl("img", { cls: "dash-apod-image" });
    img.src = data.url;
    img.alt = data.title || "APOD";
  }

  if (data.explanation) {
    container.createEl("p", { cls: "dash-apod-caption", text: data.explanation });
  }

  const links = container.createDiv({ cls: "dash-feed-links" });
  if (data.hdurl) {
    const hd = links.createEl("a", { href: data.hdurl, text: "HD image", cls: "dash-muted" });
    hd.target = "_blank";
  }
  if (data.copyright) {
    links.createEl("span", { cls: "dash-muted", text: ` · © ${data.copyright}` });
  }
  if (data.pageUrl) {
    const page = links.createEl("a", {
      href: data.pageUrl,
      text: " apod.nasa.gov",
      cls: "dash-muted",
    });
    page.target = "_blank";
  }
}

async function readCache(path) {
  if (!(await app.vault.adapter.exists(path))) return null;
  try {
    return JSON.parse(await app.vault.adapter.read(path));
  } catch {
    return null;
  }
}

async function writeCache(data) {
  try {
    if (!(await app.vault.adapter.exists(cacheDir))) {
      await app.vault.createFolder(cacheDir);
    }
  } catch {
    /* exists */
  }
  await app.vault.adapter.write(cachePath, JSON.stringify(data, null, 2));
}

async function newestCachedApod() {
  if (!(await app.vault.adapter.exists(cacheDir))) return null;
  const listed = await app.vault.adapter.list(cacheDir);
  const files = (listed?.files || [])
    .filter((f) => /apod-\d{4}-\d{2}-\d{2}\.json$/.test(f))
    .sort()
    .reverse();
  for (const file of files) {
    const data = await readCache(file);
    if (data) return data;
  }
  return null;
}

async function fetchFromNasaApi() {
  const resp = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${encodeURIComponent(apiKey)}&date=${today}`,
    { headers: { Accept: "application/json" } }
  );
  if (!resp.ok) {
    const err = new Error(`NASA APOD ${resp.status}`);
    err.status = resp.status;
    throw err;
  }
  return resp.json();
}

async function fetchFromRss() {
  const resp = await fetch("https://apod.nasa.gov/apod.rss");
  if (!resp.ok) throw new Error(`APOD RSS ${resp.status}`);
  const xml = await resp.text();
  const doc = new DOMParser().parseFromString(xml, "text/xml");
  const item = doc.querySelector("item");
  if (!item) throw new Error("APOD RSS: no items");

  const title = item.querySelector("title")?.textContent?.trim() || "APOD";
  const pageUrl = item.querySelector("link")?.textContent?.trim() || "";
  const pubDate = item.querySelector("pubDate")?.textContent?.trim() || "";
  const descHtml = item.querySelector("description")?.textContent || "";
  const descDoc = new DOMParser().parseFromString(descHtml, "text/html");
  const img = descDoc.querySelector("img");
  const url = img?.getAttribute("src") || "";
  let explanation = (descDoc.body?.textContent || "").trim();
  const parts = explanation.split(/\n{2,}/);
  if (parts.length > 1) explanation = parts.slice(1).join("\n\n").trim();

  return {
    title,
    date: pubDate ? window.moment(pubDate).format("YYYY-MM-DD") : today,
    url,
    hdurl: url,
    media_type: "image",
    explanation,
    copyright: "",
    pageUrl,
  };
}

try {
  let data = await readCache(cachePath);
  if (data) {
    renderApod(data);
    return;
  }

  let rateLimited = false;
  try {
    data = await fetchFromNasaApi();
    await writeCache(data);
    renderApod(data);
    return;
  } catch (apiErr) {
    rateLimited = apiErr.status === 429;
  }

  try {
    data = await fetchFromRss();
    await writeCache(data);
    renderApod(
      data,
      rateLimited
        ? "NASA API rate limited — loaded from apod.nasa.gov RSS. Add your own key in Dashboard/config.json (free at api.nasa.gov)."
        : undefined
    );
    return;
  } catch {
    /* fall through */
  }

  data = await newestCachedApod();
  if (data) {
    renderApod(
      data,
      rateLimited
        ? "NASA API rate limited — showing cached APOD. Add your own key in Dashboard/config.json."
        : "Showing cached APOD."
    );
    return;
  }

  const msg = rateLimited
    ? "NASA rate limit (429). Get a free API key at api.nasa.gov and set apod.apiKey in Dashboard/config.json."
    : "Could not load APOD.";
  container.createEl("p", { cls: "dash-error", text: msg });
} catch (err) {
  container.createEl("p", { cls: "dash-error", text: String(err.message || err) });
}
