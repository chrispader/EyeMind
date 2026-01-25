/**
 * Shared IPC API type definitions used by both main process and renderer.
 * These types define the function signatures for IPC communication.
 */

import { GlobalState } from './GlobalState'

export type Analysis = {
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
  getStatesInfo: () => Promise<unknown>
}

export type EyeTracker = {
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
  dataMapped: (
    dataMapped: unknown,
    start: number,
    gazeDataSize: number,
    externalProgressWindow: unknown,
  ) => Promise<unknown>
  sendClickEvent: (clickTimestamp: number, clickedElement: string) => Promise<unknown>
}

export type Rserver = {
  startRserver: () => void
  fixationFilter: (fixationFilterSettings: unknown) => Promise<unknown>
}

export type State = {
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

export type Utils = {
  stateDownload: (
    fileName: string,
    includeTimeStampInFileName: boolean,
    type: string,
  ) => Promise<unknown>
  readState: (
    file: unknown,
    fileName: string,
    filePath: string | null,
    state: unknown,
    config: unknown,
  ) => Promise<unknown>
  saveSession: (state: unknown) => Promise<unknown>
  recoverSession: (
    gazeDataFilename: string,
    snapshotsContentDataFilename: string,
  ) => Promise<unknown>
}

export type Download = {
  stateDownload: (
    fileName: string,
    includeTimeStampInFileName: boolean,
    type: string,
  ) => Promise<unknown>
}

export type Session = {
  saveSession: (state: unknown) => Promise<unknown>
  recoverSession: (
    gazeDataFilename: string,
    snapshotsContentDataFilename: string,
  ) => Promise<unknown>
}

export type Window = {
  putFullScreen: () => Promise<void>
  removeFullScreen: () => Promise<void>
}

/** Map of namespace names to their API types */
export interface IpcApiMap {
  analysis: Analysis
  eyeTracker: EyeTracker
  Rserver: Rserver
  state: State
  utils: Utils
  download: Download
  session: Session
  window: Window
}

/** Get the type of a specific IPC namespace */
export type IpcNamespace<K extends keyof IpcApiMap> = IpcApiMap[K]

/** Get the parameter types for a function in an IPC namespace */
export type IpcListenerParameters<
  NS extends keyof IpcApiMap,
  FN extends keyof IpcApiMap[NS],
> = IpcApiMap[NS][FN] extends (...args: infer P) => unknown ? P : never
