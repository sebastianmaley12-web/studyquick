/**
 * Structured content-block schema for the Maths presentation system
 * (src/components/maths/MathQuestionCard.tsx and friends). Approved in the
 * Stage B prototype review, now the production renderer for every Maths
 * question — see src/content/mathTopicBlocks/ for the per-topic entries.
 *
 * The core idea this answers: a question's presentation is data (an ordered
 * list of typed blocks), and a small set of reusable renderers decides how
 * each block *looks* — never bespoke JSX per question. The underlying
 * question record (id, type, ans, tol, unit, opts, marks, sol) still comes
 * from topics.json untouched; this only supplies richer *presentation* for
 * the question body and worked solution.
 */

export type MathBlock =
  | { kind: 'paragraph'; html: string }
  | { kind: 'equation'; latex: string; display?: boolean }
  | { kind: 'network'; data: NetworkData }
  | { kind: 'graph'; data: GraphData }
  | { kind: 'table'; data: TableData }
  | { kind: 'geometry'; data: GeometryData }

export interface NetworkVertex {
  id: string
  label?: string
}
export interface NetworkEdge {
  from: string
  to: string
  weight?: number
  directed?: boolean
}
export interface NetworkData {
  vertices: NetworkVertex[]
  edges: NetworkEdge[]
  /** Highlights a set of edges (e.g. the critical path / an MST) in the
   * accent colour — matched as unordered from/to pairs. */
  highlightEdges?: [string, string][]
}

export interface GraphPoint {
  x: number
  y: number
  label?: string
}
export interface GraphLine {
  from: [number, number]
  to: [number, number]
}
export interface GraphData {
  xRange: [number, number]
  yRange: [number, number]
  xLabel?: string
  yLabel?: string
  points?: GraphPoint[]
  lines?: GraphLine[]
}

export interface TableData {
  headers: string[]
  rows: string[][]
  caption?: string
}

export type GeometryData =
  | { shape: 'cylinder'; radius: number; height: number; radiusLabel?: string; heightLabel?: string }
  | { shape: 'composite-rect-semicircle'; width: number; height: number; widthLabel?: string; heightLabel?: string }

export interface MathWorkspaceStep {
  label: string
  latex: string
}

/** The prototype's per-question presentation entry — keyed by the real
 * question id from topics.json, same lookup pattern as
 * MATHS_WORKSPACE_ENTRIES so it's a trivial swap-in later, not a new
 * concept. */
export interface MathBlockEntry {
  blocks: MathBlock[]
  solutionBlocks: MathBlock[]
  steps?: MathWorkspaceStep[]
}
