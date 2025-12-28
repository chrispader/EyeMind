// import svgr from '@svgr/vite-plugin'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

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
    tailwindcss(),
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler', {}]],
      },
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
