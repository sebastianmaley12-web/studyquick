import type { MathBlock } from '../../lib/content/mathBlocks'
import { MathEquation } from './MathEquation'
import { NetworkDiagram } from './NetworkDiagram'
import { MathGraph } from './MathGraph'
import { MathTable } from './MathTable'
import { GeometryDiagram } from './GeometryDiagram'

/** The one place that maps a content-block's `kind` to its renderer — adding
 * a new block kind means adding one case here and one renderer component,
 * never new per-question JSX. `typeset` is the lazily-loaded HTML-entity
 * upgrade pass (see lib/mathsTypeset.ts) applied to paragraph prose so
 * inline constructs like x&sup2; still render as real KaTeX inside body
 * text. */
export function MathBlockRenderer({
  block,
  typeset,
}: {
  block: MathBlock
  typeset: ((html: string) => string) | null
}) {
  switch (block.kind) {
    case 'paragraph':
      return <p className="mx-paragraph" dangerouslySetInnerHTML={{ __html: typeset ? typeset(block.html) : block.html }} />
    case 'equation':
      return <MathEquation latex={block.latex} display={block.display ?? true} />
    case 'network':
      return <NetworkDiagram data={block.data} />
    case 'graph':
      return <MathGraph data={block.data} />
    case 'table':
      return <MathTable data={block.data} />
    case 'geometry':
      return <GeometryDiagram data={block.data} />
    default:
      return null
  }
}
