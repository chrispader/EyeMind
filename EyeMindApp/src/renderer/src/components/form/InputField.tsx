import React from 'react'

import { FormRow } from './FormRow'

interface InputFieldProps {
  label: string
  id: string
  type?: 'text' | 'number'
  defaultValue?: string
  suffix?: string
}

const inputClassName =
  'box-border inline-block w-full rounded-sm border border-border px-5 py-3 my-2'

export function InputField({
  label,
  id,
  type = 'text',
  defaultValue,
  suffix,
}: InputFieldProps): React.ReactElement {
  return (
    <FormRow label={label}>
      <>
        <input
          className={inputClassName}
          id={id}
          type={type}
          defaultValue={defaultValue}
        />
        {suffix != null && suffix !== '' && ` ${suffix}`}
      </>
    </FormRow>
  )
}
