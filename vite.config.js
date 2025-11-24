import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './',       // مهم جدًا → يجعل كل ملفات JS وCSS relative
  build: {
    outDir: 'dist', // المجلد النهائي بعد build
  },
})
