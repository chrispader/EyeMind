import z from 'zod'
import type { StateCreator } from 'zustand'

import type { SessionStore } from './types'

const coercedInt = z
  .string()
  .refine((val) => Number.isInteger(Number(val)), {
    error: 'Must be an integer',
  })
  .transform((val) => Number.parseInt(val, 10))

export const RecordingSettingsSchema = z.object({
  xScreenDimension: coercedInt,
  yScreenDimension: coercedInt,
  screenDistance: coercedInt,
  monitorSize: coercedInt,
  recordingId: z.string(),
  participantId: z.string().optional(),
  experimentId: z.string().optional(),
  experimenterId: z.string().optional(),
  additionalNotes: z.string().optional(),
})

export type RecordingSettings = z.infer<typeof RecordingSettingsSchema>

export type RecordingSlice = {
  recordingSettings: RecordingSettings | null
  recordingActions: RecordingActions
}

type RecordingActions = {
  updateRecordingSettings: (recordingSettings: Partial<RecordingSettings>) => void
  resetRecordingSettings: () => void
}

export const createRecordingSlice: StateCreator<
  SessionStore,
  [['zustand/immer', never]],
  [],
  RecordingSlice
> = (set) => ({
  recordingSettings: null,

  recordingActions: {
    updateRecordingSettings: (recordingSettings) => {
      set((state) => {
        state.recordingSettings = recordingSettings as RecordingSettings
      })
    },

    resetRecordingSettings: () => {
      set((state) => {
        state.recordingSettings = null
      })
    },
  },
})
