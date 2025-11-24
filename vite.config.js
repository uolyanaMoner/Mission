import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: './',       // مهم جداً عشان Deployment على Vercel
  build: {
    outDir: 'dist', // المجلد النهائي بعد build
  },
})
