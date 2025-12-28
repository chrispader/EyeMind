import { BrowserWindow, ipcMain } from 'electron'
import { FileImportConfig } from '@/renderer/components/FileImport/types'
import { readState } from '@/renderer/server/node/utils/files-setup'
import { GlobalState } from '@/types/GlobalState'

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
