/** The <use href="#sq-mark"> references in SqLogo resolve against this sprite,
 * rendered once at the app root — matching the original's single inline <svg>
 * placed right after <body>. */
export function SqSprite() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="sqGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="55%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
      </defs>
      <symbol id="sq-mark" viewBox="0 0 32 32">
        <rect width="32" height="32" rx="9.5" fill="url(#sqGrad)" />
        <path d="M18.9 4.2 8.2 18.9h5.6l-1.5 9.1L23.8 13H17.6z" fill="#fff" opacity="0.97" />
        <path
          d="M6.6 24.6c3.6 2.4 8 2.8 12 1.2"
          stroke="#fff"
          strokeOpacity="0.38"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
        />
      </symbol>
    </svg>
  )
}
