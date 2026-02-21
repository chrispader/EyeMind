import { describe, expect, it } from 'vitest'

import { isImageFile } from './images'

describe('images', () => {
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
})
