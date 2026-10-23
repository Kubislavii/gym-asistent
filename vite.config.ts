import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// GitHub Pages serves the app from https://<user>.github.io/gym-asistent/
export default defineConfig({
  base: '/gym-asistent/',
  plugins: [react()],
})
