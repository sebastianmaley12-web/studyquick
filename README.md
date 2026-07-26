# StudyQuick

An HSC study app for Modern History and Mathematics Standard 2 — syllabus summaries, practice
questions with answer plans, quick-fire trivia, and self-marking quizzes. No accounts, no
backend today: progress is stored in the browser's `localStorage` only.

Originally a single-file HTML prototype (kept at `legacy/index.html` for reference), migrated to
React + Vite + TypeScript for maintainability, mobile-first layout, and room to grow.

## Stack

- React 19 + React Router 7, Vite + TypeScript
- Vitest + Testing Library for component tests, Playwright for browser verification
- ESLint (flat config) + Prettier

## Development

```
npm install
npm run dev        # dev server
npm run build      # type-check + production build
npm run lint
npm test           # vitest
npm run test:e2e   # playwright
```

## Project layout

- `src/content/` — Modern History and Maths question/summary data, extracted from the legacy
  file as structured JSON (never hand-retyped)
- `src/lib/content/` — typed accessors over that content, split by subject so each route only
  bundles the data it needs
- `src/lib/progressStore.ts` — the localStorage-backed progress store (byte-compatible with the
  original app's `studyquick.progress.v1` schema)
- `src/lib/supabase/` — scaffolding for a future accounts/sync backend (schema sketch + an inert
  client stub); nothing here is live yet
- `src/components/`, `src/pages/`, `src/hooks/` — the app itself

## Status

All original functionality has been migrated and verified against the legacy file. Accounts,
cloud sync, and monetisation are scaffolded (see `src/lib/supabase/schema.sql`) but not built.
