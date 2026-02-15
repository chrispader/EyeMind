import { useCallback } from 'react'
import toast from 'react-hot-toast'

export type ToastType = 'error' | 'success' | 'info'

const DURATION_SHORT_MS = 3000
const DURATION_LONG_MS = 6000

export type ToastOptions = {
  message: string
  type: ToastType
  duration?: 'short' | 'long'
  permanent?: boolean
}

/**
 * Hook that exposes a toast API aligned with react-hot-toast.
 * Use for error/success/info with optional short/long duration or permanent (close button).
 */
export function useToast() {
  const showToast = useCallback((options: ToastOptions) => {
    const { message, type, duration: durationPreset, permanent } = options
    const durationMs =
      permanent === true
        ? Infinity
        : durationPreset === 'long'
          ? DURATION_LONG_MS
          : DURATION_SHORT_MS
    const opts = { duration: durationMs }

    if (type === 'success') {
      return toast.success(message, opts)
    }
    if (type === 'error') {
      return toast.error(message, opts)
    }
    return toast(message, { ...opts, icon: 'ℹ️' })
  }, [])

  const dismiss = useCallback((toastId?: string) => {
    toast.dismiss(toastId)
  }, [])

  return { toast: showToast, dismiss }
}
