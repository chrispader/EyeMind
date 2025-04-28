import { BrowserWindow, ipcMain } from 'electron'
import { IpcListenerParameters } from '@/app/main/listeners/types'
import { IpcNamespace } from '@/app/main/listeners/types'
import { readState } from '@/app/server/node/utils/files-setup'

type FilesSetupListenerParameters<FunctionName extends keyof IpcNamespace<'utils'>> =
  IpcListenerParameters<'utils', FunctionName>

export function fileSetupListener(mainWindow: BrowserWindow) {
  ipcMain.handle(
    'readState',
    function (_e, args: FilesSetupListenerParameters<'readState'>) {
      return readState(...args, mainWindow)
    },
  )
}
