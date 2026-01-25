import { describe, expect, it } from 'vitest'

import { createDefaultImageFile, getImageIdFromFileName, isImageFile } from './images'

describe('images', () => {
  describe('getImageIdFromFileName', () => {
    it('removes file extension', () => {
      expect(getImageIdFromFileName('photo.png')).toBe('photopng')
    })

    it('removes special characters', () => {
      expect(getImageIdFromFileName('my-image_v2.jpg')).toBe('myimagev2jpg')
    })

    it('removes spaces and dots', () => {
      expect(getImageIdFromFileName('my image.v2.png')).toBe('myimagev2png')
    })

    it('handles empty string', () => {
      expect(getImageIdFromFileName('')).toBe('')
    })

    it('removes underscores', () => {
      expect(getImageIdFromFileName('image_name.jpeg')).toBe('imagenamejpeg')
    })
  })

  describe('isImageFile', () => {
    it('returns true for .png files', () => {
      expect(isImageFile({ name: 'photo.png' } as File)).toBe(true)
    })

    it('returns true for .jpg files', () => {
      expect(isImageFile({ name: 'photo.jpg' } as File)).toBe(true)
    })

    it('returns true for .jpeg files', () => {
      expect(isImageFile({ name: 'photo.jpeg' } as File)).toBe(true)
    })

    it('returns true for .gif files', () => {
      expect(isImageFile({ name: 'animation.gif' } as File)).toBe(true)
    })

    it('returns true for .webp files', () => {
      expect(isImageFile({ name: 'modern.webp' } as File)).toBe(true)
    })

    it('returns true for uppercase extensions', () => {
      expect(isImageFile({ name: 'photo.PNG' } as File)).toBe(true)
      expect(isImageFile({ name: 'photo.JPG' } as File)).toBe(true)
    })

    it('returns false for non-image files', () => {
      expect(isImageFile({ name: 'document.pdf' } as File)).toBe(false)
      expect(isImageFile({ name: 'data.csv' } as File)).toBe(false)
      expect(isImageFile({ name: 'model.bpmn' } as File)).toBe(false)
    })

    it('returns false for files without extension', () => {
      expect(isImageFile({ name: 'noextension' } as File)).toBe(false)
    })
  })

  describe('createDefaultImageFile', () => {
    const mockFile = {
      name: 'test-image.png',
      path: '/path/to/test-image.png',
    } as File
    const mockDataUrl = 'data:image/png;base64,abc123'

    it('creates image file with correct properties', () => {
      const imgFile = createDefaultImageFile(mockFile, mockDataUrl)

      expect(imgFile.id).toBe('testimagepng')
      expect(imgFile.fileName).toBe('test-image.png')
      expect(imgFile.path).toBe('/path/to/test-image.png')
      expect(imgFile.dataUrl).toBe(mockDataUrl)
      expect(imgFile.file).toBe(mockFile)
      expect(imgFile.isDraft).toBe(false)
    })

    it('creates draft image file when isDraft is true', () => {
      const imgFile = createDefaultImageFile(mockFile, mockDataUrl, true)

      expect(imgFile.isDraft).toBe(true)
    })

    it('creates non-draft image file by default', () => {
      const imgFile = createDefaultImageFile(mockFile, mockDataUrl)

      expect(imgFile.isDraft).toBe(false)
    })

    it('uses sanitized filename as id', () => {
      const fileWithSpecialChars = {
        name: 'my-special_image.v2.png',
        path: '/path/to/image.png',
      } as File

      const imgFile = createDefaultImageFile(fileWithSpecialChars, mockDataUrl)

      expect(imgFile.id).toBe('myspecialimagev2png')
    })
  })
})
