import { ipcMain } from 'electron'
import { stateDownload } from '@/app/server/node/utils/download'
import { IpcListenerParameters } from '@/listeners/types'
import { IpcNamespace } from '@/listeners/types'

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
