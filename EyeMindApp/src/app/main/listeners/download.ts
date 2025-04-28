import { ipcMain } from 'electron'
import { IpcListenerParameters } from '@/app/main/listeners/types'
import { IpcNamespace } from '@/app/main/listeners/types'
import { stateDownload } from '@/app/server/node/utils/download'

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
