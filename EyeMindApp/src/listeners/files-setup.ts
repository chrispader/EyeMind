import { ipcMain } from 'electron'
import { readState } from '@server/utils/files-setup'

// check the return
export function fileSetupListener(mainWindow) {
  ipcMain.handle('readState', function (e, args) {
    args.push(mainWindow)
    return readState(...args)
  })
}
