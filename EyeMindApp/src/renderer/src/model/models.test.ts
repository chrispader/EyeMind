import { describe, expect, it } from 'vitest'

import { createDefaultModel, getModelIdFromFileName } from './models'

describe('models', () => {
  describe('getModelIdFromFileName', () => {
    it('removes file extension', () => {
      expect(getModelIdFromFileName('process.bpmn')).toBe('processbpmn')
    })

    it('removes special characters', () => {
      expect(getModelIdFromFileName('my-model_v2.bpmn')).toBe('mymodelv2bpmn')
    })

    it('removes spaces and dots', () => {
      expect(getModelIdFromFileName('my model.v2.bpmn')).toBe('mymodelv2bpmn')
    })

    it('handles empty string', () => {
      expect(getModelIdFromFileName('')).toBe('')
    })

    it('removes commas', () => {
      expect(getModelIdFromFileName('model,name.bpmn')).toBe('modelnamebpmn')
    })
  })

  describe('createDefaultModel', () => {
    const mockFile = {
      name: 'test-model.bpmn',
      path: '/path/to/test-model.bpmn',
    } as File

    it('creates model with correct properties', () => {
      const model = createDefaultModel(mockFile)

      expect(model.id).toBe('test-model.bpmn')
      expect(model.fileName).toBe('test-model.bpmn')
      expect(model.path).toBe('/path/to/test-model.bpmn')
      expect(model.file).toBe(mockFile)
      expect(model.isDraft).toBe(false)
    })

    it('creates draft model when isDraft is true', () => {
      const model = createDefaultModel(mockFile, true)

      expect(model.isDraft).toBe(true)
    })

    it('creates non-draft model by default', () => {
      const model = createDefaultModel(mockFile)

      expect(model.isDraft).toBe(false)
    })
  })
})
