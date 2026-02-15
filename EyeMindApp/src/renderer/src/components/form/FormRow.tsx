import React from 'react'

interface FormRowProps {
  label: string
  children: React.ReactNode
}

export function FormRow({ label, children }: FormRowProps): React.ReactElement {
  return (
    <div className='row'>
      <div className='column'>
        <span className='text'>{label}</span>
      </div>
      <div className='column'>{children}</div>
    </div>
  )
}
