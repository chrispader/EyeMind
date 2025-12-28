import { defineConfig } from 'vite'
import path from 'path'

// Path aliases matching webpack.common.config.ts
const alias = Object.fromEntries(
  Object.entries({
    '@': `./src`,
    '@extra': `./extra`,
  }).map(([key, value]) => [key, path.resolve(__dirname, value)]),
)

export default defineConfig({
  resolve: {
    alias,
  },
  build: {
    rollupOptions: {
      external: (id) => {
        // Externalize Electron and Node.js built-ins
        return (
          id === 'electron' ||
          id.startsWith('electron/') ||
          (id.startsWith('node:') && !id.includes('/')) ||
          // Common Node.js built-ins
          [
            'fs',
            'path',
            'os',
            'crypto',
            'stream',
            'util',
            'events',
            'buffer',
            'process',
            'assert',
            'http',
            'https',
            'net',
            'tls',
            'url',
            'zlib',
            'child_process',
          ].includes(id)
        )
      },
    },
  },
})

