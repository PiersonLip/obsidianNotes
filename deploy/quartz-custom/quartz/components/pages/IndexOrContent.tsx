import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"
import Content from "./Content"
import SiteIndex from "./SiteIndex"
import { concatenateResources } from "../../util/resources"

export default (() => {
  const Index = SiteIndex()
  const Main = Content()

  const IndexOrContent: QuartzComponent = (props: QuartzComponentProps) => {
    if (props.fileData.slug === "index") {
      return <Index {...props} />
    }
    return <Main {...props} />
  }

  IndexOrContent.css = concatenateResources(Index.css, Main.css)
  return IndexOrContent
}) satisfies QuartzComponentConstructor
