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
import DataFrame from 'dataframe-js'
import { create } from 'zustand'
import { LoadFileConfig } from '@/app/client/components/FileImport/types'
import { ModelFile } from '@/app/client/model/Files'

export type ClientState = LoadFileConfig & {
  linkingSubProcessesMode?: string
  models?: Record<string, ModelFile | undefined>
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

export type ClientStateStore = ClientState & {
  setState: (
    stateDelta: Partial<ClientState> | ((state: ClientState) => Partial<ClientState>),
  ) => void
  updateModel: (modelId: string, modelDelta: Partial<ModelFile> | undefined) => void
}

const useStateStore = create<ClientStateStore>((set) => ({
  setState: set,
  updateModel: (modelId, modelDelta) => {
    set((state) => {
      const newModel =
        modelDelta === undefined
          ? undefined
          : {
              ...state.models?.[modelId],
              id: modelId,
              ...modelDelta,
            }

      return {
        ...state,
        models: {
          ...state.models,
          ...(newModel ? { [modelId]: newModel } : {}),
        },
      }
    })
  },
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
  const { setState } = useStateStore.getState()

  setState(await window.state.getState())
}

export { useStateStore, loadServerStateIntoClient }
