import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(depPath: string) {
          const depId = depPath.match(/node_modules\/([^/]+)/)?.[1];

          if (depPath.match(/[\\/]node_modules[\\/]@harpreet547[\\/]cdh/)) return `npm.${depId?.replace('@', '')}-cdh`;
          else if (depPath.match(/[\\/]node_modules[\\/]@harpreet547[\\/]cwc/)) return `npm.${depId?.replace('@', '')}-cwc`;

        },
      },
    },
  }
})
