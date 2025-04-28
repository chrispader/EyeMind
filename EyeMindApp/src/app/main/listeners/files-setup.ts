import { BrowserWindow, ipcMain } from 'electron'
import { LoadFileConfig } from '@/app/client/components/FileImport/types'
import { ClientState } from '@/app/client/state/state'
import { readState } from '@/app/server/node/utils/files-setup'

export function fileSetupListener(mainWindow: BrowserWindow) {
  ipcMain.handle(
    'readState',
    function (
      _e,
      args: [
        fileName: string,
        filePath: string,
        state: ClientState,
        config: LoadFileConfig,
      ],
    ) {
      return readState(...args, mainWindow)
    },
  )
}
