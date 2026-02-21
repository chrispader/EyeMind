import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './test/tests/playwright',
  timeout: 60000,
  retries: 0,
  workers: 1, // Run tests sequentially for Electron
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    trace: 'on-first-retry',
  },
})
