import { dialog, ipcMain } from 'electron'
import { BrowserWindow } from 'electron'
import { IpcListenerParameters, IpcNamespace } from '@/main/listeners/types'

type ElectronListenerParameters<FunctionName extends keyof IpcNamespace<'electron'>> =
  IpcListenerParameters<'electron', FunctionName>

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

  ipcMain.on(
    'message',
    function (_e, [type, text]: ElectronListenerParameters<'message'>) {
      dialog.showMessageBox(mainWindow, {
        type: type as Electron.MessageBoxOptions['type'],
        message: text,
      })
    },
  )
}
