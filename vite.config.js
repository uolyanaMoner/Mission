import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: './',       // مهم جدًا لكل المسارات النسبية
  build: {
    outDir: 'dist', // مجلد Build النهائي
  },
})
