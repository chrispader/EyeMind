import React from 'react'

interface FormRowProps {
  label: string
  children: React.ReactNode
}

// Renders two cells (label + control) so a parent grid can align all inputs.
// Parent should use e.g. grid-cols-[auto_1fr] to control input column width.
export function FormRow({ label, children }: FormRowProps): React.ReactElement {
  return (
    <>
      <div className='flex min-h-[60px] items-center text-[15px]'>{label}</div>
      <div className='flex min-h-[60px] items-center'>{children}</div>
    </>
  )
}
