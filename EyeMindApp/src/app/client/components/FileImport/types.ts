export type LoadFileConfig = {
  mode?: 'analysis' | 'data-collection'
  importMode?: 'single' | 'multiple'
  expectedArtifact?: 'models' | 'questions' | 'session' | 'analysis'
  expectedExtensions?: string[]
}
