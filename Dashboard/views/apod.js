const container = input?.container || dv.container;

let config = {};
try {
  config = JSON.parse(await dv.io.load("Dashboard/config.json"));
} catch {
  /* defaults */
}

const apiKey = config?.apod?.apiKey || "DEMO_KEY";

try {
  const resp = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${encodeURIComponent(apiKey)}`
  );
  if (!resp.ok) throw new Error(`NASA APOD ${resp.status}`);
  const data = await resp.json();

  const titleRow = container.createDiv({ cls: "dash-apod-title" });
  titleRow.createEl("h4", { text: data.title || "Astronomy Picture of the Day" });
  titleRow.createEl("span", {
    cls: "dash-muted dash-summary-note",
    text: data.date ? ` · ${data.date}` : "",
  });

  if (data.media_type === "video") {
    const link = container.createEl("a", {
      href: data.url,
      text: "Watch video",
    });
    link.target = "_blank";
  } else if (data.url) {
    const img = container.createEl("img", { cls: "dash-apod-image" });
    img.src = data.url;
    img.alt = data.title || "APOD";
  }

  if (data.explanation) {
    const excerpt =
      data.explanation.length > 420
        ? `${data.explanation.slice(0, 417)}…`
        : data.explanation;
    container.createEl("p", { cls: "dash-apod-caption", text: excerpt });
  }

  if (data.hdurl) {
    const hd = container.createEl("a", {
      href: data.hdurl,
      text: "HD image",
      cls: "dash-muted",
    });
    hd.target = "_blank";
  }
} catch (err) {
  container.createEl("p", { cls: "dash-error", text: String(err.message || err) });
}
