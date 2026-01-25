/**
 * Helper utilities for type-safe IPC handler registration.
 *
 * These helpers reduce boilerplate when registering IPC handlers
 * while maintaining type safety for parameter types.
 */

import { ipcMain, IpcMainInvokeEvent } from 'electron'
import type { IpcApiMap, IpcListenerParameters } from '@/types/IpcApi'

/**
 * Type-safe parameter extractor for a namespace.
 * Use this to create a type alias for listener parameters.
 *
 * @example
 * type StateParams<FN extends keyof IpcApiMap['state']> = ListenerParams<'state', FN>
 */
export type ListenerParams<
  NS extends keyof IpcApiMap,
  FN extends keyof IpcApiMap[NS],
> = IpcListenerParameters<NS, FN>

/**
 * Registers a simple IPC handler that passes args directly to a function.
 *
 * @param channel - The IPC channel name (must match a function name in the namespace)
 * @param handler - The function to call with the arguments
 *
 * @example
 * // Simple handler that passes args directly
 * registerHandler('getState', getState)
 */
export function registerHandler<Args extends unknown[], R>(
  channel: string,
  handler: (args: Args) => R,
): void {
  ipcMain.handle(channel, (_e: IpcMainInvokeEvent, args: Args) => handler(args))
}

/**
 * Registers an IPC handler with spread arguments.
 * The handler receives arguments as individual parameters instead of an array.
 *
 * @param channel - The IPC channel name
 * @param handler - The function to call with spread arguments
 *
 * @example
 * registerSpreadHandler('removeState', removeState)
 * // Equivalent to: ipcMain.handle('removeState', (_e, args) => removeState(...args))
 */
export function registerSpreadHandler<Args extends unknown[], R>(
  channel: string,
  handler: (...args: Args) => R,
): void {
  ipcMain.handle(channel, (_e: IpcMainInvokeEvent, args: Args) => handler(...args))
}

/**
 * Registers a parameterless IPC handler.
 *
 * @param channel - The IPC channel name
 * @param handler - The function to call (no arguments)
 *
 * @example
 * registerNoArgsHandler('getState', getState)
 */
export function registerNoArgsHandler<R>(channel: string, handler: () => R): void {
  ipcMain.handle(channel, () => handler())
}

/**
 * Creates a namespace-specific handler registrar.
 * This provides channel name validation while allowing flexible handler types.
 *
 * @example
 * const register = createNamespaceRegistrar<'state'>()
 *
 * // Now register handlers with channel name validation
 * register.spread('getState', getState)
 * register.spread('removeState', removeState)
 * register.noArgs('clearState', clearState)
 */
export function createNamespaceRegistrar<NS extends keyof IpcApiMap>() {
  return {
    /**
     * Register a handler that spreads the args array to the function.
     * Channel name is validated against the namespace API.
     */
    spread<FN extends keyof IpcApiMap[NS] & string>(
      channel: FN,
      handler: (...args: IpcListenerParameters<NS, FN>) => unknown,
    ): void {
      ipcMain.handle(
        channel,
        (_e: IpcMainInvokeEvent, args: IpcListenerParameters<NS, FN>) =>
          (handler as (...a: unknown[]) => unknown)(...args),
      )
    },

    /**
     * Register a handler with no arguments.
     * Channel name is validated against the namespace API.
     */
    noArgs<FN extends keyof IpcApiMap[NS] & string>(channel: FN, handler: () => unknown): void {
      ipcMain.handle(channel, () => handler())
    },

    /**
     * Register a handler that receives the full args array.
     * Channel name is validated against the namespace API.
     */
    array<FN extends keyof IpcApiMap[NS] & string>(
      channel: FN,
      handler: (args: IpcListenerParameters<NS, FN>) => unknown,
    ): void {
      ipcMain.handle(
        channel,
        (_e: IpcMainInvokeEvent, args: IpcListenerParameters<NS, FN>) => handler(args),
      )
    },

    /**
     * Register a custom handler with full control over event and args.
     * Channel name is validated against the namespace API.
     */
    custom<FN extends keyof IpcApiMap[NS] & string>(
      channel: FN,
      handler: (event: IpcMainInvokeEvent, args: IpcListenerParameters<NS, FN>) => unknown,
    ): void {
      ipcMain.handle(channel, handler as (event: IpcMainInvokeEvent, args: unknown) => unknown)
    },
  }
}
