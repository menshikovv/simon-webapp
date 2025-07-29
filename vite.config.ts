import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'cagily-stable-sheepdog.cloudpub.ru',
      'localhost'
    ]
  }
})
