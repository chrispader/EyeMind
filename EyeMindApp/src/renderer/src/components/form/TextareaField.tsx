import React from 'react'

import { FormRow } from './FormRow'

interface TextareaFieldProps
  extends Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    'id' | 'rows' | 'cols' | 'defaultValue'
  > {
  label: string
  id: string
  rows?: number
  cols?: number
  defaultValue?: string
  /** When true, label shows " *" and the field is treated as required for validation. */
  required?: boolean
  /** When true, textarea is marked invalid for accessibility and styling. */
  invalid?: boolean
  /** Validation error message shown below the textarea. */
  error?: string
}

const textareaBaseClassName =
  'box-border inline-block w-full rounded-sm border px-5 py-3 my-2 resize-y'

export function TextareaField({
  label,
  id,
  rows = 4,
  cols = 25,
  defaultValue,
  required = false,
  invalid = false,
  error,
  ...rest
}: TextareaFieldProps): React.ReactElement {
  return (
    <FormRow label={label} required={required} invalid={invalid} error={error}>
      <textarea
        className={`${textareaBaseClassName} ${invalid ? 'border-red-500' : 'border-border'}`}
        id={id}
        rows={rows}
        cols={cols}
        defaultValue={defaultValue}
        aria-required={required}
        aria-invalid={invalid}
        {...rest}
      />
    </FormRow>
  )
}
