import { ipcMain } from 'electron'
import { stateDownload } from '@server/utils/download'

// check the return
export function downloadListener() {
  ipcMain.handle('stateDownload', async function (e, args) {
    return await stateDownload(...args)
  })
}
