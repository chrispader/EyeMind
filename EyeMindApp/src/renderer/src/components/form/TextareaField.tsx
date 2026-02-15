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
}

const textareaClassName =
  'box-border inline-block w-full rounded-sm border border-border px-5 py-3 my-2 resize-y'

export function TextareaField({
  label,
  id,
  rows = 4,
  cols = 25,
  defaultValue,
  required = false,
  ...rest
}: TextareaFieldProps): React.ReactElement {
  return (
    <FormRow label={label} required={required}>
      <textarea
        className={textareaClassName}
        id={id}
        rows={rows}
        cols={cols}
        defaultValue={defaultValue}
        aria-required={required}
        {...rest}
      />
    </FormRow>
  )
}
