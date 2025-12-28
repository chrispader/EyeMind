import { GlobalState } from '@/types/GlobalState'

export type FileImportConfig = {
  mode?: GlobalState['mode']
  importMode?: GlobalState['importMode']
  expectedArtifact?: GlobalState['expectedArtifact']
  expectedExtensions?: GlobalState['expectedExtensions']
}
