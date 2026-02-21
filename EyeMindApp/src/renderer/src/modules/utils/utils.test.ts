import { describe, expect, it } from 'vitest'

import { calculateProgress, cancelDefault } from './utils'

describe('utils', () => {
  describe('calculateProgress', () => {
    it('returns 0 for 0 progress', () => {
      expect(calculateProgress(0, 100)).toBe(0)
    })

    it('returns 100 for complete progress', () => {
      expect(calculateProgress(100, 100)).toBe(100)
    })

    it('returns 50 for half progress', () => {
      expect(calculateProgress(50, 100)).toBe(50)
    })

    it('rounds to 2 decimal places', () => {
      expect(calculateProgress(1, 3)).toBe(33.33)
    })

    it('handles small values', () => {
      expect(calculateProgress(1, 1000)).toBe(0.1)
    })

    it('handles progress > max gracefully', () => {
      expect(calculateProgress(150, 100)).toBe(150)
    })
  })

  describe('cancelDefault', () => {
    it('calls preventDefault', () => {
      const mockEvent = {
        preventDefault: () => {},
        stopPropagation: () => {},
      } as Event
      let preventDefaultCalled = false
      mockEvent.preventDefault = () => {
        preventDefaultCalled = true
      }

      cancelDefault(mockEvent)

      expect(preventDefaultCalled).toBe(true)
    })

    it('calls stopPropagation', () => {
      const mockEvent = {
        preventDefault: () => {},
        stopPropagation: () => {},
      } as Event
      let stopPropagationCalled = false
      mockEvent.stopPropagation = () => {
        stopPropagationCalled = true
      }

      cancelDefault(mockEvent)

      expect(stopPropagationCalled).toBe(true)
    })
  })
})
