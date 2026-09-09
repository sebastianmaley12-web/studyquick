import { Link, useLocation } from 'react-router-dom'
import {
  MATHS_RESOURCE_LABELS,
  mathsTopicsBySlug,
  type MathsResource,
} from '../lib/content/maths'
import {
  MODERN_HISTORY_RESOURCE_LABELS,
  modernHistoryTopics,
  type ModernHistoryResource,
} from '../lib/content/modernHistory'
import { HMS_RESOURCE_LABELS, hmsTopics, type HmsResource } from '../lib/content/hms'
import {
  BUSINESS_RESOURCE_LABELS,
  businessTopics,
  type BusinessResource,
} from '../lib/content/business'
import { LEGAL_RESOURCE_LABELS, legalTopics, type LegalResource } from '../lib/content/legal'

type Crumb = { label: string; to?: string }

function crumbsForPath(pathname: string): Crumb[] {
  const seg = pathname.split('/').filter(Boolean)

  if (seg[0] === 'progress') return [{ label: 'Dashboard', to: '/dashboard' }, { label: 'Your progress' }]

  if (seg[0] !== 'subjects') return [{ label: 'All subjects' }]

  if (seg[1] === 'modern-history') {
    if (seg.length === 2) {
      return [{ label: 'Dashboard', to: '/dashboard' }, { label: 'Modern History' }]
    }
    const topicId = seg[2]
    const resource = seg[3] as ModernHistoryResource | undefined
    const topic = modernHistoryTopics.find((t) => t.id === topicId)
    return [
      { label: 'Dashboard', to: '/dashboard' },
      { label: 'Modern History', to: '/subjects/modern-history' },
      { label: topic?.short ?? topicId, to: `/subjects/modern-history/${topicId}` },
      { label: MODERN_HISTORY_RESOURCE_LABELS[resource ?? 'summary'] },
    ]
  }

  if (seg[1] === 'maths') {
    if (seg.length === 2) {
      return [{ label: 'Dashboard', to: '/dashboard' }, { label: 'Mathematics Standard 2' }]
    }
    const slug = seg[2]
    const resource = seg[3] as MathsResource | undefined
    const topic = mathsTopicsBySlug[slug]
    return [
      { label: 'Dashboard', to: '/dashboard' },
      { label: 'Mathematics Standard 2', to: '/subjects/maths' },
      {
        label: topic ? `${topic.code} ${topic.name}` : slug,
        to: `/subjects/maths/${slug}`,
      },
      { label: MATHS_RESOURCE_LABELS[resource ?? 'facts'] },
    ]
  }

  if (seg[1] === 'hms') {
    if (seg.length === 2) {
      return [{ label: 'Dashboard', to: '/dashboard' }, { label: 'Health & Movement Science' }]
    }
    const topicId = seg[2]
    const resource = seg[3] as HmsResource | undefined
    const topic = hmsTopics.find((t) => t.id === topicId)
    return [
      { label: 'Dashboard', to: '/dashboard' },
      { label: 'Health & Movement Science', to: '/subjects/hms' },
      { label: topic?.short ?? topicId, to: `/subjects/hms/${topicId}` },
      { label: HMS_RESOURCE_LABELS[resource ?? 'summary'] },
    ]
  }

  if (seg[1] === 'business') {
    if (seg.length === 2) {
      return [{ label: 'Dashboard', to: '/dashboard' }, { label: 'Business Studies' }]
    }
    const topicId = seg[2]
    const resource = seg[3] as BusinessResource | undefined
    const topic = businessTopics.find((t) => t.id === topicId)
    return [
      { label: 'Dashboard', to: '/dashboard' },
      { label: 'Business Studies', to: '/subjects/business' },
      { label: topic?.short ?? topicId, to: `/subjects/business/${topicId}` },
      { label: BUSINESS_RESOURCE_LABELS[resource ?? 'summary'] },
    ]
  }

  if (seg[1] === 'legal') {
    if (seg.length === 2) {
      return [{ label: 'Dashboard', to: '/dashboard' }, { label: 'Legal Studies' }]
    }
    const topicId = seg[2]
    const resource = seg[3] as LegalResource | undefined
    const topic = legalTopics.find((t) => t.id === topicId)
    return [
      { label: 'Dashboard', to: '/dashboard' },
      { label: 'Legal Studies', to: '/subjects/legal' },
      { label: topic?.short ?? topicId, to: `/subjects/legal/${topicId}` },
      { label: LEGAL_RESOURCE_LABELS[resource ?? 'summary'] },
    ]
  }

  return [{ label: 'Dashboard', to: '/dashboard' }]
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
