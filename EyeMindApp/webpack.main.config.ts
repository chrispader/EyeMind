import type { Configuration } from 'webpack'
import { merge } from 'webpack-merge'
import { rules } from './webpack.rules.ts'
import { commonConfig } from './webpack.common.config.ts'

export const mainConfig: Configuration = merge(commonConfig, {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './src/main.ts',
  // Put your normal webpack config below here
  target: "node",
  module: {
    rules: rules,
  },
  resolve: {
    extensions: ['.js', '.ts', '.css', '.json'],
  },
})
