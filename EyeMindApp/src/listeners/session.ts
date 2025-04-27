import { ipcMain } from 'electron'
import { recoverSession, saveSession } from '@/app/server/node/utils/session'
import { IpcListenerParameters } from '@/listeners/types'
import { IpcNamespace } from '@/listeners/types'

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
