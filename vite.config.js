import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'https://twilight-armstrong.onrender.com',
      '/uploads': 'https://twilight-armstrong.onrender.com'
    }
  }
})