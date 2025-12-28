export const SUB_PROCESS_LINKING_MODES = [
  { value: 'no-support', label: 'No support' },
  { value: 'symbol-links', label: 'Symbol links' },
  { value: 'breadcrumb-navigation', label: 'Breadcrumb navigation' },
] as const

export type SubProcessLinkingMode = (typeof SUB_PROCESS_LINKING_MODES)[number]['value']

export type SessionSettings = {
  subProcessLinkingMode?: SubProcessLinkingMode
}
