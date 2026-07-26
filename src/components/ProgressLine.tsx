import { barClass, pct } from '../lib/progressStats'

export function ProgressLine({
  done,
  total,
  text,
  size,
}: {
  done: number
  total: number
  text: string
  size?: 'sm'
}) {
  const p = pct(done, total)
  return (
    <div className="prog-line">
      <div className={['pbar', size].filter(Boolean).join(' ')}>
        <i style={{ width: `${p}%` }} className={barClass(p)} />
      </div>
      <span className="ptext">{text}</span>
    </div>
  )
}
