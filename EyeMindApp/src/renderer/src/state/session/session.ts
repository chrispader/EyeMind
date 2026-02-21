import type { StateCreator } from 'zustand'

import type { Model } from '../../model/models'
import type { QuestionFile, Questions } from '../../model/questions'
import type { SessionSettings } from '../../model/settings'
import type { SessionStore } from './types'

export type SessionSlice = {
  settings: SessionSettings
  actions: SessionActions
}

export type SessionData = {
  settings: SessionSettings
  models: Record<string, Model>
  questionFiles: Record<string, QuestionFile>
  questions: Questions
}

export type SessionActions = {
  updateSessionSettings: (advancedSettings: Partial<SessionSettings>) => void
  resetSessionSettings: () => void
  reset: () => void
  getSessionData: () => SessionData
}

export const createSessionSlice: StateCreator<
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
      const { actions, modelActions, questionActions: questionFilesActions } = get()
      modelActions.resetModels()
      questionFilesActions.resetQuestions()
      actions.resetSessionSettings()
    },

    getSessionData: () => {
      return {
        settings: get().settings,
        models: get().models,
        questionFiles: get().questionFiles,
        questions: get().questions,
      }
    },
  },
})
