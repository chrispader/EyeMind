import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { bytecodePlugin, defineConfig, externalizeDepsPlugin } from 'electron-vite'
import tsconfigPaths from 'vite-tsconfig-paths'

const nodePlugins = [externalizeDepsPlugin(), bytecodePlugin(), tsconfigPaths()]

export default defineConfig({
  main: {
    plugins: nodePlugins,
  },
  preload: {
    plugins: nodePlugins,
  },
  renderer: {
    plugins: [
      tailwindcss(),
      tanstackRouter({
        target: 'react',
        autoCodeSplitting: true,
        routesDirectory: './src/routes',
        generatedRouteTree: './src/routeTree.gen.ts',
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
  },
})
