import { CONST } from '@/CONST'

import type { Draftable } from '../types/Draftable'

export type Model = Draftable & {
  id: string
  fileName?: string
  path?: string
  xml?: string
  isMain?: boolean
  groupId?: string
  unclosable?: boolean
  mainTab?: boolean
  file: File
}

export function getModelIdFromFileName(fileName: string) {
  return fileName.replace(new RegExp(CONST.MODELS_ID_REGEX, 'g'), '')
}

export function createDefaultModel(file: File, isDraft: boolean = false): Model {
  return {
    id: file.name,
    fileName: file.name,
    path: file.path,
    file: file,
    isDraft: isDraft,
  }
}

