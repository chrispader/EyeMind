import { stateDownload } from '@renderer/server/node/utils/download'
import { ipcMain } from 'electron'

import { IpcListenerParameters } from '@/main/listeners/types'
import { IpcNamespace } from '@/main/listeners/types'

type DownloadListenerParameters<FunctionName extends keyof IpcNamespace<'utils'>> =
  IpcListenerParameters<'utils', FunctionName>

// check the return
export function downloadListener() {
  ipcMain.handle(
    'stateDownload',
    async function (_e, args: DownloadListenerParameters<'stateDownload'>) {
      return await stateDownload(...args)
    },
  )
}
