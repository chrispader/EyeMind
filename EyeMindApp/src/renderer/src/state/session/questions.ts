import type { StateCreator } from 'zustand'

import {
  type QuestionFile,
  type Questions,
  createDefaultQuestionFile,
} from '../../model/questions'
import type { SessionStore } from './types'

export type QuestionsSlice = {
  questionFiles: Record<string, QuestionFile>
  questions: Questions

  questionActions: QuestionActions
}

export type QuestionActions = {
  addQuestionFile: (questionFile: QuestionFile | File) => void
  addQuestionFiles: (questionFiles: (QuestionFile | File)[]) => void
  removeQuestionFile: (questionFileId: string) => void
  updateQuestionFile: (
    questionFileId: string,
    questionFileDelta: Partial<QuestionFile>,
  ) => void

  setQuestions: (questions: Questions) => void

  resetQuestions: () => void
}

export const createQuestionsSlice: StateCreator<
  SessionStore,
  [['zustand/immer', never]],
  [],
  QuestionsSlice
> = (set) => ({
  questionFiles: {},
  questions: [],

  questionActions: {
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
        const existingQuestionFile = state.questionFiles[questionFileId]

        const newQuestionFile = {
          ...existingQuestionFile!,
          ...questionFileDelta,
          id: questionFileId,
        }

        state.questionFiles[questionFileId] = newQuestionFile
      })
    },

    setQuestions: (questions: Questions) => {
      set((state) => {
        state.questions = questions
      })
    },

    resetQuestions: () => {
      set((state) => {
        state.questionFiles = {}
        state.questions = []
      })
    },
  },
})
