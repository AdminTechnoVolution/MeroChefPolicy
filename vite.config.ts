import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Set to '/your-repo-name/' for GitHub Pages project sites
  base: '/',
  plugins: [react()],
})
