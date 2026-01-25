import React from 'react'
import { FormRow } from './FormRow'

interface CheckboxFieldProps {
  label: string
  id: string
  defaultChecked?: boolean
}

export function CheckboxField({
  label,
  id,
  defaultChecked,
}: CheckboxFieldProps): React.ReactElement {
  return (
    <FormRow label={label}>
      <input className="form-check-box" type="checkbox" id={id} defaultChecked={defaultChecked} />
    </FormRow>
  )
}
