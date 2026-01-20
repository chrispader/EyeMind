import DataFrame from 'dataframe-js'

import { CONST } from '@/CONST'

import type { Draftable } from '../types/Draftable'

export type QuestionFile = Draftable & {
  id: string
  fileName: string
  path: string
  file: File
}

export type Questions = Record<string, string>[]

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

export async function extractQuestionsFromFile(file: File) {
  const contentAsDataFrame = await DataFrame.fromCSV(file) // this statement should not fail if the file is a valid csv
  contentAsDataFrame.show()
  const questions = contentAsDataFrame.toCollection() as Record<string, string>[]

  if (!checkNeccesaryColumnsInQuestionsFile(contentAsDataFrame))
    throw new Error('required columns or question types not suported')

  return questions
}

function checkNeccesaryColumnsInQuestionsFile(df: DataFrame) {
  const checker = (arr: string[], target: string[]) =>
    target.every((v) => arr.includes(v))

  const allRequiredColumnsThere = checker(
    df.listColumns(),
    CONST.RQUIRED_COLUMNS_IN_QUESTION_FILE,
  )
  const containsOnlySupportedQuestionTypes = checker(
    CONST.QUESTION_TYPES_SUPPORTED,
    df.unique('type').toArray().flat(),
  )

  return allRequiredColumnsThere && containsOnlySupportedQuestionTypes
}
