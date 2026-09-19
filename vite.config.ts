import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // GitHub Pages serves project sites from a /<repo-name>/ subpath, not
  // the domain root. Only applied for the production build (the local
  // dev server still runs at /) so `npm run dev` is unaffected.
  base: process.env.GITHUB_PAGES ? '/SAP-Secure-Access-Platform/' : '/',
  plugins: [react()],
  // react-pdf is only reached through a lazy import, so without this Vite
  // discovers it mid-session, re-optimizes, and force-reloads the page the
  // first time someone opens the PDF viewer (wiping unsaved state).
  optimizeDeps: {
    include: ['react-pdf'],
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
})
