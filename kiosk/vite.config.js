import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  base: '/goorm_study/kiosk/', // GitHub Pages에서 이 프로젝트의 경로와 일치
  build: {
    outDir: '../dist/kiosk', // 빌드 결과물을 저장할 경로
    emptyOutDir: false, // 기존 내용 삭제하지 않음
  },
});