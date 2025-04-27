import { BrowserWindow, ipcMain } from 'electron'
import { readState } from '@/app/server/node/utils/files-setup'
import { IpcListenerParameters } from '@/listeners/types'
import { IpcNamespace } from '@/listeners/types'

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
