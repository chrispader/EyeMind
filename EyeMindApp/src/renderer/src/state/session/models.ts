import type { StateCreator } from 'zustand'

import { type Model, createDefaultModel } from '../../model/models'
import type { SessionStore } from './types'

export type ModelsSlice = {
  models: Record<string, Model>
  modelActions: ModelActions
}

export type ModelActions = {
  addModel: (model: Model | File, isDraft?: boolean) => void
  addModels: (models: (Model | File)[], isDraft?: boolean) => void
  removeModel: (modelId: string) => void
  updateModel: (modelId: string, modelDelta: Partial<Model>) => void
  resetModels: () => void
}

export const createModelsSlice: StateCreator<
  SessionStore,
  [['zustand/immer', never]],
  [],
  ModelsSlice
> = (set) => ({
  models: {},

  modelActions: {
    addModel: (newModel, isDraft?: boolean) => {
      set((state) => {
        if (newModel instanceof File) {
          newModel = createDefaultModel(newModel, isDraft)
        }

        state.models[newModel.id] = newModel
      })
    },

    addModels: (newModels, isDraft?: boolean) => {
      set((state) => {
        for (let model of newModels) {
          if (model instanceof File) {
            model = createDefaultModel(model, isDraft)
          }

          state.models[model.id] = model
        }
      })
    },

    removeModel: (modelId) => {
      set((state) => {
        delete state.models[modelId]
      })
    },

    updateModel: (modelId, modelDelta) => {
      set((state) => {
        const existingModel = state.models[modelId]

        const newModel = {
          ...existingModel!,
          ...modelDelta,
          id: modelId,
        }

        state.models[modelId] = newModel
      })
    },

    resetModels: () => {
      set((state) => {
        state.models = {}
      })
    },
  },
})
