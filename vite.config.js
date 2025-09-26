import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        dev: resolve(__dirname, 'index-dev.html'),
        about: resolve(__dirname, 'about.html'),
        services: resolve(__dirname, 'services.html'),
        contact: resolve(__dirname, 'contact.html'),
        partials: resolve(__dirname, 'partials/nav.html'),
        scan: resolve(__dirname, 'scan.html')
        //spline: resolve(__dirname, 'scene.splinecode'),
        //thorn: resolve(__dirname, 'thornfallsociety.html'),
        //fc3: resolve(__dirname, 'facecrusher3.html')
        // Add more pages as needed
      }
    }
  }
})