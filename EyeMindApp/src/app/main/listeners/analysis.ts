import { BrowserWindow, ipcMain } from 'electron'
import { IpcNamespace } from '@/app/main/listeners/types'
import { IpcListenerParameters } from '@/app/main/listeners/types'
import {
  applyCorrectionOffset,
  gazeDataFragmentMapped,
  generateHeatMap,
  getRandomGazeSet,
  getStatesInfo,
  shouldEnableHeatmap,
  summerizedFixationLog,
} from '@/app/server/node/analysis/analysis'

type AnalysisListenerParameters<FunctionName extends keyof IpcNamespace<'analysis'>> =
  IpcListenerParameters<'analysis', FunctionName>

// check the return
export function analysisListeners(mainWindow: BrowserWindow) {
  ipcMain.handle(
    'summerizedFixationLog',
    function (_e, args: AnalysisListenerParameters<'summerizedFixationLog'>) {
      return summerizedFixationLog(...args)
    },
  )

  ipcMain.handle(
    'generateHeatMap',
    function (_e, args: AnalysisListenerParameters<'generateHeatMap'>) {
      return generateHeatMap(...args)
    },
  )

  ipcMain.handle(
    'shouldEnableHeatmap',
    function (_e, args: AnalysisListenerParameters<'shouldEnableHeatmap'>) {
      return shouldEnableHeatmap(...args)
    },
  )

  ipcMain.handle(
    'getRandomGazeSet',
    function (_e, args: AnalysisListenerParameters<'getRandomGazeSet'>) {
      return getRandomGazeSet(...args)
    },
  )

  ipcMain.handle(
    'applyCorrectionOffset',
    function (_e, args: AnalysisListenerParameters<'applyCorrectionOffset'>) {
      return applyCorrectionOffset(...args, mainWindow)
    },
  )

  ipcMain.handle(
    'gazeDataFragmentMapped',
    function (_e, args: AnalysisListenerParameters<'gazeDataFragmentMapped'>) {
      return gazeDataFragmentMapped(...args, mainWindow)
    },
  )

  ipcMain.handle(
    'getStatesInfo',
    function (_e, args: AnalysisListenerParameters<'getStatesInfo'>) {
      return getStatesInfo(...args)
    },
  )
}
