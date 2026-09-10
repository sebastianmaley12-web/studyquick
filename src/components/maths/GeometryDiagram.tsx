import type { GeometryData } from '../../lib/content/mathBlocks'

const SIZE = 320

/** Preset geometric solids/shapes, each a pure function of its parameters —
 * add a new `shape` case here to support another one, rather than hand-
 * drawing an SVG per question. Only the shapes actually used by real
 * questions are implemented so far; unset shapes render nothing. */
function Cylinder({ radius, height, radiusLabel, heightLabel }: Extract<GeometryData, { shape: 'cylinder' }>) {
  const rx = 70
  const ry = 20
  const h = 140
  const cx = SIZE / 2
  const topY = 90
  const bottomY = topY + h
  return (
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="mx-geometry" role="img" aria-label="Cylinder">
      <ellipse cx={cx} cy={bottomY} rx={rx} ry={ry} className="mx-solid-fill" />
      <path
        d={`M ${cx - rx} ${bottomY} L ${cx - rx} ${topY} A ${rx} ${ry} 0 0 1 ${cx + rx} ${topY} L ${cx + rx} ${bottomY}`}
        className="mx-solid-fill mx-solid-side"
      />
      <ellipse cx={cx} cy={topY} rx={rx} ry={ry} className="mx-solid-top" />
      {/* radius line on the top ellipse */}
      <line x1={cx} y1={topY} x2={cx + rx} y2={topY} className="mx-dim-line" />
      <text x={cx + rx / 2} y={topY - 6} className="mx-dim-label">
        {radiusLabel ?? `r = ${radius}`}
      </text>
      {/* height bracket on the right */}
      <line x1={cx + rx + 22} y1={topY} x2={cx + rx + 22} y2={bottomY} className="mx-dim-line" />
      <line x1={cx + rx + 18} y1={topY} x2={cx + rx + 26} y2={topY} className="mx-dim-line" />
      <line x1={cx + rx + 18} y1={bottomY} x2={cx + rx + 26} y2={bottomY} className="mx-dim-line" />
      <text x={cx + rx + 30} y={(topY + bottomY) / 2} className="mx-dim-label mx-dim-label-v">
        {heightLabel ?? `h = ${height}`}
      </text>
    </svg>
  )
}

function CompositeRectSemicircle({
  width,
  height,
  widthLabel,
  heightLabel,
}: Extract<GeometryData, { shape: 'composite-rect-semicircle' }>) {
  const w = 180
  const h = 110
  const x0 = (SIZE - w) / 2
  const y0 = 110
  const r = h / 2
  return (
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="mx-geometry" role="img" aria-label="Composite shape">
      <path
        d={`M ${x0} ${y0} L ${x0 + w} ${y0} A ${r} ${r} 0 0 1 ${x0 + w} ${y0 + h} L ${x0} ${y0 + h} Z`}
        className="mx-solid-fill mx-solid-side"
      />
      <line x1={x0} y1={y0 - 14} x2={x0 + w} y2={y0 - 14} className="mx-dim-line" />
      <text x={x0 + w / 2} y={y0 - 20} className="mx-dim-label">
        {widthLabel ?? `${width} m`}
      </text>
      <line x1={x0 - 20} y1={y0} x2={x0 - 20} y2={y0 + h} className="mx-dim-line" />
      <text x={x0 - 26} y={y0 + h / 2} className="mx-dim-label mx-dim-label-v">
        {heightLabel ?? `${height} m`}
      </text>
    </svg>
  )
}

type Point = { x: number; y: number }

/** Small square corner-mark at vertex `v`, drawn along its two adjacent
 * edges (toward `n1` and `n2`) — generic so it works at any of a triangle's
 * three vertices without per-vertex special-casing. */
function rightAngleMarkPath(v: Point, n1: Point, n2: Point, size = 16): string {
  const unit = (from: Point, to: Point) => {
    const dx = to.x - from.x
    const dy = to.y - from.y
    const len = Math.hypot(dx, dy) || 1
    return { x: dx / len, y: dy / len }
  }
  const u1 = unit(v, n1)
  const u2 = unit(v, n2)
  const p1 = { x: v.x + u1.x * size, y: v.y + u1.y * size }
  const p2 = { x: v.x + u1.x * size + u2.x * size, y: v.y + u1.y * size + u2.y * size }
  const p3 = { x: v.x + u2.x * size, y: v.y + u2.y * size }
  return `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y} L ${p3.x} ${p3.y}`
}

