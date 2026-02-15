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
  /** When true, input is marked invalid for accessibility and styling. */
  invalid?: boolean
  /** Validation error message shown below the input. */
  error?: string
}

const inputBaseClassName =
  'box-border inline-block w-full rounded-sm border px-5 py-3 my-2'

export function InputField({
  label,
  id,
  type = 'text',
  defaultValue,
  suffix,
  required = false,
  invalid = false,
  error,
  ...rest
}: InputFieldProps): React.ReactElement {
  return (
    <FormRow label={label} required={required} invalid={invalid} error={error}>
      <>
        <input
          className={`${inputBaseClassName} ${invalid ? 'border-red-500' : 'border-border'}`}
          id={id}
          type={type}
          defaultValue={defaultValue}
          aria-required={required}
          aria-invalid={invalid}
          {...rest}
        />
        {suffix != null && suffix !== '' && ` ${suffix}`}
      </>
    </FormRow>
  )
}
