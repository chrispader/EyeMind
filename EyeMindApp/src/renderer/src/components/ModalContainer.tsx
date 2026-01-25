import LANG from '@renderer/LANG'
import React from 'react'

interface ModalContainerProps {
  id: string
  className: string
  title: string
  closeId: string
  children: React.ReactNode
  visible?: boolean
}

export function ModalContainer({
  id,
  className,
  title,
  closeId,
  children,
  visible = true,
}: ModalContainerProps): React.ReactElement {
  return (
    <div id={id} className={className} style={{ display: visible ? 'flex' : 'none' }}>
      <div className="content">
        <span className="close" id={closeId}>
          <img className="close-icon" id="close-icon" src="icons/close.svg" alt={LANG.close} />
        </span>

        <h2>{title}</h2>

        <div>{children}</div>
      </div>
    </div>
  )
}
