import { describe, expect, it } from 'vitest'

import {
  createDefaultImageModel,
  createDefaultModel,
  getModelIdFromFileName,
  isImageModel,
} from './models'

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

  describe('createDefaultImageModel', () => {
    const mockFile = {
      name: 'test-image.png',
      path: '/path/to/test-image.png',
    } as File
    const mockDataUrl = 'data:image/png;base64,abc123'

    it('creates image model with dataUrl and no xml', () => {
      const model = createDefaultImageModel(mockFile, mockDataUrl)

      expect(model.id).toBe('testimagepng')
      expect(model.fileName).toBe('test-image.png')
      expect(model.dataUrl).toBe(mockDataUrl)
      expect(model.xml).toBeUndefined()
      expect(model.file).toBe(mockFile)
      expect(model.isDraft).toBe(false)
    })

    it('creates draft image model when isDraft is true', () => {
      const model = createDefaultImageModel(mockFile, mockDataUrl, true)

      expect(model.isDraft).toBe(true)
    })
  })

  describe('isImageModel', () => {
    it('returns true for model with dataUrl', () => {
      const model = createDefaultImageModel(
        { name: 'x.png' } as File,
        'data:image/png;base64,x',
      )
      expect(isImageModel(model)).toBe(true)
    })

    it('returns false for model with xml only', () => {
      const model = createDefaultModel({ name: 'a.bpmn' } as File)
      model.xml = '<xml/>'
      expect(isImageModel(model)).toBe(false)
    })
  })
})
