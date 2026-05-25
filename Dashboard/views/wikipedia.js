const container = input?.container || dv.container;

let config = {};
try {
  config = JSON.parse(await dv.io.load("Dashboard/config.json"));
} catch {
  /* defaults */
}

function stripHtml(html) {
  if (!html) return "";
  const el = document.createElement("div");
  el.innerHTML = html;
  return (el.textContent || "").replace(/\s+/g, " ").trim();
}

const lang = config?.wikipedia?.lang || "en";
const ua =
  config?.wikipedia?.userAgent ||
  "AstroNotesDashboard/1.0 (Obsidian; personal vault dashboard)";

const m = window.moment();
const url = `https://${lang}.wikipedia.org/api/rest_v1/feed/featured/${m.format("YYYY/MM/DD")}`;

try {
  const resp = await fetch(url, {
    headers: { "User-Agent": ua, Accept: "application/json" },
  });
  if (!resp.ok) throw new Error(`Wikipedia featured feed ${resp.status}`);
  const data = await resp.json();
  const article = data.tfa;
  if (!article) throw new Error("No featured article in feed");

  const title =
    stripHtml(article.titles?.display) ||
    stripHtml(article.title) ||
    "Featured article";
  const pageUrl =
    article.content_urls?.desktop?.page || article.content_urls?.mobile?.page;

  const titleEl = container.createEl("h4", { cls: "dash-wiki-article-title" });
  const link = titleEl.createEl("a", { href: pageUrl, text: title });
  link.target = "_blank";

  const thumb = article.thumbnail;
  if (thumb?.source) {
    const media = container.createDiv({ cls: "dash-wiki-media" });
    const img = media.createEl("img", { cls: "dash-wiki-image" });
    img.src = thumb.source;
    img.alt = title;
  }

  const extract = stripHtml(article.extract || article.description || "");
  if (extract) {
    container.createEl("p", { cls: "dash-wiki-caption", text: extract });
  }

  if (pageUrl) {
    const foot = container.createEl("a", {
      href: pageUrl,
      text: "Read on Wikipedia →",
      cls: "dash-muted dash-wiki-read",
    });
    foot.target = "_blank";
  }
} catch (err) {
  container.createEl("p", { cls: "dash-error", text: String(err.message || err) });
}
