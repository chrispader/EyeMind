/**
 * Type definitions for the preload context bridge.
 *
 * This file declares the global Window interface extensions
 * that are exposed via contextBridge.exposeInMainWorld.
 *
 * Types are imported from @/types/IpcApi.ts (single source of truth).
 */

import { ElectronAPI } from '@electron-toolkit/preload'
import type {
  Analysis,
  EyeTracker,
  IpcEventCallback,
  Rserver,
  State,
  Utils,
} from '@/types/IpcApi'

// ============================================================================
// Custom Electron API Extensions
// ============================================================================

type CustomElectronAPI = ElectronAPI & {
  putFullScreen: () => void
  message: (type: string, text: string) => void
  removeFullScreen: () => void
  onBrowserMovement: (func: IpcEventCallback<'browserMovement'>) => void
  onBrowserResize: (func: IpcEventCallback<'browserResize'>) => void
}

// ============================================================================
// Renderer-side API types (with event listeners added)
// ============================================================================

/** Analysis API with event listeners */
type RendererAnalysis = Analysis & {
  onApplyCorrectionOnGazeFragment: (
    func: IpcEventCallback<'applyCorrectionOnGazeFragment'>,
  ) => void
  onCompleteCorrectionListener: (func: IpcEventCallback<'completeCorrectionListener'>) => void
}

/** EyeTracker API with event listeners */
type RendererEyeTracker = EyeTracker & {
  onMapGazestoElementsFromPageSnapshot: (
    callback: IpcEventCallback<'mapGazestoElementsFromPageSnapshot'>,
  ) => void
  onCompleteProcessingListener: (
    callback: IpcEventCallback<'completeProcessingListener'>,
  ) => void
}

/** Rserver API with event listeners */
type RendererRserver = Rserver & {
  onCompleteFixationFilterListener: (
    callback: IpcEventCallback<'completeFixationFilterListener'>,
  ) => void
}

/** Utils API with event listeners */
type RendererUtils = Utils & {
  onStateRead: (callback: IpcEventCallback<'stateRead'>) => void
  onSessionRead: (callback: IpcEventCallback<'sessionRead'>) => void
}

/** Progress event API */
type Progress = {
  onUpdateProcessingMessage: (callback: IpcEventCallback<'updateProcessingMessage'>) => void
}

/** Server test utilities */
type ServerTests = {
  getServerState: () => Promise<unknown>
}

// ============================================================================
// Global Window Declaration
// ============================================================================

declare global {
  interface Window {
    electron: CustomElectronAPI
    api: unknown

    // IPC namespaces
    eyeTracker: RendererEyeTracker
    Rserver: RendererRserver
    state: State
    progress: Progress
    utils: RendererUtils
    analysis: RendererAnalysis
    serverTests: ServerTests
    globalParameters: typeof import('@/CONST').CONST

    /** Dynamically created external progress windows for long-running operations */
    externalProgressWindows: Record<string, Window>

    /** Client-side test utilities exposed for testing */
    clientTests: {
      getClientState: () => unknown
      openMainTabInWithinTabLinks: (modelsGroupId: string) => void
      resetModel: (fileId: string) => void
      resetNavTabsAndTabs: (modelsGroupId: string) => void
      lastRelevantClick?: { clickTimestamp: number; clickedElement: string }
    }
  }
}

export {}
