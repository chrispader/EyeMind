import React from 'react'

interface FormRowProps {
  label: string
  children: React.ReactNode
  /** When true, appends " *" to the label to indicate a required field. */
  required?: boolean
}

// Renders two cells (label + control) so a parent grid can align all inputs.
// Parent should use e.g. grid-cols-[auto_1fr] to control input column width.
export function FormRow({
  label,
  children,
  required = false,
}: FormRowProps): React.ReactElement {
  const displayLabel = required ? `${label} *` : label
  return (
    <>
      <div className='flex min-h-[60px] items-center text-[15px]'>{displayLabel}</div>
      <div className='flex min-h-[60px] items-center'>{children}</div>
    </>
  )
}
