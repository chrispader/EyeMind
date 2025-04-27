/*MIT License

Copyright (c) 2022 Eye-Mind Tool (Author: Amine Abbad-Andaloussi)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.*/
import { create } from 'zustand'

interface State {
  mode: string
  importMode: string
  linkingSubProcessesMode: string
  temp: {
    expectedArtifact: string
    expectedExtensions: string[]
  }
  models: Record<string, unknown>
}

interface StateStore {
  state: State | null
  setState: (newState: State | null) => void
}

const useStateStore = create<StateStore>((set) => ({
  state: null,
  setState: (newState) => set({ state: newState }),
}))

/**
 * Title: getState.
 *
 * Description: getter
 *
 * Control-flow summary: return state
 *
 * @param {void} . .
 *
 * Returns state
 *
 * Tests: none
 *
 * Additional notes: none
 *
 */
const getState = () => useStateStore.getState()

/**
 * Title: SetState.
 *
 * Description: setter
 *
 * Control-flow summary: set state (i.e., client state) to newState
 *
 * @param {object} newState
 *
 * Returns {void}
 *
 * Tests: none
 *
 * Additional notes: none
 *
 */
const setState = (newState: Record<string, unknown>) => useStateStore.setState(newState)

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
  setState(await window.state.getState())
}

export { useStateStore, getState, setState, loadServerStateIntoClient }
