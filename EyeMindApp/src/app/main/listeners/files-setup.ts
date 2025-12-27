import { BrowserWindow, ipcMain } from 'electron'
import { FileImportConfig } from '@/app/client/components/FileImport/types'
import { GlobalState } from '@/app/client/state/state'
import { readState } from '@/app/server/node/utils/files-setup'

export function fileSetupListener(mainWindow: BrowserWindow) {
  ipcMain.handle(
    'readState',
    function (
      _e,
      args: [
        fileName: string,
        filePath: string,
        state: GlobalState,
        config: FileImportConfig,
      ],
    ) {
      return readState(...args, mainWindow)
    },
  )
}
