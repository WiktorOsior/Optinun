import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    host: true,    // Required to work in Docker
    port: 5173,
    watch: {
      usePolling: true, // Necessary for some macOS/Docker setups
    },
    proxy: {
      '/api': {
        // "spring-boot-app" is the Docker service name from docker-compose.yml
        target: 'http://spring-boot-app:8080',
        changeOrigin: true,
        secure: false,
      },
      // If you also talk to the scraper/fastapi service:
      '/fastapi': {
        target: 'http://fastapi-service:8000',
        changeOrigin: true,
      }
    }},

})
