import React from 'react'

interface FormRowProps {
  label: string
  children: React.ReactNode
  /** When true, appends " *" to the label to indicate a required field. */
  invalid?: boolean
  /** Validation error message shown below the control. */
  error?: string
}

// Renders two cells (label + control) so a parent grid can align all inputs.
// Parent should use e.g. grid-cols-[auto_1fr] to control input column width.
export function FormRow({
  label,
  children,
  invalid = false,
  error,
}: FormRowProps): React.ReactElement {
  return (
    <>
      <div className='flex min-h-[60px] items-center text-[15px]'>{label}</div>
      <div
        className='flex min-h-[60px] flex-col justify-center'
        data-invalid={invalid || undefined}>
        {children}
        {error != null && error !== '' && (
          <span className='mt-1 text-sm text-red-600' role='alert'>
            {error}
          </span>
        )}
      </div>
    </>
  )
}
