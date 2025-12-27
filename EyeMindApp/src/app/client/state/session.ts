import { type StateCreator, create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { useShallow } from 'zustand/react/shallow'
import { Model, createDefaultModel } from '@/app/client/model/models'
import { type QuestionFile, createDefaultQuestionFile } from '../model/questions'
import type { SessionSettings } from '../model/settings'

type ModelActions = {
  addModel: (model: Model | File, isDraft?: boolean) => void
  addModels: (models: (Model | File)[], isDraft?: boolean) => void
  removeModel: (modelId: string) => void
  updateModel: (modelId: string, modelDelta: Partial<Model>) => void
  resetModels: () => void
}

type ModelsSlice = {
  models: Record<string, Model>
  modelActions: ModelActions
}

type QuestionFilesActions = {
  addQuestionFile: (questionFile: QuestionFile | File) => void
  addQuestionFiles: (questionFiles: (QuestionFile | File)[]) => void
  removeQuestionFile: (questionFileId: string) => void
  updateQuestionFile: (
    questionFileId: string,
    questionFileDelta: Partial<QuestionFile>,
  ) => void
  resetQuestionFiles: () => void
}

type QuestionFilesSlice = {
  questionFiles: Record<string, QuestionFile>
  questionFilesActions: QuestionFilesActions
}

type SessionSlice = {
  settings: SessionSettings

  actions: {
    updateSessionSettings: (advancedSettings: Partial<SessionSettings>) => void
    resetSessionSettings: () => void
    reset: () => void
  }
}

export type SessionStore = ModelsSlice & QuestionFilesSlice & SessionSlice

const createModelsSlice: StateCreator<
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
})

const createQuestionFilesSlice: StateCreator<
  SessionStore,
  [['zustand/immer', never]],
  [],
  QuestionFilesSlice
> = (set) => ({
  questionFiles: {},

  questionFilesActions: {
    addQuestionFile: (newQuestionFile) => {
      set((state) => {
        if (newQuestionFile instanceof File) {
          newQuestionFile = createDefaultQuestionFile(newQuestionFile)
        }

        state.questionFiles[newQuestionFile.id] = newQuestionFile
      })
    },

    addQuestionFiles: (newQuestionFiles) => {
      set((state) => {
        for (let questionFile of newQuestionFiles) {
          if (questionFile instanceof File) {
            questionFile = createDefaultQuestionFile(questionFile)
          }

          state.questionFiles[questionFile.id] = questionFile
        }
      })
    },

    removeQuestionFile: (questionFileId) => {
      set((state) => {
        delete state.questionFiles[questionFileId]
      })
    },

    updateQuestionFile: (questionFileId, questionFileDelta) => {
      set((state) => {
        const existingQuestionFile = state.questionFiles?.[questionFileId]

        const newQuestionFile = {
          ...existingQuestionFile!,
          ...questionFileDelta,
          id: questionFileId,
        }

        state.questionFiles[questionFileId] = newQuestionFile
      })
    },

    resetQuestionFiles: () => {
      set((state) => {
        state.questionFiles = {}
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
      const { actions, modelActions, questionFilesActions } = get()
      modelActions.resetModels()
      questionFilesActions.resetQuestionFiles()
      actions.resetSessionSettings()
    },
  },
})

export const useSessionStore = create<SessionStore>()(
  immer((...args) => ({
    ...createModelsSlice(...args),
    ...createQuestionFilesSlice(...args),
    ...createSessionSlice(...args),
  })),
)

export const useSessionSettings = () => useSessionStore((state) => state.settings)
export const useSessionActions = () => useSessionStore((state) => state.actions)

export const useModels = (predicate?: (model: Model) => boolean | undefined) =>
  useSessionStore(
    useShallow((state) =>
      predicate
        ? Object.fromEntries(
            Object.entries(state.models).filter(([_, model]) => predicate(model)),
          )
        : state.models,
    ),
  )
export const useModelActions = () => useSessionStore((state) => state.modelActions)
export const useModel = (modelId: string) =>
  useSessionStore((state) => state.models?.[modelId])

export const useDraftModels = () => useModels((model) => model.isDraft)

export const useQuestionFiles = () => useSessionStore((state) => state.questionFiles)
export const useQuestionFileActions = () =>
  useSessionStore((state) => state.questionFilesActions)
export const useQuestionFile = (questionFileId: string) =>
  useSessionStore((state) => state.questionFiles?.[questionFileId])
