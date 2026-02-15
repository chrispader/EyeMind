import React from 'react'

import { FormRow } from './FormRow'

interface TextareaFieldProps {
  label: string
  id: string
  rows?: number
  cols?: number
  defaultValue?: string
}

const textareaClassName =
  'box-border inline-block w-full rounded-sm border border-border px-5 py-3 my-2 resize-y'

export function TextareaField({
  label,
  id,
  rows = 4,
  cols = 25,
  defaultValue,
}: TextareaFieldProps): React.ReactElement {
  return (
    <FormRow label={label}>
      <textarea
        className={textareaClassName}
        id={id}
        rows={rows}
        cols={cols}
        defaultValue={defaultValue}
      />
    </FormRow>
  )
}
