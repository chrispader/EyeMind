import LANG from '@renderer/LANG'
import closeIcon from '@renderer/assets/icons/close.svg'
import React from 'react'

interface ModalContainerProps {
  id: string
  className?: string
  title: string
  closeId: string
  children: React.ReactNode
  visible?: boolean
  /** Called when the user closes the modal (close button or backdrop click). */
  onClose?: () => void
}

export function ModalContainer({
  id,
  className = '',
  title,
  closeId,
  children,
  visible = true,
  onClose,
}: ModalContainerProps): React.ReactElement {
  if (!visible) {
    return <div id={id} className='hidden' aria-hidden />
  }

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return
    onClose?.()
  }

  const handleCloseKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onClose?.()
    }
  }

  return (
    <div
      id={id}
      className={`fixed inset-0 z-20 flex items-center justify-center overflow-auto bg-overlay p-4 ${className}`.trim()}
      onClick={handleBackdropClick}
      role='dialog'
      aria-modal='true'>
      <div
        className='content relative max-h-[calc(100vh-2rem)] max-w-[550px] w-full overflow-auto rounded border border-border-muted bg-modal-bg p-5 shadow-lg sm:min-h-0'
        onClick={(e) => e.stopPropagation()}>
        <span
          id={closeId}
          className='float-right cursor-pointer text-2xl font-bold text-border-strong hover:text-black focus:text-black'
          role='button'
          tabIndex={0}
          aria-label={LANG.close}
          onClick={onClose}
          onKeyDown={handleCloseKeyDown}>
          <img
            className='h-8 w-8 cursor-pointer'
            id='close-icon'
            src={closeIcon}
            alt={LANG.close}
          />
        </span>

        <h2 className='mb-4 mt-2 text-xl font-semibold'>{title}</h2>

        <div className='clear-both'>{children}</div>
      </div>
    </div>
  )
}
