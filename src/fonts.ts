/**
 * Self-hosted replacement for the Google Fonts CDN <link> in index.html —
 * same four families and the same weight/style subset that URL requested
 * (checked against every font-family/font-weight declaration in
 * styles/global.css), just served from this origin instead of a third
 * party. Saves the extra DNS/TLS/request round trip to fonts.googleapis.com
 * and fonts.gstatic.com, and lets Vite fingerprint the font files alongside
 * the rest of the build for long-term caching.
 */
import '@fontsource/special-elite/400.css'

import '@fontsource/source-serif-4/400.css'
import '@fontsource/source-serif-4/500.css'
import '@fontsource/source-serif-4/600.css'
import '@fontsource/source-serif-4/700.css'
import '@fontsource/source-serif-4/400-italic.css'

import '@fontsource/ibm-plex-mono/400.css'
import '@fontsource/ibm-plex-mono/500.css'
import '@fontsource/ibm-plex-mono/600.css'

import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/inter/800.css'
import '@fontsource/inter/600-italic.css'
import '@fontsource/inter/700-italic.css'
import '@fontsource/inter/800-italic.css'
