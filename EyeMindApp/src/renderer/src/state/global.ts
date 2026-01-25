import { create } from 'zustand'
import { GlobalState } from '@/types/GlobalState'

export type GlobalStore = GlobalState & {
  setState: (
    stateDelta: Partial<GlobalState> | ((state: GlobalState) => Partial<GlobalState>),
  ) => void
}

const useGlobalStore = create<GlobalStore>((set) => ({
  setState: set,
  processedGazeData: {},
}))

/**
 * Title: Load server state into client.
 *
 * Description: get the state object from the server and assign it to state (i..e, client state)
 *
 * Control-flow summary: get the state object from the server and assign it to state (i..e, client state)
 *
 * @param {void} . .
 *
 * Returns {void}
 *
 * Tests: none
 *
 * Additional notes: async function
 *
 */
async function loadServerStateIntoClient(): Promise<void> {
  const { setState } = useGlobalStore.getState()

  setState(await window.state.getState())
}

export { useGlobalStore, loadServerStateIntoClient }
