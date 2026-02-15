import React from 'react'

import { FormRow } from './FormRow'

interface InputFieldProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'id' | 'type' | 'defaultValue'
  > {
  label: string
  id: string
  type?: 'text' | 'number'
  defaultValue?: string
  suffix?: string
  /** When true, label shows " *" and the field is treated as required for validation. */
  required?: boolean
}

const inputClassName =
  'box-border inline-block w-full rounded-sm border border-border px-5 py-3 my-2'

export function InputField({
  label,
  id,
  type = 'text',
  defaultValue,
  suffix,
  required = false,
  ...rest
}: InputFieldProps): React.ReactElement {
  return (
    <FormRow label={label} required={required}>
      <>
        <input
          className={inputClassName}
          id={id}
          type={type}
          defaultValue={defaultValue}
          aria-required={required}
          {...rest}
        />
        {suffix != null && suffix !== '' && ` ${suffix}`}
      </>
    </FormRow>
  )
}
