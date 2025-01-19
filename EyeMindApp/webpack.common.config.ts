import type { Configuration } from 'webpack'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const baseUrl = './src'
const alias = Object.fromEntries(
  Object.entries({
    '@src': `${baseUrl}`,
    '@listeners': `${baseUrl}/listeners`,
    '@client': `${baseUrl}/app/client/`,
    '@modules': `${baseUrl}/app/client/modules`,
    '@models': `${baseUrl}/app/client/modules/DataModels`,
    '@ui': `${baseUrl}/app/client/modules/ui`,
    '@utils': `${baseUrl}/app/client/modules/utils`,
    '@server': `${baseUrl}/app/server/`,
  }).map(([key, value]) => [key, path.resolve(__dirname, value)]),
)

export const commonConfig: Configuration = {
  resolve: {
    alias: alias,
  },
}
