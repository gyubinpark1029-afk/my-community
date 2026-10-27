import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// GitHub Pages는 저장소 이름 경로(/my-community/) 아래에서 서비스되므로 base를 맞춘다.
export default defineConfig({
  base: '/my-community/',
  plugins: [react()],
})
