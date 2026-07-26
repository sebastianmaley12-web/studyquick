type SqLogoProps = {
  size?: 'xs' | 'sm' | 'md' | 'lg'
  tagline?: boolean
}

export function SqLogo({ size = 'sm', tagline = false }: SqLogoProps) {
  return (
    <span className={`sq-lockup sq-${size}`} aria-label="StudyQuick">
      <svg className="sq-mark" viewBox="0 0 32 32" aria-hidden="true">
        <use href="#sq-mark" />
      </svg>
      <span className="sq-text">
        <span className="sq-word">
          <span className="sq-study">Study</span>
          <span className="sq-quick">Quick</span>
        </span>
        {tagline && <span className="sq-tagline">Study smarter. Revise quicker.</span>}
      </span>
    </span>
  )
}
