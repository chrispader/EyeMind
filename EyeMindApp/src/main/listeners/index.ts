/**
 * Consolidated IPC Listeners
 *
 * This file registers all IPC handlers for main process communication.
 * Organized by namespace/domain.
 */

import { FileImportConfig } from '@renderer/components/FileImport/types'
import {
  applyCorrectionOffset,
  gazeDataFragmentMapped,
  generateHeatMap,
  getRandomGazeSet,
  getStatesInfo,
  shouldEnableHeatmap,
  summerizedFixationLog,
} from '@renderer/server/node/analysis/analysis'
import { fixationFilter } from '@renderer/server/node/connectors/fixation-filter'
import {
  dataMapped,
  processGazeData,
  sendClickEvent,
  sendFullSnapshot,
  sendQuestionEvent,
  sendSnapshotID,
  setupTracking,
} from '@renderer/server/node/connectors/eye-tracker'
import { getLocalRpid, setLocalRpid } from '@renderer/server/node/dataModels/processes'
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
import { stateDownload } from '@renderer/server/node/utils/download'
import { readState } from '@renderer/server/node/utils/files-setup'
import { recoverSession, saveSession } from '@renderer/server/node/utils/session'
import { getServerState } from '@renderer/server/node/utils/test'
import child from 'child_process'
import detect from 'detect-port'
import { app, BrowserWindow, dialog, ipcMain } from 'electron'
import fs from 'fs'
import path from 'path'
import kill from 'tree-kill'

import { CONST } from '@/CONST'
import { GlobalState } from '@/types/GlobalState'
import { IpcListenerParameters } from '@/types/IpcApi'

import { createNamespaceRegistrar } from './ipc-helpers'

// ============================================================================
// Type Helpers
// ============================================================================

import type { Analysis, EyeTracker, Rserver, Utils } from '@/types/IpcApi'

type AnalysisParams<FN extends keyof Analysis> = IpcListenerParameters<'analysis', FN>
type EyeTrackerParams<FN extends keyof EyeTracker> = IpcListenerParameters<'eyeTracker', FN>
type RserverParams<FN extends keyof Rserver> = IpcListenerParameters<'Rserver', FN>
type UtilsParams<FN extends keyof Utils> = IpcListenerParameters<'utils', FN>

type PastConfig = {
  childRProcessID: number
}

// ============================================================================
// State Listeners (state namespace)
// ============================================================================

function registerStateListeners() {
  const register = createNamespaceRegistrar<'state'>()

  // No-arg handlers
  register.noArgs('getState', getState)
  register.noArgs('clearState', clearState)
  register.noArgs('getQuestions', getQuestions)
  register.noArgs('getStates', getStates)
  register.noArgs('clearStates', clearStates)

  // Single-arg handlers
  register.spread('getSnapshotsOfState', getSnapshotsOfState)
  register.spread('getStyleParametersOfState', getStyleParametersOfState)
  register.spread('removeState', removeState)
  register.spread('doesStateExist', doesStateExist)
  register.spread('areAreGazesCorrectedOfState', areAreGazesCorrectedOfState)

  // Multi-arg handlers
  register.spread('setAreGazesCorrectedOfState', setAreGazesCorrectedOfState)
}

// ============================================================================
// Analysis Listeners (analysis namespace)
// ============================================================================

function registerAnalysisListeners(mainWindow: BrowserWindow) {
  ipcMain.handle('summerizedFixationLog', (_e, args: AnalysisParams<'summerizedFixationLog'>) =>
    summerizedFixationLog(...args),
  )

  ipcMain.handle('generateHeatMap', (_e, args: AnalysisParams<'generateHeatMap'>) =>
    generateHeatMap(...args),
  )

  ipcMain.handle('shouldEnableHeatmap', (_e, args: AnalysisParams<'shouldEnableHeatmap'>) =>
    shouldEnableHeatmap(...args),
  )

  ipcMain.handle('getRandomGazeSet', (_e, args: AnalysisParams<'getRandomGazeSet'>) =>
    getRandomGazeSet(...args),
  )

  ipcMain.handle('applyCorrectionOffset', (_e, args: AnalysisParams<'applyCorrectionOffset'>) =>
    applyCorrectionOffset(...args, mainWindow),
  )

  ipcMain.handle('gazeDataFragmentMapped', (_e, args: AnalysisParams<'gazeDataFragmentMapped'>) =>
    gazeDataFragmentMapped(...args, mainWindow),
  )

  ipcMain.handle('getStatesInfo', (_e, args: AnalysisParams<'getStatesInfo'>) =>
    getStatesInfo(...args),
  )
}

// ============================================================================
// Eye Tracker Listeners (eyeTracker namespace)
// ============================================================================

function registerEyeTrackerListeners(mainWindow: BrowserWindow) {
  ipcMain.handle('setupTracking', (_e, args: EyeTrackerParams<'setupTracking'>) =>
    setupTracking(...args),
  )

  ipcMain.handle('sendSnapshotID', (_e, args: EyeTrackerParams<'sendSnapshotID'>) =>
    sendSnapshotID(...args),
  )

  ipcMain.handle('sendFullSnapshot', (_e, args: EyeTrackerParams<'sendFullSnapshot'>) =>
    sendFullSnapshot(...args),
  )

  ipcMain.handle('sendQuestionEvent', (_e, args: EyeTrackerParams<'sendQuestionEvent'>) =>
    sendQuestionEvent(...args),
  )

  ipcMain.handle('processGazeData', (_e, args: EyeTrackerParams<'processGazeData'>) =>
    processGazeData(...args, mainWindow),
  )

  ipcMain.handle('dataMapped', (_e, args: EyeTrackerParams<'dataMapped'>) =>
    dataMapped(...args, mainWindow),
  )

  ipcMain.handle('sendClickEvent', (_e, args: EyeTrackerParams<'sendClickEvent'>) =>
    sendClickEvent(...args),
  )
}

