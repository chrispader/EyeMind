const LANG = {
  setAsMain: 'Set as main',
  unclosableTab: 'Unclosable Tab',
  loadFiles: 'Load files',
  dropFiles: 'Drop files',
  dropModelsFiles: 'Drop models files',
} as const

export const translate = (key: keyof typeof LANG) => LANG[key]
