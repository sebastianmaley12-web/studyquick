import type { GraphData } from '../../lib/content/mathBlocks'

const SIZE = 320
const PAD = 34

/** Picks a "nice" grid step (1, 2, 5, 10, 20, 50...) for a given axis range,
 * targeting roughly 5-8 gridlines — the same heuristic any graphing tool
 * uses so the plane doesn't look cluttered or sparse regardless of range. */
function niceStep(range: number): number {
  const raw = range / 6
  const mag = Math.pow(10, Math.floor(Math.log10(raw)))
  const norm = raw / mag
  const step = norm < 1.5 ? 1 : norm < 3.5 ? 2 : norm < 7.5 ? 5 : 10
  return step * mag
}

function range(min: number, max: number, step: number): number[] {
  const out: number[] = []
  const start = Math.ceil(min / step) * step
  for (let v = start; v <= max + 1e-9; v += step) out.push(Math.round(v * 1e6) / 1e6)
  return out
}

/** Renders a coordinate plane (axes, gridlines, optional points/lines) from
 * structured data — the reusable renderer behind every "graph" content
 * block, not a hand-drawn diagram per question. */
export function MathGraph({ data }: { data: GraphData }) {
  const [xMin, xMax] = data.xRange
  const [yMin, yMax] = data.yRange
  const sx = (x: number) => PAD + ((x - xMin) / (xMax - xMin)) * (SIZE - 2 * PAD)
  const sy = (y: number) => SIZE - PAD - ((y - yMin) / (yMax - yMin)) * (SIZE - 2 * PAD)

  const xStep = niceStep(xMax - xMin)
  const yStep = niceStep(yMax - yMin)
  const xTicks = range(xMin, xMax, xStep)
  const yTicks = range(yMin, yMax, yStep)

  return (
    <div className="mx-diagram-frame">
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="mx-graph" role="img" aria-label="Coordinate plane">
        {xTicks.map((x) => (
          <line key={`gx${x}`} x1={sx(x)} y1={PAD} x2={sx(x)} y2={SIZE - PAD} className="mx-grid" />
        ))}
        {yTicks.map((y) => (
          <line key={`gy${y}`} x1={PAD} y1={sy(y)} x2={SIZE - PAD} y2={sy(y)} className="mx-grid" />
        ))}

        {yMin <= 0 && yMax >= 0 && (
          <line x1={PAD} y1={sy(0)} x2={SIZE - PAD} y2={sy(0)} className="mx-axis" />
        )}
        {xMin <= 0 && xMax >= 0 && (
          <line x1={sx(0)} y1={PAD} x2={sx(0)} y2={SIZE - PAD} className="mx-axis" />
        )}

        {xTicks
          .filter((x) => x !== 0)
          .map((x) => (
            <text key={`tx${x}`} x={sx(x)} y={SIZE - PAD + 16} className="mx-tick">
              {x}
            </text>
          ))}
        {yTicks
          .filter((y) => y !== 0)
          .map((y) => (
            <text key={`ty${y}`} x={PAD - 8} y={sy(y) + 4} className="mx-tick mx-tick-y">
              {y}
            </text>
          ))}

        {data.lines?.map((l, i) => (
          <line
            key={i}
            x1={sx(l.from[0])}
            y1={sy(l.from[1])}
            x2={sx(l.to[0])}
            y2={sy(l.to[1])}
            className="mx-line"
          />
        ))}

        {data.points?.map((p, i) => (
          <g key={i}>
            <circle cx={sx(p.x)} cy={sy(p.y)} r={5} className="mx-point" />
            {p.label && (
              <text x={sx(p.x) + 9} y={sy(p.y) - 8} className="mx-point-label">
                {p.label}
              </text>
            )}
          </g>
        ))}
      </svg>
    </div>
  )
}
