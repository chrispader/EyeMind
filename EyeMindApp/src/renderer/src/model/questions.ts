import Papa from 'papaparse'

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

export function createDefaultQuestionFile(file: File, isDraft = false): QuestionFile {
  return {
    id: file.name,
    fileName: file.name,
    path: file.path,
    file: file,
    isDraft: isDraft,
  }
}

export async function extractQuestionsFromFile(file: File): Promise<Questions> {
  const text = await file.text()
  const parsed = Papa.parse<Record<string, string>>(text, {
    header: true,
    skipEmptyLines: true,
  })

  if (parsed.errors.length > 0) {
    const firstError = parsed.errors[0]
    const message = firstError != null ? firstError.message : 'Unknown error'
    throw new Error(`CSV parse error: ${message}`)
  }

  const questions = parsed.data as Questions

  if (!checkNeccesaryColumnsInQuestionsFile(questions)) {
    throw new Error('required columns or question types not supported')
  }

  return questions
}

function checkNeccesaryColumnsInQuestionsFile(rows: Questions): boolean {
  const checker = (arr: string[], target: string[]) =>
    target.every((v) => arr.includes(v))

  const columns = rows.length > 0 ? Object.keys(rows[0]!) : []
  const allRequiredColumnsThere = checker(columns, CONST.RQUIRED_COLUMNS_IN_QUESTION_FILE)

  const uniqueTypes = [
    ...new Set(rows.map((r) => r['type']).filter((t): t is string => t != null)),
  ]
  const containsOnlySupportedQuestionTypes = checker(
    CONST.QUESTION_TYPES_SUPPORTED,
    uniqueTypes,
  )

  return allRequiredColumnsThere && containsOnlySupportedQuestionTypes
}
