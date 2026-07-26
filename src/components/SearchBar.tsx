import type { KeyboardEvent, RefObject } from 'react'

type SearchBarProps = {
  value: string
  onChange: (value: string) => void
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void
  meta: string
  onPrev: () => void
  onNext: () => void
  disabled: boolean
  inputRef: RefObject<HTMLInputElement | null>
}

export function SearchBar({
  value,
  onChange,
  onKeyDown,
  meta,
  onPrev,
  onNext,
  disabled,
  inputRef,
}: SearchBarProps) {
  return (
    <div className="searchbar">
      <span className="icon">&#9906;</span>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search every topic — dates, names, terms…"
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <span className="search-meta">{meta}</span>
      <div className="search-nav">
        <button type="button" title="Previous match" onClick={onPrev} disabled={disabled}>
          &uarr;
        </button>
        <button type="button" title="Next match" onClick={onNext} disabled={disabled}>
          &darr;
        </button>
      </div>
    </div>
  )
}
