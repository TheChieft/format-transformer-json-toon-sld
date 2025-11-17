import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/format-transformer-json-toon-sld/',
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
