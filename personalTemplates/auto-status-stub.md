<%*
// Add status: stub on new notes when missing. Does not touch note body.
const file = tp.config.target_file;
if (!file) return;

const cache = app.metadataCache.getFileCache(file);
if (cache?.frontmatter?.status !== undefined) return;

await app.fileManager.processFrontMatter(file, (fm) => {
  if (fm.status === undefined) {
    fm.status = "stub";
  }
});
%>
