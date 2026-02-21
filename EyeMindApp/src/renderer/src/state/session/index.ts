import type { Model } from '@renderer/model/models'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { useShallow } from 'zustand/react/shallow'

import { createModelsSlice } from './models'
import { createQuestionsSlice } from './questions'
import { createRecordingSlice } from './recording'
import { createSessionSlice } from './session'
import type { SessionStore } from './types'

export const useSessionStore = create<SessionStore>()(
  immer((...args) => ({
    ...createModelsSlice(...args),
    ...createQuestionsSlice(...args),
    ...createRecordingSlice(...args),
    ...createSessionSlice(...args),
  })),
)

export const useSessionSettings = () => useSessionStore((state) => state.settings)
export const useSessionActions = () => useSessionStore((state) => state.actions)

export const useModels = (predicate?: (model: Model) => boolean | undefined) =>
  useSessionStore(
    useShallow((state) =>
      predicate != null
        ? Object.fromEntries(
            Object.entries(state.models).filter(([_, model]) => predicate(model)),
          )
        : state.models,
    ),
  )
export const useModelActions = () => useSessionStore((state) => state.modelActions)
export const useDraftModels = () => useModels((model) => model.isDraft)

export const useQuestionFiles = () => useSessionStore((state) => state.questionFiles)
export const useQuestions = () => useSessionStore((state) => state.questions)
export const useQuestionActions = () => useSessionStore((state) => state.questionActions)

export const useRecordingSettings = () =>
  useSessionStore((state) => state.recordingSettings)
export const useRecordingActions = () =>
  useSessionStore((state) => state.recordingActions)
