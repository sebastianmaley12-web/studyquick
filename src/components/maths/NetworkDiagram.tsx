import type { NetworkData } from '../../lib/content/mathBlocks'

const HEIGHT = 320
const CENTER_Y = HEIGHT / 2
const CIRCLE_RADIUS = HEIGHT * 0.36
const LAYER_GAP = 92
const LAYER_PAD_X = 46
const LAYER_PAD_Y = 44

type Point = { x: number; y: number }

/** Deterministic circular layout — vertices placed evenly around a circle in
 * declaration order, starting at 12 o'clock, going clockwise. Used for
 * general (non-directed-flow) networks, where there's no natural "flow"
 * direction to lay out by — a circle spreads every vertex/edge evenly
 * regardless of which one a question is asking about. */
function circularLayout(vertexIds: string[]): { positions: Record<string, Point>; width: number } {
  const n = vertexIds.length
  const width = HEIGHT
  const cx = width / 2
  const positions: Record<string, Point> = {}
  vertexIds.forEach((id, i) => {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / n
    positions[id] = { x: cx + CIRCLE_RADIUS * Math.cos(angle), y: CENTER_Y + CIRCLE_RADIUS * Math.sin(angle) }
  })
  return { positions, width }
}

/** Left-to-right layered ("topological") layout for directed networks —
 * activity/precedence and flow networks read as a diagram exactly this way
 * in every HSC textbook: sources on the left, sinks on the right, edges
 * generally pointing rightward. Layer = longest path from any source (in-
 * degree 0) vertex, computed via Kahn's algorithm, so a vertex never sits
 * to the left of anything that must finish before it starts. */
function layeredLayout(
  vertices: { id: string }[],
  edges: { from: string; to: string }[],
): { positions: Record<string, Point>; width: number } {
  const ids = vertices.map((v) => v.id)
  const adj: Record<string, string[]> = {}
  const indeg: Record<string, number> = {}
  ids.forEach((id) => {
    adj[id] = []
    indeg[id] = 0
  })
  edges.forEach((e) => {
    adj[e.from]?.push(e.to)
    indeg[e.to] = (indeg[e.to] ?? 0) + 1
  })

  const layer: Record<string, number> = {}
  ids.forEach((id) => (layer[id] = 0))
  const remaining = { ...indeg }
  const queue = ids.filter((id) => remaining[id] === 0)
  while (queue.length > 0) {
    const id = queue.shift()!
    for (const next of adj[id]) {
      layer[next] = Math.max(layer[next], layer[id] + 1)
      remaining[next] -= 1
      if (remaining[next] === 0) queue.push(next)
    }
  }

  const byLayer: Record<number, string[]> = {}
  ids.forEach((id) => {
    const l = layer[id]
    ;(byLayer[l] ??= []).push(id)
  })
  const maxLayer = Math.max(...Object.keys(byLayer).map(Number))
  const maxRows = Math.max(...Object.values(byLayer).map((v) => v.length))
  const width = Math.max(HEIGHT, LAYER_PAD_X * 2 + maxLayer * LAYER_GAP)
  const usableHeight = Math.max(HEIGHT, LAYER_PAD_Y * 2 + (maxRows - 1) * 76)

  const positions: Record<string, Point> = {}
  Object.entries(byLayer).forEach(([l, layerIds]) => {
    const x = LAYER_PAD_X + Number(l) * LAYER_GAP
    const rowGap = layerIds.length > 1 ? (usableHeight - LAYER_PAD_Y * 2) / (layerIds.length - 1) : 0
    layerIds.forEach((id, i) => {
      const y =
        layerIds.length === 1
          ? usableHeight / 2
          : LAYER_PAD_Y + i * rowGap
      positions[id] = { x, y }
    })
  })
  return { positions, width: width }
}

function edgeKey(a: string, b: string): string {
  return [a, b].sort().join('|')
}

/** Renders a network/graph-theory diagram (vertices, edges, optional
 * weights/direction/highlighting) from structured data — never a
 * per-question hand-drawn SVG. Picks a circular layout for general/weighted
 * networks and a left-to-right layered layout for directed ones (critical
 * path, flow networks), matching how each is conventionally drawn. */
export function NetworkDiagram({ data }: { data: NetworkData }) {
  const isDirected = data.edges.some((e) => e.directed)
  const { positions, width } = isDirected
    ? layeredLayout(data.vertices, data.edges)
    : circularLayout(data.vertices.map((v) => v.id))
  const height = isDirected ? Math.max(HEIGHT, ...Object.values(positions).map((p) => p.y + LAYER_PAD_Y)) : HEIGHT
  const highlighted = new Set((data.highlightEdges ?? []).map(([a, b]) => edgeKey(a, b)))
  const vertexRadius = isDirected ? 24 : 18

  return (
    <div className="mx-diagram-frame">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className={isDirected ? 'mx-network mx-network-wide' : 'mx-network'}
        style={isDirected ? { width: Math.round(width), minWidth: Math.round(width) } : undefined}
        role="img"
        aria-label="Network diagram"
      >
        <defs>
          <marker
            id="mx-arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M0,0 L10,5 L0,10 z" fill="var(--net)" />
          </marker>
        </defs>

        {data.edges.map((e, i) => {
          const from = positions[e.from]
          const to = positions[e.to]
          if (!from || !to) return null
          const isHighlighted = highlighted.has(edgeKey(e.from, e.to))
          // Pull the line end back to the vertex circle's edge (not its
          // center) so an arrowhead lands on the circle, not inside it.
          const dx = to.x - from.x
          const dy = to.y - from.y
          const len = Math.hypot(dx, dy) || 1
          const ex = to.x - (dx / len) * vertexRadius
          const ey = to.y - (dy / len) * vertexRadius
          const midX = (from.x + to.x) / 2
          const midY = (from.y + to.y) / 2
          return (
            <g key={i}>
              <line
                x1={from.x}
                y1={from.y}
                x2={e.directed ? ex : to.x}
                y2={e.directed ? ey : to.y}
                className={isHighlighted ? 'mx-edge mx-edge-highlight' : 'mx-edge'}
                markerEnd={e.directed ? 'url(#mx-arrow)' : undefined}
              />
              {e.weight !== undefined && (
                <g>
                  <circle cx={midX} cy={midY} r={11} className="mx-weight-bg" />
                  <text x={midX} y={midY} className="mx-weight-text">
                    {e.weight}
                  </text>
                </g>
              )}
            </g>
          )
        })}

        {data.vertices.map((v) => {
          const p = positions[v.id]
          if (!p) return null
          return (
            <g key={v.id}>
              <circle cx={p.x} cy={p.y} r={vertexRadius} className="mx-vertex" />
              <text x={p.x} y={p.y} className="mx-vertex-text">
                {v.label ?? v.id}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
