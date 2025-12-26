import { type StateCreator, create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { Model } from '@/app/client/model/models'
import type { SessionSettings } from '../model/settings'

type Models = Record<string, Model>

type ModelActions = {
  addModel: (model: Model) => void
  removeModel: (modelId: string) => void
  updateModel: (modelId: string, modelDelta: Partial<Model>) => void
  resetModels: () => void
}

type ModelsSlice = {
  models: Models
  draftModels?: Models

  modelActions: ModelActions

  draftModelActions: ModelActions
}

type SessionSlice = {
  settings: SessionSettings

  actions: {
    updateSessionSettings: (advancedSettings: Partial<SessionSettings>) => void
    resetSessionSettings: () => void
    reset: () => void
  }
}

export type SessionStore = ModelsSlice & SessionSlice

const createModelsSlice: StateCreator<
  SessionStore,
  [['zustand/immer', never]],
  [],
  ModelsSlice
> = (set) => ({
  models: {},

  modelActions: {
    addModel: (newModel) => {
      set((state) => {
        state.models[newModel.id] = newModel
      })
    },

    removeModel: (modelId) => {
      set((state) => {
        delete state.models[modelId]
      })
    },

    updateModel: (modelId, modelDelta) => {
      set((state) => {
        const existingModel = state.models?.[modelId]

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

  draftModelActions: {
    addModel: (newModel) => {
      set((state) => {
        state.draftModels = {
          ...state.draftModels,
          [newModel.id]: newModel,
        }
      })
    },

    removeModel: (modelId) => {
      set((state) => {
        delete state.draftModels?.[modelId]
      })
    },

    updateModel: (modelId, modelDelta) => {
      set((state) => {
        const existingModel = state.draftModels?.[modelId]

        const newModel = {
          ...existingModel!,
          ...modelDelta,
          id: modelId,
        }

        if (state.draftModels == null) {
          state.draftModels = {}
        }

        state.draftModels[modelId] = newModel
      })
    },

    resetModels: (isDraft = false) => {
      set((state) => {
        if (isDraft) {
          state.draftModels = undefined
          return
        }

        state.models = {}
      })
    },
  },
})

const createSessionSlice: StateCreator<
  SessionStore,
  [['zustand/immer', never]],
  [],
  SessionSlice
> = (set, get, store) => ({
  settings: {},

  actions: {
    updateSessionSettings: (advancedSettings) => {
      set((state) => {
        state.settings = advancedSettings
      })
    },

    resetSessionSettings: () => {
      set(store.getInitialState())
    },

    reset: () => {
      const { actions, modelActions, draftModelActions } = get()
      modelActions.resetModels()
      draftModelActions.resetModels()
      actions.resetSessionSettings()
    },
  },
})

export const useSessionStore = create<SessionStore>()(
  immer((...args) => ({
    ...createModelsSlice(...args),
    ...createSessionSlice(...args),
  })),
)

export const useSessionSettings = () => useSessionStore((state) => state.settings)
export const useSessionActions = () => useSessionStore((state) => state.actions)

export const useSessionModels = () => useSessionStore((state) => state.models)
export const useSessionModelActions = () => useSessionStore((state) => state.modelActions)
export const useSessionModel = (modelId: string) =>
  useSessionStore((state) => state.models?.[modelId])

export const useSessionDraftModels = () => useSessionStore((state) => state.draftModels)
export const useSessionDraftModel = (modelId: string) =>
  useSessionStore((state) => state.draftModels?.[modelId])
export const useSessionDraftModelActions = () =>
  useSessionStore((state) => state.draftModelActions)
