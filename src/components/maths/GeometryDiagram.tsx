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

export function GeometryDiagram({ data }: { data: GeometryData }) {
  return (
    <div className="mx-diagram-frame">
      {data.shape === 'cylinder' ? (
        <Cylinder {...data} />
      ) : data.shape === 'composite-rect-semicircle' ? (
        <CompositeRectSemicircle {...data} />
      ) : null}
    </div>
  )
}
