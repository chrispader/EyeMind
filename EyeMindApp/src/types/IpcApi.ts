/**
 * Shared IPC API type definitions used by both main process and renderer.
 * These types define the function signatures for IPC communication.
 *
 * This is the SINGLE SOURCE OF TRUTH for all IPC types.
 * Both preload/index.ts and preload/index.d.ts should derive types from here.
 */
import type { GlobalState, ProcessedGazeData } from './GlobalState'

// ============================================================================
// Common Result Types
// ============================================================================

/** Standard IPC result type for operations that may fail */
export type IpcResult<T = void> =
  | { success: true; data: T }
  | { success: false; error: string }

/** Style parameters returned from state queries */
export type StyleParameters = {
  color?: string
  fontSize?: number
  [key: string]: unknown
}

/** Snapshot data structure for eye-tracking */
export type Snapshot = {
  id: number
  tabName?: string
  timestamp: number
  code: string
  screenX: number
  screenY: number
  boundingClientRect: string | null
}

/** State info for dropdown/selection */
export type StateInfo = Record<string, string>

/** Heatmap generation result */
export type HeatmapResult = {
  svg?: string
  error?: string
}

/** Fixation log summary result */
export type FixationLogSummary = {
  data: unknown[]
  summary: Record<string, unknown>
}

/** Random gaze set result */
export type RandomGazeSet = {
  gazes: Array<{ x: number; y: number; timestamp: number }>
}

/** Questions data structure */
export type QuestionsData = Array<{
  id: string
  text: string
  [key: string]: unknown
}>

// ============================================================================
// Namespace API Types
// ============================================================================

export type Analysis = {
  summerizedFixationLog: (
    data: ProcessedGazeData,
    mode: string,
    areGazesCorrected: boolean,
  ) => Promise<FixationLogSummary>
  generateHeatMap: (
    filePaths: string[],
    elementRegistryTypes: string[],
    measure: string,
    measureType: string,
    aggregation: string,
    additionalElementsToInclude: string[],
    questionID: string | null,
  ) => Promise<HeatmapResult>
  shouldEnableHeatmap: () => Promise<boolean>
  getRandomGazeSet: (samplingRatio: number, stateFile: string) => Promise<RandomGazeSet>
  applyCorrectionOffset: (
    externalMappingWindow: string,
    stateFile: string,
    snapshotId: string,
    xOffset: number,
    yOffset: number,
  ) => Promise<IpcResult>
  gazeDataFragmentMapped: (
    stateFile: string,
    gazeDataFragment: unknown[],
    start: number,
    gazeDataSize: number,
    externalMappingWindow: string,
    snapshotId: string,
    xOffset: number,
    yOffset: number,
  ) => Promise<IpcResult>
  getStatesInfo: () => Promise<StateInfo>
}

export type EyeTracker = {
  setupTracking: (xScreenDim: number, yScreenDim: number) => Promise<IpcResult>
  sendSnapshotID: (snapshot: Snapshot) => Promise<IpcResult>
  sendFullSnapshot: (snapshot: Snapshot) => Promise<IpcResult>
  sendQuestionEvent: (
    questionTimestamp: number,
    questionEventType: string,
    questionPosition: string,
    questionText: string,
    questionAnswer: string,
    questionID: string,
  ) => Promise<IpcResult>
  processGazeData: (
    state: ProcessedGazeData,
    externalProgressWindow: string,
  ) => Promise<IpcResult>
  dataMapped: (
    dataMapped: unknown[],
    start: number,
    gazeDataSize: number,
    externalProgressWindow: string,
  ) => Promise<IpcResult>
  sendClickEvent: (clickTimestamp: number, clickedElement: string) => Promise<IpcResult>
}

export type Rserver = {
  startRserver: () => void
  fixationFilter: (fixationFilterSettings: {
    dispersionThreshold?: number
    durationThreshold?: number
    [key: string]: unknown
  }) => Promise<IpcResult>
}

