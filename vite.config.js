import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        scan: resolve(__dirname, 'scan.html'),
        '1': resolve(__dirname, '1.html'),
        '2': resolve(__dirname, '2.html'),
        '3': resolve(__dirname, '3.html'),
        '4': resolve(__dirname, '4.html'),
        '5': resolve(__dirname, '5.html'),
        '6': resolve(__dirname, '6.html')
        //spline: resolve(__dirname, 'scene.splinecode'),
        //thorn: resolve(__dirname, 'thornfallsociety.html'),
        //fc3: resolve(__dirname, 'facecrusher3.html')
        // Add more pages as needed
      }
    }
  }
})