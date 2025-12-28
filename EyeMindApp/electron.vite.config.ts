import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { bytecodePlugin, defineConfig, externalizeDepsPlugin } from 'electron-vite'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const nodePlugins = [externalizeDepsPlugin(), bytecodePlugin()]
const alias = {
  '@': path.resolve(__dirname, 'src'),
}

export default defineConfig({
  main: {
    plugins: nodePlugins,
    resolve: {
      alias,
    },
  },
  preload: {
    plugins: nodePlugins,
    resolve: {
      alias,
    },
  },
  renderer: {
    root: path.resolve(__dirname, 'src/app'),
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
      minify: false,
    },
    assetsInclude: ['**/*.bpmn'],
  },
})