/** A plain scalene triangle, schematic and not to scale (as is standard for
 * these textbook diagrams) — one fixed, legible shape with whichever
 * vertex/side/angle labels the question actually supplies overlaid on it. */
function Triangle({ labels, rightAngleAt }: Extract<GeometryData, { shape: 'triangle' }>) {
  const bl: Point = { x: 60, y: 240 }
  const br: Point = { x: 260, y: 240 }
  const top: Point = { x: 165, y: 70 }
  const centroid = {
    x: (bl.x + br.x + top.x) / 3,
    y: (bl.y + br.y + top.y) / 3,
  }
  const towardCentroid = (v: Point, t: number) => ({
    x: v.x + (centroid.x - v.x) * t,
    y: v.y + (centroid.y - v.y) * t,
  })

  return (
    <svg viewBox={`0 0 320 320`} className="mx-geometry" role="img" aria-label="Triangle">
      <path
        d={`M ${bl.x} ${bl.y} L ${br.x} ${br.y} L ${top.x} ${top.y} Z`}
        className="mx-solid-fill mx-solid-side"
      />

      {rightAngleAt === 'bottomLeft' && (
        <path d={rightAngleMarkPath(bl, br, top)} className="mx-dim-line" fill="none" />
      )}
      {rightAngleAt === 'bottomRight' && (
        <path d={rightAngleMarkPath(br, bl, top)} className="mx-dim-line" fill="none" />
      )}
      {rightAngleAt === 'top' && (
        <path d={rightAngleMarkPath(top, bl, br)} className="mx-dim-line" fill="none" />
      )}

      {labels.bottomLeft && (
        <text x={bl.x - 14} y={bl.y + 16} className="mx-dim-label">
          {labels.bottomLeft}
        </text>
      )}
      {labels.bottomRight && (
        <text x={br.x + 14} y={br.y + 16} className="mx-dim-label">
          {labels.bottomRight}
        </text>
      )}
      {labels.top && (
        <text x={top.x} y={top.y - 12} className="mx-dim-label">
          {labels.top}
        </text>
      )}

      {labels.base && (
        <text x={(bl.x + br.x) / 2} y={bl.y + 24} className="mx-dim-label">
          {labels.base}
        </text>
      )}
      {labels.left && (
        <text x={(bl.x + top.x) / 2 - 24} y={(bl.y + top.y) / 2} className="mx-dim-label">
          {labels.left}
        </text>
      )}
      {labels.right && (
        <text x={(top.x + br.x) / 2 + 24} y={(top.y + br.y) / 2} className="mx-dim-label">
          {labels.right}
        </text>
      )}

      {labels.angleBottomLeft && rightAngleAt !== 'bottomLeft' && (
        <text {...towardCentroid(bl, 0.32)} className="mx-dim-label">
          {labels.angleBottomLeft}
        </text>
      )}
      {labels.angleBottomRight && rightAngleAt !== 'bottomRight' && (
        <text {...towardCentroid(br, 0.32)} className="mx-dim-label">
          {labels.angleBottomRight}
        </text>
      )}
      {labels.angleTop && rightAngleAt !== 'top' && (
        <text {...towardCentroid(top, 0.32)} className="mx-dim-label">
          {labels.angleTop}
        </text>
      )}
    </svg>
  )
}

/** Schematic isometric-style box — front face lit, top/right faces tinted,
 * matching the same visual language as Cylinder/CompositeRectSemicircle. */
