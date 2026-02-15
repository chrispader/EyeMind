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
}

export function ModalContainer({
  id,
  className = '',
  title,
  closeId,
  children,
  visible = true,
}: ModalContainerProps): React.ReactElement {
  if (!visible) {
    return <div id={id} className='hidden' aria-hidden />
  }

  return (
    <div
      id={id}
      className={`fixed inset-0 z-20 flex items-center justify-center overflow-auto bg-overlay ${className}`.trim()}>
      <div
        className='content relative max-h-[90vh] max-w-[550px] w-full overflow-auto rounded border border-border-muted bg-modal-bg p-5 shadow-lg'
        onClick={(e) => e.stopPropagation()}>
        <span
          id={closeId}
          className='float-right cursor-pointer text-2xl font-bold text-border-strong hover:text-black focus:text-black'
          role='button'
          tabIndex={0}
          aria-label={LANG.close}>
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
