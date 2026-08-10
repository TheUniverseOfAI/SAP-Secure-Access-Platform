import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // GitHub Pages serves project sites from a /<repo-name>/ subpath, not
  // the domain root. Only applied for the production build (the local
  // dev server still runs at /) so `npm run dev` is unaffected.
  base: process.env.GITHUB_PAGES ? '/SAP-Secure-Access-Platform/' : '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
