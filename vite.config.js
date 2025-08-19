import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'https://localhost:7119',
        changeOrigin: true,
        secure: false  // importante para certificado autofirmado
      }
    }
  }
})

