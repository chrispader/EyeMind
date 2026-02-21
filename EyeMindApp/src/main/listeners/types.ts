// Re-export types from the single source of truth
export type { IpcNamespace, IpcListenerParameters, IpcApiMap } from '@/types/IpcApi'

// Re-export helpers for IPC handler registration
export { createNamespaceRegistrar } from './ipc-helpers'
export type { ListenerParams } from './ipc-helpers'
