/**
 * QuickAdd: New Glossary Term
 *
 * Creates Glossary/<term>.md with tag #glossary and optional aliases (see memory.md).
 */

const GLOSSARY_DIR = "Glossary";

function safeFilename(term) {
  return term.replace(/[\\/:*?"<>|]/g, "").trim();
}

function notePath(term) {
  return `${GLOSSARY_DIR}/${safeFilename(term)}.md`;
}

function shouldIncludeAlias(alias, stem, heading) {
  if (!alias) return false;
  const a = alias.trim();
  if (!a) return false;
  const lower = a.toLowerCase();
  if (lower === stem.toLowerCase()) return false;
  if (lower === heading.toLowerCase()) return false;
  return true;
}

function editorSelection(app) {
  const view = app.workspace.activeLeaf?.view;
  if (!view?.editor || typeof view.editor.getSelection !== "function") {
    return "";
  }
  return view.editor.getSelection().trim();
}

function buildNoteContent(heading, alias, definition) {
  const lines = ["---"];
  if (alias) {
    lines.push("aliases:");
    lines.push(`  - ${alias}`);
  }
  lines.push("tags:");
  lines.push("  - glossary");
  lines.push("---");
  lines.push("");
  lines.push(`# ${heading}`);
  lines.push("");
  if (definition) {
    lines.push(definition.trim());
    lines.push("");
  }
  return lines.join("\n");
}

module.exports = async (params) => {
  const { quickAddApi: qa, app } = params;

  const initial = editorSelection(app);

  const term = (
    await qa.inputPrompt(
      "Term (wikilink / filename)",
      "TESS",
      initial || undefined
    )
  )?.trim();
  if (!term) return;

  const stem = safeFilename(term);
  if (!stem) {
    new Notice("Invalid term name.", 4000);
    return;
  }

  const path = notePath(stem);
  if (app.vault.getAbstractFileByPath(path)) {
    new Notice(`Glossary note already exists: ${path}`, 5000);
    await app.workspace.openLinkText(path, "", false);
    return;
  }

  const heading = (
    await qa.inputPrompt("Note title (heading)", stem, stem)
  )?.trim() || stem;

  const aliasRaw = (
    await qa.inputPrompt(
      "Full phrase or alias (optional — e.g. Asymptotic Giant Branch)",
      "",
      ""
    )
  )?.trim();

  const alias = shouldIncludeAlias(aliasRaw, stem, heading) ? aliasRaw : null;

  let definition = "";
  if (typeof qa.wideInputPrompt === "function") {
    definition =
      (await qa.wideInputPrompt(
        "Definition",
        "One or more sentences. Leave blank to fill in after the note opens.",
        ""
      ))?.trim() || "";
  } else {
    definition =
      (
        await qa.inputPrompt(
          "Definition (short — expand in note if needed)",
          "",
          ""
        )
      )?.trim() || "";
  }

  await app.vault.adapter.mkdir(GLOSSARY_DIR).catch(() => {});
  const content = buildNoteContent(heading, alias, definition);
  await app.vault.create(path, content);
  await app.workspace.openLinkText(path, "", false);

  new Notice(`Created ${path}`, 4000);
};
