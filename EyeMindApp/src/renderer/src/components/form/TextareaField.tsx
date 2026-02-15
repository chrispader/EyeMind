import React from 'react'

import { FormRow } from './FormRow'

interface TextareaFieldProps {
  label: string
  id: string
  rows?: number
  cols?: number
  defaultValue?: string
}

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
        className='form-input'
        id={id}
        rows={rows}
        cols={cols}
        defaultValue={defaultValue}
      />
    </FormRow>
  )
}
