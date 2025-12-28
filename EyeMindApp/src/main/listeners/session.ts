import { ipcMain } from 'electron'
import { IpcListenerParameters } from '@/main/listeners/types'
import { IpcNamespace } from '@/main/listeners/types'
import { recoverSession, saveSession } from '@/renderer/server/node/utils/session'

type SessionListenerParameters<FunctionName extends keyof IpcNamespace<'utils'>> =
  IpcListenerParameters<'utils', FunctionName>

// check the return
export function sessionListeners() {
  ipcMain.handle(
    'saveSession',
    function (_e, args: SessionListenerParameters<'saveSession'>) {
      return saveSession(...args)
    },
  )

  ipcMain.handle(
    'recoverSession',
    function (_e, args: SessionListenerParameters<'recoverSession'>) {
      return recoverSession(...args)
    },
  )
}
