import React from 'react'
import { FormRow } from './FormRow'

export interface SelectOption {
  value: string
  label: string
  id?: string
  className?: string
  dataAttributes?: Record<string, string>
}

interface SelectFieldProps {
  label: string
  id: string
  options?: SelectOption[]
  multiple?: boolean
  defaultValue?: string
  className?: string
  children?: React.ReactNode
}

export function SelectField({
  label,
  id,
  options,
  multiple,
  defaultValue,
  className,
  children,
}: SelectFieldProps): React.ReactElement {
  const selectClassName = className ?? (multiple ? 'form-select-multiple' : 'form-select')

  return (
    <FormRow label={label}>
      <select className={selectClassName} id={id} multiple={multiple} defaultValue={defaultValue}>
        {children ??
          options?.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              id={opt.id}
              className={opt.className}
              {...Object.fromEntries(
                Object.entries(opt.dataAttributes ?? {}).map(([k, v]) => [`data-${k}`, v])
              )}>
              {opt.label}
            </option>
          ))}
      </select>
    </FormRow>
  )
}
