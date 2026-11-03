import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  assetsInclude: ['**/*.JPG'],
  base: '/vik-pickle-tattoo/',
  plugins: [react()],
})
