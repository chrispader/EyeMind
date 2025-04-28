export type LoadFileConfig = {
  mode?: 'analysis' | 'data-collection'
  importMode?: 'single' | 'multiple'
  expectedArtifact?: string
  expectedExtensions?: string[]
}
