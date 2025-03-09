import type { Configuration } from 'webpack'
import path from 'path'

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
