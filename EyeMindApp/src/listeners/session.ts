import { ipcMain } from 'electron'
import { saveSession, recoverSession } from '@server/utils/session'

// check the return
export function sessionListeners() {
  ipcMain.handle('saveSession', function (e, args) {
    return saveSession(...args)
  })

  ipcMain.handle('recoverSession', function (e, args) {
    return recoverSession(...args)
  })
}
