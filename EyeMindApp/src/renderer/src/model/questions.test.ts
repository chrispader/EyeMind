import { describe, expect, it } from 'vitest'

import { createDefaultQuestionFile, getQuestionFileIdFromFileName } from './questions'

describe('questions', () => {
  describe('getQuestionFileIdFromFileName', () => {
    it('removes file extension', () => {
      expect(getQuestionFileIdFromFileName('questions.csv')).toBe('questionscsv')
    })

    it('removes special characters', () => {
      expect(getQuestionFileIdFromFileName('my-questions_v2.csv')).toBe('myquestionsv2csv')
    })

    it('removes spaces and dots', () => {
      expect(getQuestionFileIdFromFileName('my questions.v2.csv')).toBe('myquestionsv2csv')
    })

    it('handles empty string', () => {
      expect(getQuestionFileIdFromFileName('')).toBe('')
    })

    it('removes commas', () => {
      expect(getQuestionFileIdFromFileName('q,file.csv')).toBe('qfilecsv')
    })
  })

  describe('createDefaultQuestionFile', () => {
    const mockFile = {
      name: 'test-questions.csv',
      path: '/path/to/test-questions.csv',
    } as File

    it('creates question file with correct properties', () => {
      const qFile = createDefaultQuestionFile(mockFile)

      expect(qFile.id).toBe('test-questions.csv')
      expect(qFile.fileName).toBe('test-questions.csv')
      expect(qFile.path).toBe('/path/to/test-questions.csv')
      expect(qFile.file).toBe(mockFile)
      expect(qFile.isDraft).toBe(false)
    })

    it('creates draft question file when isDraft is true', () => {
      const qFile = createDefaultQuestionFile(mockFile, true)

      expect(qFile.isDraft).toBe(true)
    })

    it('creates non-draft question file by default', () => {
      const qFile = createDefaultQuestionFile(mockFile)

      expect(qFile.isDraft).toBe(false)
    })
  })
})
