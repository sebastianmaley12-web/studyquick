/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    // Tests assert the app's "no backend configured" behaviour deliberately
    // (see AuthProvider's isConfigured) — force that regardless of a local
    // .env.local pointing at a real Supabase project for manual dev/preview
    // testing, so the suite never makes real network calls or depends on
    // whatever a developer happens to have configured locally.
    env: { VITE_SUPABASE_URL: '', VITE_SUPABASE_ANON_KEY: '' },
  },
})
