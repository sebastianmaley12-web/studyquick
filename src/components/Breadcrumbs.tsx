import { Link, useLocation } from 'react-router-dom'
import {
  MATHS_RESOURCE_LABELS,
  MODERN_HISTORY_RESOURCE_LABELS,
  mathsTopicsBySlug,
  modernHistoryTopics,
  type MathsResource,
  type ModernHistoryResource,
} from '../lib/content'

type Crumb = { label: string; to?: string }

function crumbsForPath(pathname: string): Crumb[] {
  const seg = pathname.split('/').filter(Boolean)

  if (seg[0] !== 'subjects') return [{ label: 'All subjects' }]

  if (seg[1] === 'modern-history') {
    if (seg.length === 2) {
      return [{ label: 'All subjects', to: '/' }, { label: 'Modern History' }]
    }
    const topicId = seg[2]
    const resource = seg[3] as ModernHistoryResource | undefined
    const topic = modernHistoryTopics.find((t) => t.id === topicId)
    return [
      { label: 'All subjects', to: '/' },
      { label: 'Modern History', to: '/subjects/modern-history' },
      { label: topic?.short ?? topicId, to: `/subjects/modern-history/${topicId}` },
      { label: MODERN_HISTORY_RESOURCE_LABELS[resource ?? 'summary'] },
    ]
  }

  if (seg[1] === 'maths') {
    if (seg.length === 2) {
      return [{ label: 'All subjects', to: '/' }, { label: 'Mathematics Standard 2' }]
    }
    const slug = seg[2]
    const resource = seg[3] as MathsResource | undefined
    const topic = mathsTopicsBySlug[slug]
    return [
      { label: 'All subjects', to: '/' },
      { label: 'Mathematics Standard 2', to: '/subjects/maths' },
      {
        label: topic ? `${topic.code} ${topic.name}` : slug,
        to: `/subjects/maths/${slug}`,
      },
      { label: MATHS_RESOURCE_LABELS[resource ?? 'facts'] },
    ]
  }

  return [{ label: 'All subjects', to: '/' }]
}

export function Breadcrumbs() {
  const { pathname } = useLocation()
  const crumbs = crumbsForPath(pathname)

  return (
    <nav className="crumbs">
      {crumbs.map((crumb, i) => {
        const isCurrent = i === crumbs.length - 1
        return (
          <span key={i} style={{ display: 'contents' }}>
            {i > 0 && <span className="crumb-sep">/</span>}
            {crumb.to && !isCurrent ? (
              <Link
                className="crumb"
                to={crumb.to}
                dangerouslySetInnerHTML={{ __html: crumb.label }}
              />
            ) : (
              <button
                className="crumb current"
                type="button"
                dangerouslySetInnerHTML={{ __html: crumb.label }}
              />
            )}
          </span>
        )
      })}
    </nav>
  )
}
