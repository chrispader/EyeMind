import react from '@vitejs/plugin-react'
import svgr from '@svgr/vite-plugin'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import { defineConfig } from 'vite'
import path from 'path'

// Path aliases matching webpack.common.config.ts
// Resolve from project root to maintain compatibility
const projectRoot = path.resolve(__dirname)
const alias = Object.fromEntries(
  Object.entries({
    '@': path.resolve(projectRoot, 'src'),
    '@extra': path.resolve(projectRoot, 'extra'),
  }),
)

export default defineConfig({
  root: path.resolve(__dirname, 'src/app/client'),
  resolve: {
    alias,
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
  },
  plugins: [
    react({
      babel: {
        plugins: [
          // React Compiler support
          ['babel-plugin-react-compiler', {}],
        ],
      },
    }),
    svgr({
      // SVG as React components by default
      svgrOptions: {
        exportType: 'default',
      },
    }),
    nodePolyfills({
      // Polyfills for Node.js modules used in renderer
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
      // Exclude Node.js built-ins that shouldn't be polyfilled
      exclude: ['fs', 'tls', 'net', 'path', 'zlib', 'http', 'https', 'stream', 'crypto', 'request', 'assert', 'child_process', 'util', 'url', 'os'],
    }),
  ],
  build: {
    // Disable minification to match webpack config
    minify: false,
  },
  // Handle .bpmn files as raw text (use ?raw suffix in imports, e.g., import xml from './file.bpmn?raw')
  assetsInclude: ['**/*.bpmn'],
  // CSS is handled automatically by Vite with PostCSS
  // PostCSS config is read from postcss.config.mjs
})

