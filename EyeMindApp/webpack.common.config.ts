import type { Configuration } from 'webpack'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const alias = Object.fromEntries(
  Object.entries({
    '@': `./src`,
    '@extra': `./extra`,
  }).map(([key, value]) => [key, path.resolve(__dirname, value)]),
)

export const commonConfig: Configuration = {
  resolve: {
    alias: alias,
  },
}
