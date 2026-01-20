import { getServerState } from '@renderer/server/node/utils/test'
import { ipcMain } from 'electron'

export function testListeners() {
  ipcMain.handle('getServerState', async function () {
    return getServerState()
  })
}
