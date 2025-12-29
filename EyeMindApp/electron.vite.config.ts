import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import {
  type ElectronViteConfig,
  bytecodePlugin,
  defineConfig,
  externalizeDepsPlugin,
} from 'electron-vite'
import tsconfigPaths from 'vite-tsconfig-paths'

const nodePlugins = [externalizeDepsPlugin(), bytecodePlugin(), tsconfigPaths()]

export const rendererConfig: NonNullable<ElectronViteConfig['renderer']> = {
  plugins: [
    tailwindcss(),
    tanstackRouter({
      routesDirectory: './src/renderer/routes',
      generatedRouteTree: './src/renderer/routeTree.gen.ts',
    }),
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler', {}]],
      },
    }),
    tsconfigPaths(),
  ],
  build: {
    minify: true,
  },
  assetsInclude: ['**/*.bpmn'],
}

export default defineConfig({
  main: {
    plugins: nodePlugins,
  },
  preload: {
    plugins: nodePlugins,
  },
  renderer: rendererConfig,
})
