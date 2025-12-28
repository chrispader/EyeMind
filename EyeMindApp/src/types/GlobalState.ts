import type DataFrame from 'dataframe-js'

export type GlobalState = {
  mode?: 'analysis' | 'data-collection'
  importMode?: 'single' | 'multiple'
  expectedArtifact?: 'models' | 'questions' | 'session' | 'analysis'
  expectedExtensions?: string[]
  linkingSubProcessesMode?: string
  processedGazeData?: Record<string, unknown>
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
}
