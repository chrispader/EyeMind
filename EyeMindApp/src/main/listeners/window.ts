import { dialog, ipcMain, BrowserWindow } from 'electron'

export function windowListeners(mainWindow: BrowserWindow) {
  mainWindow.on('moved', function () {
    mainWindow.webContents.send('browserMovement')
  })

  mainWindow.on('resized', function () {
    mainWindow.webContents.send('browserResize')
  })

  ipcMain.on('putFullScreen', function () {
    mainWindow.setFullScreen(true)
  })

  ipcMain.on('removeFullScreen', function () {
    mainWindow.setFullScreen(false)
  })

  ipcMain.on('message', function (_e, type: string, text: string) {
    dialog.showMessageBox(mainWindow, {
      type: type as Electron.MessageBoxOptions['type'],
      message: text,
    })
  })
}
