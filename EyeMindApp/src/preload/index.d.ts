import { ElectronAPI } from '@electron-toolkit/preload'
import { GlobalState } from '@/types/GlobalState'

type CustomElectronAPI = ElectronAPI & {
  putFullScreen: () => void
  message: (type: string, text: string) => void
  removeFullScreen: () => void
  onBrowserMovement: (func: (args: unknown[]) => void) => void
  onBrowserResize: (func: (args: unknown[]) => void) => void
}

type Analysis = {
  summerizedFixationLog: (
    data: unknown,
    mode: unknown,
    areGazesCorrected: unknown,
  ) => Promise<unknown>
  generateHeatMap: (
    filePaths: unknown,
    elementRegistryTypes: unknown,
    measure: unknown,
    measureType: unknown,
    aggregation: unknown,
    additionalElementsToIclude: unknown,
    questionID: unknown,
  ) => Promise<unknown>
  shouldEnableHeatmap: () => Promise<unknown>
  getRandomGazeSet: (samplingRatio: unknown, stateFile: unknown) => Promise<unknown>
  applyCorrectionOffset: (
    externalMappingWindow: unknown,
    stateFile: unknown,
    snapshotId: unknown,
    xOffset: unknown,
    yOffset: unknown,
  ) => Promise<unknown>
  onApplyCorrectionOnGazeFragment: (func: (args: unknown[]) => void) => void
  gazeDataFragmentMapped: (
    stateFile: unknown,
    gazeDataFragment: unknown,
    start: unknown,
    gazeDataSize: unknown,
    externalMappingWindow: unknown,
    snapshotId: unknown,
    xOffset: unknown,
    yOffset: unknown,
  ) => Promise<unknown>
  onCompleteCorrectionListener: (func: (args: unknown[]) => void) => void
  getStatesInfo: () => Promise<unknown>
}

type ServerTests = {
  getServerState: () => Promise<unknown>
}

type EyeTracker = {
  setupTracking: (xScreenDim: number, yScreenDim: number) => Promise<unknown>
  sendSnapshotID: (snapshot: unknown) => Promise<unknown>
  sendFullSnapshot: (snapshot: unknown) => Promise<unknown>
  sendQuestionEvent: (
    questionTimestamp: number,
    questionEventType: string,
    questionPosition: string,
    questionText: string,
    questionAnswer: string,
    questionID: string,
  ) => Promise<unknown>
  processGazeData: (state: unknown, externalProgressWindow: unknown) => Promise<unknown>
  onMapGazestoElementsFromPageSnapshot: (callback: (args: unknown[]) => void) => void
  dataMapped: (
    dataMapped: unknown,
    start: number,
    gazeDataSize: number,
    externalProgressWindow: unknown,
  ) => Promise<unknown>
  onCompleteProcessingListener: (callback: (args: unknown[]) => void) => void
  sendClickEvent: (clickTimestamp: number, clickedElement: string) => Promise<unknown>
}

type Rserver = {
  startRserver: () => void
  fixationFilter: (fixationFilterSettings: unknown) => Promise<unknown>
  onCompleteFixationFilterListener: (callback: (args: unknown[]) => void) => void
}

type State = {
  getState: () => Promise<GlobalState>
  clearState: () => Promise<unknown>
  getStyleParametersOfState: (filePath: string) => Promise<unknown>
  setAreGazesCorrectedOfState: (filePath: string, val: boolean) => Promise<unknown>
  getQuestions: () => Promise<unknown>
  getStates: () => Promise<unknown>
  clearStates: () => Promise<unknown>
  removeState: (filePath: string) => Promise<unknown>
  doesStateExist: (filePath: string) => Promise<boolean>
  getSnapshotsOfState: (filePath: string) => Promise<unknown>
  areAreGazesCorrectedOfState: (filePath: string) => Promise<boolean>
}

type Progress = {
  onUpdateProcessingMessage: (callback: (args: unknown[]) => void) => void
}

type Utils = {
  stateDownload: (
    fileName: string,
    includeTimeStampInFileName: boolean,
    customDownload: unknown,
  ) => Promise<unknown>
  readState: (
    file: unknown,
    fileName: string,
    filePath: string | null,
    state: unknown,
    config: unknown,
  ) => Promise<unknown>
  onStateRead: (callback: (args: unknown[]) => void) => void
  saveSession: (state: unknown) => Promise<unknown>
  recoverSession: (
    gazeDataFilename: string,
    snapshotsContentDataFilename: string,
  ) => Promise<unknown>
  onSessionRead: (callback: (args: unknown[]) => void) => void
}

declare global {
  interface Window {
    electron: CustomElectronAPI
    api: unknown

    eyeTracker: EyeTracker
    Rserver: Rserver
    state: State
    progress: Progress
    utils: Utils
    analysis: Analysis
    serverTests: ServerTests
    globalParameters: unknown
  }
}
