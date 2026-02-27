import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 5174
  },
  build: {
    lib: {
      entry: 'src/index.js',
      name: 'AdminAIWidget',
      fileName: (format) => `admin-ai-widget.${format}.js`,
      formats: ['es', 'umd']
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {}
      }
    }
  }
})