// ============================================================================
// Fixation Filter / R Server Listeners (Rserver namespace)
// ============================================================================

function registerFixationFilterListeners(mainWindow: BrowserWindow) {
  ipcMain.once('startRserver', async () => {
    console.log('start R server')

    const suggestedPort = await detect(CONST.R_PORT)

    if (suggestedPort != CONST.R_PORT) {
      console.log('killing old running R instance')
      const config = JSON.parse(
        fs.readFileSync(path.join(app.getAppPath(), CONST.LAST_CONFIG_FILE_PATH), {
          encoding: 'utf-8',
        }),
      ) as PastConfig
      const childRProcessID = config['childRProcessID']
      kill(childRProcessID)
    }

    const mainRPath = path
      .join(app.getAppPath(), 'app', 'server', 'R', 'fixationDetection', 'main.R')
      .replace(/\\/g, '\\\\')
    const execPath = path.join(app.getAppPath(), 'environments', 'R', 'bin', 'RScript.exe')

    const childRProcess = child.spawn(execPath, [
      '-e',
      "library(plumber); pr('" + mainRPath + "') %>% pr_run(port=" + CONST.R_PORT + ');',
    ])
    childRProcess.stdout.on('data', (data: string) => {
      console.log(`stdout -:${data}`)

      if (CONST.R_SERVER_PID_PRINT_PATTERN.test(data)) {
        logRserverPid(parseInt(CONST.R_SERVER_PID_PRINT_PATTERN.exec(data.toString())?.[1] ?? '-1'))
      }
    })
    childRProcess.stderr.on('data', (data) => {
      console.log(`stderr -:${data}`)
    })
  })

  ipcMain.handle('fixationFilter', (_e, args: RserverParams<'fixationFilter'>) =>
    fixationFilter(...args, mainWindow),
  )
}

function logRserverPid(childRProcessID: number | undefined) {
  console.log('logRserverPid', childRProcessID)
  setLocalRpid(childRProcessID)
  const objectToSave = { childRProcessID: childRProcessID }
  fs.writeFileSync(
    path.join(app.getAppPath(), CONST.LAST_CONFIG_FILE_PATH),
    JSON.stringify(objectToSave),
  )
}

export async function shutdownFixationFilterServer() {
  console.log('shutdownFixationFilterServer function')
  const childRProcessID = getLocalRpid()
  if (childRProcessID != -1) {
    kill(childRProcessID)
  }
}

// ============================================================================
// Utils Listeners (utils namespace) - Download & Session
// ============================================================================

function registerUtilsListeners() {
  // Download
  ipcMain.handle('stateDownload', async (_e, args: UtilsParams<'stateDownload'>) =>
    stateDownload(...args),
  )

  // Session
  ipcMain.handle('saveSession', (_e, args: UtilsParams<'saveSession'>) => saveSession(...args))

  ipcMain.handle('recoverSession', (_e, args: UtilsParams<'recoverSession'>) =>
    recoverSession(...args),
  )
}

// ============================================================================
// File Setup Listeners
// ============================================================================

function registerFileSetupListeners(mainWindow: BrowserWindow) {
  ipcMain.handle(
    'readState',
    (
      _e,
      args: [fileName: string, filePath: string, state: GlobalState, config: FileImportConfig],
    ) => readState(...args, mainWindow),
  )
}

// ============================================================================
// Window Listeners
// ============================================================================

function registerWindowListeners(mainWindow: BrowserWindow) {
  mainWindow.on('moved', () => {
    mainWindow.webContents.send('browserMovement')
  })

  mainWindow.on('resized', () => {
    mainWindow.webContents.send('browserResize')
  })

  ipcMain.on('putFullScreen', () => {
    mainWindow.setFullScreen(true)
  })

  ipcMain.on('removeFullScreen', () => {
    mainWindow.setFullScreen(false)
  })

  ipcMain.on('message', (_e, type: string, text: string) => {
    dialog.showMessageBox(mainWindow, {
      type: type as Electron.MessageBoxOptions['type'],
      message: text,
    })
  })
}

// ============================================================================
// Test Listeners
// ============================================================================

function registerTestListeners() {
  ipcMain.handle('getServerState', async () => getServerState())
}

// ============================================================================
// Main Registration Function
// ============================================================================

/**
 * Registers all IPC listeners for the main process.
 * Call this once after creating the main BrowserWindow.
 */
export function registerAllListeners(mainWindow: BrowserWindow) {
  registerStateListeners()
  registerWindowListeners(mainWindow)
  registerFixationFilterListeners(mainWindow)
  registerAnalysisListeners(mainWindow)
  registerUtilsListeners()
  registerFileSetupListeners(mainWindow)
  registerEyeTrackerListeners(mainWindow)
  registerTestListeners()
}
