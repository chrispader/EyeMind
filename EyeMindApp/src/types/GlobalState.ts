import type DataFrame from 'dataframe-js'

export type ProcessedGazeData = {
  gazeData?: unknown[] | string
  fixationData?: unknown[] | null
  fixationFilterData?: { status?: string } | null
  participantID?: string
  areGazesCorrected?: boolean
  temporaryCorrectedGazeData?: unknown[]
  xScreenDim?: string
  yScreenDim?: string
  screenDistance?: string
  monitorSize?: string
  recordingID?: string
  experimentID?: string
  experimenterID?: string
  additionalNotes?: string
}

export type GlobalState = {
  mode?: 'analysis' | 'data-collection'
  importMode?: 'single' | 'multiple'
  expectedArtifact?: 'models' | 'questions' | 'session' | 'analysis'
  expectedExtensions?: string[]
  linkingSubProcessesMode?: string
  processedGazeData: ProcessedGazeData
  questions?: DataFrame | Record<string, string>[]
  styleParameters?: string
  isEtOn?: boolean
  snapshotsCounter?: number
  snapshots?: Record<string, unknown>
  activeTab?: string
  processHierarchyExplorer?: { id: string; label: string }[] | null
  isLoading?: boolean
  loadingMessage?: string
  activeModelGroupId?: string | null
  showNavTabsAndTabs?: boolean
  models?: Record<string, unknown>
  temp?: { expectedArtifact?: string; expectedExtensions?: string[] }
}
