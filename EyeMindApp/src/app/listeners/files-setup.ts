import { BrowserWindow, ipcMain } from 'electron'
import { FileImportConfig } from '@/app/components/FileImport/types'
import { readState } from '@/app/server/node/utils/files-setup'
import { GlobalState } from '@/app/state/state'

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
