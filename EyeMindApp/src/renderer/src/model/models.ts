import { CONST } from '@/CONST'

import type { Draftable } from '../types/Draftable'

export type Model = Draftable & {
  id: string
  fileName?: string
  path?: string
  /** BPMN/ODM XML content. When set, this model is a diagram model. */
  xml?: string
  /** Base64 data URL for image models. When set (and no xml), this model is an image model. */
  dataUrl?: string
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

/** Creates a model that represents an image file (no BPMN xml). */
export function createDefaultImageModel(
  file: File,
  dataUrl: string,
  isDraft: boolean = false,
): Model {
  return {
    id: getModelIdFromFileName(file.name),
    fileName: file.name,
    path: file.path,
    file,
    dataUrl,
    isDraft,
  }
}

/** Type guard: true when the model is an image model (has dataUrl, no BPMN xml). */
export function isImageModel(
  model: Model,
): model is Model & { dataUrl: string } {
  return model.dataUrl != null && model.dataUrl !== ''
}

