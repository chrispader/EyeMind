import type { ModelsSlice } from './models'
import type { QuestionsSlice } from './questions'
import type { RecordingSlice } from './recording'
import type { SessionSlice } from './session'

export type SessionStore = ModelsSlice & QuestionsSlice & RecordingSlice & SessionSlice
