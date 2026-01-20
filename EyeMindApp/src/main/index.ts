/*MIT License

Copyright (c) 2022 Eye-Mind Tool (Author: Amine Abbad-Andaloussi)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.*/
import { BrowserWindow, app, session } from 'electron'
import { REACT_DEVELOPER_TOOLS, installExtension } from 'electron-devtools-installer'
import started from 'electron-squirrel-startup'
import path from 'path'

import { analysisListeners } from '@/main/listeners/analysis'
import { downloadListener } from '@/main/listeners/download'
import { eyeTrackerListeners } from '@/main/listeners/eye-tracker'
import { fileSetupListener } from '@/main/listeners/files-setup'
import {
  fixationFilterListeners,
  shutdownFixationFilterServer,
} from '@/main/listeners/fixation-filter'
import { testListeners } from '@/main/listeners/serverTests'
import { sessionListeners } from '@/main/listeners/session'
import { stateListeners } from '@/main/listeners/state'
import { windowListeners } from '@/main/listeners/window'

app.whenReady().then(() => {
  installExtension(REACT_DEVELOPER_TOOLS)
    .then((ext) => console.log(`Added Extension:  ${ext.name}`))
    .catch((err) => console.log('An error occurred: ', err))
})

// electron-vite provides environment variables for renderer URL and preload path

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (Boolean(started)) app.quit()

const createMainWindow = (): BrowserWindow => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    // fullscreen: true,
    // resizable: false,
    autoHideMenuBar: true,
    title: 'EyeMind',
    show: false,
    /// frame: false,
    height: 800,
    width: 1400,
    minWidth: 800,
    minHeight: 500,
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      // Allow loading files from local file system like images
      webSecurity: false,
      nodeIntegration: true,
    },
  })

  mainWindow.maximize()
  mainWindow.show()

  // used for the pop up windows
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url === 'about:blank') {
      return {
        action: 'allow',
        overrideBrowserWindowOptions: {
          frame: false,
          fullscreen: false,
          backgroundColor: '#E7EAED',
        },
      }
    }
    return { action: 'deny' }
  })

  // and load the index.html of the app.
  // electron-vite sets ELECTRON_RENDERER_URL in development
  if (process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))
  }

  // initiate set listeners
  stateListeners()

  // initiate window listeners
  windowListeners(mainWindow)

  // initiate fixation filter (R) listeners
  fixationFilterListeners(mainWindow)

  // initiate analysis listener
  analysisListeners(mainWindow)

  // initiate download listener
  downloadListener()

  // initiate file-setup listener
  fileSetupListener(mainWindow)

  // initiate eye-tracker listeners
  eyeTrackerListeners(mainWindow)

  // initiate session listeners
  sessionListeners()

  // initiate initiate test listeners
  testListeners()

  return mainWindow
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  session.defaultSession.allowNTLMCredentialsForDomains('*')

  let mainWindow = createMainWindow()

  const gotTheLock = app.requestSingleInstanceLock()

  if (!gotTheLock) {
    app.quit()
  } else {
    app.on('second-instance', () => {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    })

    app.on('ready', () => {
      mainWindow = createMainWindow()
    })
  }
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', async () => {
  await shutdownFixationFilterServer()

  // quit electron app
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createMainWindow()
})
