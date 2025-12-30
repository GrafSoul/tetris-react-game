import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    include: ['three', '@react-three/fiber', '@react-three/drei'],
    entries: ['index.html', 'src/**/*.{ts,tsx}'],
    force: true,
  },
  server: {
    watch: {
      ignored: ['**/docs/**'],
    },
  },
})
