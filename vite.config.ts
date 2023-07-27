import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': 'src',
    },
  },
  // 文档: https://cn.vitejs.dev/config/shared-options.html#css-preprocessoroptions
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import '@/styles/variable.scss';`,
      },
    },
  },
  plugins: [react()],
})
