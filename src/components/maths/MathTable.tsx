import type { TableData } from '../../lib/content/mathBlocks'

/** Renders a structured table (e.g. an activity/precedence table for critical
 * path, or a financial schedule) instead of the source data being folded
 * into a sentence. Cell content may carry the same HTML-entity math markup
 * the rest of the app uses (e.g. "A&thinsp;&rarr;&thinsp;B"). */
export function MathTable({ data }: { data: TableData }) {
  return (
    <div className="mx-diagram-frame mx-table-frame">
      {data.caption && <div className="mx-table-caption">{data.caption}</div>}
      <div className="mx-table-scroll">
        <table className="mx-table">
          <thead>
            <tr>
              {data.headers.map((h, i) => (
                <th key={i} dangerouslySetInnerHTML={{ __html: h }} />
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td key={ci} dangerouslySetInnerHTML={{ __html: cell }} />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
