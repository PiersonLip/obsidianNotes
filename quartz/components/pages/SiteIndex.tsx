import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"
import { trieFromAllFiles } from "../../util/ctx"
import { FileTrieNode } from "../../util/fileTrie"
import { BuildTimeTrieData } from "../../util/ctx"
import { FilePath, FullSlug, resolveRelative, slugifyFilePath } from "../../util/path"
import { QuartzPluginData } from "../../plugins/vfile"
import { byDateAndAlphabeticalFolderFirst } from "../PageList"
import { concatenateResources } from "../../util/resources"
import style from "../styles/siteIndex.scss"

/** Leaf notes hidden on hub-style folder listings (AstroBites articles, book chapters, etc.) */
const HUB_EXCLUDE_TAGS = [
  "astro-notes/astrobite",
  "astro-notes/book-chapter",
  "astro-notes/astro210",
]

export type SiteIndexSection =
  | { title: string; folder: string; hubsOnly?: boolean; hideHub?: boolean }
  | { title: string; tag: string }

export const defaultSiteIndexSections: SiteIndexSection[] = [
  { title: "Class Notes", folder: "Class Notes", hubsOnly: true },
  { title: "General Notes", tag: "astro-notes/generalNotes" },
  { title: "Paper Notes", folder: "Paper Notes" },
  { title: "AstroBites", folder: "AstroBites", hideHub: true },
  {
    title: "Physics of Binary Star Evolution",
    folder: "Physics of Binary Star Evolution",
    hubsOnly: true,
  },
  { title: "Tools", folder: "POSYDON" },
]

function hasExcludedTag(page: QuartzPluginData, excludeTags: string[]): boolean {
  const tags = page.frontmatter?.tags ?? []
  return tags.some((t) => excludeTags.includes(t))
}

/** Hub/index note for a folder (e.g. AstroBites/Astrobites, Class Notes/Class-Notes). */
function isFolderHub(page: QuartzPluginData, folder: string): boolean {
  const hubSlug = slugifyFilePath(folder.split("/").pop()! as FilePath, true)
  const fileSlug = (page.slug ?? "").split("/").pop() ?? ""
  return fileSlug.toLowerCase() === hubSlug.toLowerCase()
}

function trieChildToPage(
  node: FileTrieNode<BuildTimeTrieData>,
): QuartzPluginData | undefined {
  if (node.data) {
    return node.data
  }
  if (!node.isFolder) {
    return undefined
  }
  return {
    slug: node.slug,
    dates: {
      created: new Date(),
      modified: new Date(),
      published: new Date(),
    },
    frontmatter: {
      title: node.displayName,
      tags: [],
    },
  }
}

function folderToSegments(folder: string): string[] {
  return folder
    .split("/")
    .filter(Boolean)
    .map((seg) => slugifyFilePath(seg as FilePath, true))
}

function pagesInFolder(
  allFiles: QuartzPluginData[],
  folder: string,
  hubsOnly: boolean,
  hideHub: boolean,
): QuartzPluginData[] {
  const trie = trieFromAllFiles(allFiles)
  const node = trie.findNode(folderToSegments(folder))
  if (!node) {
    return []
  }

  const pages: QuartzPluginData[] = []
  for (const child of node.children) {
    const page = trieChildToPage(child)
    if (!page) {
      continue
    }
    if (hideHub && isFolderHub(page, folder)) {
      continue
    }
    if (
      hubsOnly &&
      !child.isFolder &&
      hasExcludedTag(page, HUB_EXCLUDE_TAGS) &&
      !isFolderHub(page, folder)
    ) {
      continue
    }
    pages.push(page)
  }
  return pages
}

function pagesWithTag(allFiles: QuartzPluginData[], tag: string): QuartzPluginData[] {
  return allFiles.filter((page) => {
    const tags = page.frontmatter?.tags ?? []
    if (!tags.includes(tag) || tags.includes("glossary")) {
      return false
    }
    const slug = page.slug ?? ""
    if (slug === "index" || slug === "Home" || slug === "memory" || slug === "SETUP") {
      return false
    }
    if (slug.startsWith("Glossary/")) {
      return false
    }
    return true
  })
}

function sectionPages(
  section: SiteIndexSection,
  allFiles: QuartzPluginData[],
  cfg: QuartzComponentProps["cfg"],
): QuartzPluginData[] {
  const sort = byDateAndAlphabeticalFolderFirst(cfg)
  if ("tag" in section) {
    return pagesWithTag(allFiles, section.tag).sort(sort)
  }
  return pagesInFolder(
    allFiles,
    section.folder,
    section.hubsOnly ?? false,
    section.hideHub ?? false,
  ).sort(sort)
}

export default (() => {
  const SiteIndex: QuartzComponent = (props: QuartzComponentProps) => {
    const { fileData, allFiles, cfg } = props
    const sections =
      (fileData.frontmatter?.siteIndex as SiteIndexSection[] | undefined) ??
      defaultSiteIndexSections

    return (
      <div class="site-index">
        {sections.map((section) => {
          const pages = sectionPages(section, allFiles, cfg)
          if (pages.length === 0) {
            return null
          }
          return (
            <section class="site-index-section">
              <h2>{section.title}</h2>
              <ul>
                {pages.map((page) => (
                  <li>
                    <a
                      href={resolveRelative(fileData.slug!, page.slug!)}
                      class="internal"
                    >
                      {page.frontmatter?.title}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )
        })}
      </div>
    )
  }

  SiteIndex.css = style
  return SiteIndex
}) satisfies QuartzComponentConstructor
