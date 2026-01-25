import React from 'react'
import { FormRow } from './FormRow'

interface InputFieldProps {
  label: string
  id: string
  type?: 'text' | 'number'
  defaultValue?: string
  suffix?: string
}

export function InputField({
  label,
  id,
  type = 'text',
  defaultValue,
  suffix,
}: InputFieldProps): React.ReactElement {
  return (
    <FormRow label={label}>
      <input className="form-input" id={id} type={type} defaultValue={defaultValue} />
      {suffix && ` ${suffix}`}
    </FormRow>
  )
}
