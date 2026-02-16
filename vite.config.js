import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// تم إزالة tailwindcss من هنا لأن v3 يعمل عبر PostCSS تلقائياً
export default defineConfig({
  plugins: [
    react(), // رجعنا للوضع البسيط والمستقر
  ],
})