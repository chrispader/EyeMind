import type { Configuration } from 'webpack'
import { merge } from 'webpack-merge'
import { commonConfig } from './webpack.common.config'
import { commonRules } from './webpack.rules'

export const mainConfig: Configuration = merge(commonConfig, {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './src/main.ts',
  // Put your normal webpack config below here
  module: {
    rules: commonRules,
  },
  resolve: {
    extensions: ['.js', '.ts', '.css', '.json'],
  },
})
