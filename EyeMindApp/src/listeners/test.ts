import { getServerState } from '@/app/server/node/utils/test'
import { ipcMain } from 'electron'

export function testListeners() {
  ipcMain.handle('getServerState', async function (e) {
    return getServerState()
  })
}
