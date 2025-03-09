import CopyWebpackPlugin from 'copy-webpack-plugin'
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin'
import type { Configuration } from 'webpack'
import { merge } from 'webpack-merge'
import { commonConfig } from './webpack.common.config'
import { plugins } from './webpack.plugins'
import { rules } from './webpack.rules'

export const rendererConfig: Configuration = merge(commonConfig, {
  target: 'web',
  entry: {
    app: './src/app/client/index.tsx',
  },
  module: {
    rules: [
      ...rules,
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
    ],
  },
  plugins: [...plugins, new NodePolyfillPlugin()],
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
    fallback: {
      fs: false,
      tls: false,
      net: false,
      path: false,
      zlib: false,
      http: false,
      https: false,
      stream: false,
      crypto: false,
      request: false,
      assert: false,
      child_process: false,
      util: false,
      url: false,
      os: false,
    },
  },
  optimization: {
    minimize: false,
  },
})
