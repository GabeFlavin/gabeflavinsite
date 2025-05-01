import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        //spline: resolve(__dirname, 'scene.splinecode'),
        //thorn: resolve(__dirname, 'thornfallsociety.html'),
        //fc3: resolve(__dirname, 'facecrusher3.html')
        // Add more pages as needed
      }
    }
  }
})