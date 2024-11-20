import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Whenever you visit /api, Vite will proxy the request to http://localhost:9000
      '/api': {
        target: 'http://localhost:9000'
      }
    }
  }
})
