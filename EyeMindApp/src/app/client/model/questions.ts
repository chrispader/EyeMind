import { CONST } from '@/CONST'
import type { Draftable } from '../types/Draftable'

export type QuestionFile = Draftable & {
  id: string
  fileName: string
  path: string
  file: File
}

export function getQuestionFileIdFromFileName(fileName: string) {
  return fileName.replace(new RegExp(CONST.QUESTIONS_ID_REGEX, 'g'), '')
}

export function createDefaultQuestionFile(
  file: File,
  isDraft: boolean = false,
): QuestionFile {
  return {
    id: file.name,
    fileName: file.name,
    path: file.path,
    file: file,
    isDraft: isDraft,
  }
}