function RectangularPrism({
  lengthLabel,
  widthLabel,
  heightLabel,
  length,
  width,
  height,
}: Extract<GeometryData, { shape: 'rectangular-prism' }>) {
  const x0 = 90
  const y0 = 120
  const w = 130
  const h = 100
  const dx = 50
  const dy = -35
  const a: Point = { x: x0, y: y0 + h }
  const b: Point = { x: x0 + w, y: y0 + h }
  const c: Point = { x: x0 + w, y: y0 }
  const d: Point = { x: x0, y: y0 }
  const e: Point = { x: d.x + dx, y: d.y + dy }
  const f: Point = { x: c.x + dx, y: c.y + dy }
  const g: Point = { x: b.x + dx, y: b.y + dy }

  return (
    <svg viewBox="0 0 320 320" className="mx-geometry" role="img" aria-label="Rectangular prism">
      <path
        d={`M ${d.x} ${d.y} L ${c.x} ${c.y} L ${f.x} ${f.y} L ${e.x} ${e.y} Z`}
        className="mx-solid-fill mx-solid-side"
      />
      <path
        d={`M ${b.x} ${b.y} L ${c.x} ${c.y} L ${f.x} ${f.y} L ${g.x} ${g.y} Z`}
        className="mx-solid-fill mx-solid-side"
      />
      <path
        d={`M ${a.x} ${a.y} L ${b.x} ${b.y} L ${c.x} ${c.y} L ${d.x} ${d.y} Z`}
        className="mx-solid-top"
      />

      <line x1={a.x} y1={a.y + 16} x2={b.x} y2={b.y + 16} className="mx-dim-line" />
      <text x={(a.x + b.x) / 2} y={a.y + 30} className="mx-dim-label">
        {widthLabel ?? `${width}`}
      </text>

      <line x1={b.x + 22} y1={b.y} x2={c.x + 22} y2={c.y} className="mx-dim-line" />
      <text x={b.x + 30} y={(b.y + c.y) / 2} className="mx-dim-label mx-dim-label-v">
        {heightLabel ?? `${height}`}
      </text>

      <text x={(d.x + e.x) / 2 - 6} y={(d.y + e.y) / 2 - 8} className="mx-dim-label">
        {lengthLabel ?? `${length}`}
      </text>
    </svg>
  )
}

/** A cylinder body topped with a hemisphere dome — same construction as
 * Cylinder but the flat top ellipse is replaced with a rounded cap. */
function CylinderHemisphere({
  radius,
  height,
  radiusLabel,
  heightLabel,
}: Extract<GeometryData, { shape: 'cylinder-hemisphere' }>) {
  const rx = 65
  const ry = 18
  const cx = 160
  const domeTopY = 55
  const joinY = 95
  const bottomY = 240
  const domeRy = joinY - domeTopY

  return (
    <svg viewBox="0 0 320 320" className="mx-geometry" role="img" aria-label="Cylinder topped with a hemisphere">
      <ellipse cx={cx} cy={bottomY} rx={rx} ry={ry} className="mx-solid-fill" />
      <path
        d={`M ${cx - rx} ${bottomY} L ${cx - rx} ${joinY} A ${rx} ${ry} 0 0 1 ${cx + rx} ${joinY} L ${cx + rx} ${bottomY}`}
        className="mx-solid-fill mx-solid-side"
      />
      <path
        d={`M ${cx - rx} ${joinY} A ${rx} ${domeRy} 0 0 1 ${cx + rx} ${joinY} Z`}
        className="mx-solid-top"
      />
      <ellipse cx={cx} cy={joinY} rx={rx} ry={ry} className="mx-solid-side" fill="none" />

      <line x1={cx} y1={joinY} x2={cx + rx} y2={joinY} className="mx-dim-line" />
      <text x={cx + rx / 2} y={joinY - 6} className="mx-dim-label">
        {radiusLabel ?? `r = ${radius}`}
      </text>

      <line x1={cx + rx + 22} y1={joinY} x2={cx + rx + 22} y2={bottomY} className="mx-dim-line" />
      <line x1={cx + rx + 18} y1={joinY} x2={cx + rx + 26} y2={joinY} className="mx-dim-line" />
      <line x1={cx + rx + 18} y1={bottomY} x2={cx + rx + 26} y2={bottomY} className="mx-dim-line" />
      <text x={cx + rx + 30} y={(joinY + bottomY) / 2} className="mx-dim-label mx-dim-label-v">
        {heightLabel ?? `h = ${height}`}
      </text>
    </svg>
  )
}

export function GeometryDiagram({ data }: { data: GeometryData }) {
  return (
    <div className="mx-diagram-frame">
      {data.shape === 'cylinder' ? (
        <Cylinder {...data} />
      ) : data.shape === 'composite-rect-semicircle' ? (
        <CompositeRectSemicircle {...data} />
      ) : data.shape === 'triangle' ? (
        <Triangle {...data} />
      ) : data.shape === 'rectangular-prism' ? (
        <RectangularPrism {...data} />
      ) : data.shape === 'cylinder-hemisphere' ? (
        <CylinderHemisphere {...data} />
      ) : null}
    </div>
  )
}
