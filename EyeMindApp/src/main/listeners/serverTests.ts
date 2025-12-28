import { ipcMain } from 'electron'
import { getServerState } from '@/renderer/server/node/utils/test'

export function testListeners() {
  ipcMain.handle('getServerState', async function () {
    return getServerState()
  })
}
