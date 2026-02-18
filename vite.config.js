import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // استيراد التوليد الجديد

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // إضافة التوليد هنا
  ],
})