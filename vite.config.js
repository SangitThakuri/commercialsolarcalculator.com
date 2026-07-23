import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Without this, Rollup groups shared code (e.g. the lucide-react icon runtime) into
        // whichever app module happened to pull it in first, producing misleading chunk names
        // like "usePageMeta-[hash].js" for what's actually vendor code. Splitting vendor deps
        // into their own named chunks also improves long-term browser caching, since they
        // change far less often than app code.
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined
          if (id.includes('react-router-dom')) return 'vendor-react-router'
          if (id.includes('lucide-react')) return 'vendor-lucide'
          if (id.includes('react-dom') || id.includes('/react/') || id.includes('scheduler')) {
            return 'vendor-react'
          }
          return 'vendor'
        },
      },
    },
  },
})