export type State = {
  getState: () => Promise<GlobalState>
  clearState: () => Promise<IpcResult>
  getStyleParametersOfState: (filePath: string) => Promise<StyleParameters | null>
  setAreGazesCorrectedOfState: (filePath: string, val: boolean) => Promise<IpcResult>
  getQuestions: () => Promise<QuestionsData>
  getStates: () => Promise<Record<string, GlobalState>>
  clearStates: () => Promise<IpcResult>
  removeState: (filePath: string) => Promise<IpcResult>
  doesStateExist: (filePath: string) => Promise<boolean>
  getSnapshotsOfState: (filePath: string) => Promise<Snapshot[]>
  areAreGazesCorrectedOfState: (filePath: string) => Promise<boolean>
}

export type Utils = {
  stateDownload: (
    fileName: string,
    includeTimeStampInFileName: boolean,
    type: string,
  ) => Promise<IpcResult<string>>
  readState: (
    file: File | null,
    fileName: string,
    filePath: string | null,
    state: GlobalState,
    config: { expectedArtifact?: string; expectedExtensions?: string[] },
  ) => Promise<IpcResult>
  /** Serializable session store slice (models, questionFiles, questions, settings). */
  saveSession: (sessionPayload: SessionStatePayload) => Promise<IpcResult>
  recoverSession: (
    gazeDataFilename: string,
    snapshotsContentDataFilename: string,
  ) => Promise<IpcResult<GlobalState>>
}

/** Serializable part of the session store (no action functions). */
export type SessionStatePayload = {
  models: Record<string, unknown>
  questionFiles: Record<string, unknown>
  questions: unknown
  settings: Record<string, unknown>
}

export type Download = {
  stateDownload: (
    fileName: string,
    includeTimeStampInFileName: boolean,
    type: string,
  ) => Promise<IpcResult<string>>
}

export type Session = {
  saveSession: (sessionPayload: SessionStatePayload) => Promise<IpcResult>
  recoverSession: (
    gazeDataFilename: string,
    snapshotsContentDataFilename: string,
  ) => Promise<IpcResult<GlobalState>>
}

export type Window = {
  putFullScreen: () => void
  removeFullScreen: () => void
}

// ============================================================================
// Event Callback Types (for ipcRenderer.on listeners)
// ============================================================================

/** Event payload types for main→renderer events */
export type IpcEventPayloads = {
  browserMovement: [x: number, y: number]
  browserResize: [width: number, height: number]
  applyCorrectionOnGazeFragment: [fragmentIndex: number, progress: number]
  completeCorrectionListener: [success: boolean]
  mapGazestoElementsFromPageSnapshot: [snapshotId: string, progress: number]
  completeProcessingListener: [success: boolean]
  completeFixationFilterListener: [success: boolean]
  updateProcessingMessage: [message: string, progress: number]
  stateRead: [state: GlobalState, error?: string]
  sessionRead: [state: GlobalState, error?: string]
}

/** Type for event listener callback functions */
export type IpcEventCallback<T extends keyof IpcEventPayloads> = (
  args: IpcEventPayloads[T],
) => void

// ============================================================================
// Namespace Map
// ============================================================================

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

// ============================================================================
// Utility Types for Type-Safe IPC
// ============================================================================

/** Get the type of a specific IPC namespace */
export type IpcNamespace<K extends keyof IpcApiMap> = IpcApiMap[K]

/** Get the parameter types for a function in an IPC namespace */
export type IpcListenerParameters<
  NS extends keyof IpcApiMap,
  FN extends keyof IpcApiMap[NS],
> = IpcApiMap[NS][FN] extends (...args: infer P) => unknown ? P : never

/** Get the return type for a function in an IPC namespace */
export type IpcReturnType<
  NS extends keyof IpcApiMap,
  FN extends keyof IpcApiMap[NS],
> = IpcApiMap[NS][FN] extends (...args: unknown[]) => infer R ? R : never

/** Channel names for invoke handlers */
export type IpcInvokeChannel = {
  [NS in keyof IpcApiMap]: keyof IpcApiMap[NS]
}[keyof IpcApiMap]

/** Channel names for event listeners */
export type IpcEventChannel = keyof IpcEventPayloads
