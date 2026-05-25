const container = input?.container || dv.container;

let config = {};
try {
  config = JSON.parse(await dv.io.load("Dashboard/config.json"));
} catch {
  /* defaults */
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

  const titleRow = container.createDiv({ cls: "dash-wiki-title" });
  const titleLink = titleRow.createEl("h4");
  const a = titleLink.createEl("a", {
    href: article.content_urls?.desktop?.page || article.content_urls?.mobile?.page,
    text: article.titles?.display || article.title || "Featured article",
  });
  a.target = "_blank";

  titleRow.createEl("span", {
    cls: "dash-muted dash-summary-note",
    text: " · Wikipedia article of the day",
  });

  const thumb = article.thumbnail;
  if (thumb?.source) {
    const img = container.createEl("img", { cls: "dash-wiki-image" });
    img.src = thumb.source;
    img.alt = article.title || "Featured article";
  }

  const extract = article.extract || article.description || "";
  if (extract) {
    container.createEl("p", { cls: "dash-wiki-caption", text: extract });
  }

  const pageUrl = article.content_urls?.desktop?.page;
  if (pageUrl) {
    const link = container.createEl("a", {
      href: pageUrl,
      text: "Read on Wikipedia",
      cls: "dash-muted",
    });
    link.target = "_blank";
  }
} catch (err) {
  container.createEl("p", { cls: "dash-error", text: String(err.message || err) });
}
