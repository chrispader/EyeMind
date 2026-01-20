import {
  areAreGazesCorrectedOfState,
  clearState,
  clearStates,
  doesStateExist,
  getQuestions,
  getSnapshotsOfState,
  getState,
  getStates,
  getStyleParametersOfState,
  removeState,
  setAreGazesCorrectedOfState,
} from '@renderer/server/node/dataModels/state'
import { ipcMain } from 'electron'

import { IpcListenerParameters, IpcNamespace } from './types'

type StateListenerParameters<FunctionName extends keyof IpcNamespace<'state'>> =
  IpcListenerParameters<'state', FunctionName>

// check the return
export function stateListeners() {
  ipcMain.handle('getState', async function () {
    return await getState()
  })

  ipcMain.handle('clearState', async function () {
    return await clearState()
  })

  ipcMain.handle(
    'getSnapshotsOfState',
    async function (_e, args: StateListenerParameters<'getSnapshotsOfState'>) {
      return await getSnapshotsOfState(...args)
    },
  )

  ipcMain.handle(
    'getStyleParametersOfState',
    async function (_e, args: StateListenerParameters<'getStyleParametersOfState'>) {
      return await getStyleParametersOfState(...args)
    },
  )

  ipcMain.handle(
    'setAreGazesCorrectedOfState',
    async function (_e, args: StateListenerParameters<'setAreGazesCorrectedOfState'>) {
      return await setAreGazesCorrectedOfState(...args)
    },
  )

  ipcMain.handle('getQuestions', async function () {
    return await getQuestions()
  })

  ipcMain.handle('getStates', async function () {
    return await getStates()
  })

  ipcMain.handle('clearStates', async function () {
    return await clearStates()
  })

  ipcMain.handle(
    'removeState',
    async function (_e, args: StateListenerParameters<'removeState'>) {
      return await removeState(...args)
    },
  )

  ipcMain.handle(
    'doesStateExist',
    async function (_e, args: StateListenerParameters<'doesStateExist'>) {
      return await doesStateExist(...args)
    },
  )

  ipcMain.handle(
    'areAreGazesCorrectedOfState',
    async function (_e, args: StateListenerParameters<'areAreGazesCorrectedOfState'>) {
      return await areAreGazesCorrectedOfState(...args)
    },
  )
}
