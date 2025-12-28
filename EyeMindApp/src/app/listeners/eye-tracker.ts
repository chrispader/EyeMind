import { BrowserWindow, ipcMain } from 'electron'
import { IpcListenerParameters } from '@/app/listeners/types'
import { IpcNamespace } from '@/app/listeners/types'
import {
  dataMapped,
  processGazeData,
  sendClickEvent,
  sendFullSnapshot,
  sendQuestionEvent,
  sendSnapshotID,
  setupTracking,
} from '@/app/server/node/connectors/eye-tracker'

type EyeTrackerListenerParameters<FunctionName extends keyof IpcNamespace<'eyeTracker'>> =
  IpcListenerParameters<'eyeTracker', FunctionName>

export function eyeTrackerListeners(mainWindow: BrowserWindow) {
  ipcMain.handle(
    'setupTracking',
    function (_e, args: EyeTrackerListenerParameters<'setupTracking'>) {
      return setupTracking(...args)
    },
  )

  ipcMain.handle(
    'sendSnapshotID',
    function (_e, args: EyeTrackerListenerParameters<'sendSnapshotID'>) {
      return sendSnapshotID(...args)
    },
  )

  ipcMain.handle(
    'sendFullSnapshot',
    function (_e, args: EyeTrackerListenerParameters<'sendFullSnapshot'>) {
      return sendFullSnapshot(...args)
    },
  )

  ipcMain.handle(
    'sendQuestionEvent',
    function (_e, args: EyeTrackerListenerParameters<'sendQuestionEvent'>) {
      return sendQuestionEvent(...args)
    },
  )

  ipcMain.handle(
    'processGazeData',
    function (_e, args: EyeTrackerListenerParameters<'processGazeData'>) {
      return processGazeData(...args, mainWindow)
    },
  )

  ipcMain.handle(
    'dataMapped',
    function (_e, args: EyeTrackerListenerParameters<'dataMapped'>) {
      return dataMapped(...args, mainWindow)
    },
  )

  ipcMain.handle(
    'sendClickEvent',
    function (_e, args: EyeTrackerListenerParameters<'sendClickEvent'>) {
      return sendClickEvent(...args)
    },
  )
}
