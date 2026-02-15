import React from 'react'

interface FormRowProps {
  label: string
  children: React.ReactNode
}

export function FormRow({ label, children }: FormRowProps): React.ReactElement {
  return (
    <div className='flex min-h-[60px] flex-row items-center gap-4'>
      <div className='min-w-[120px] shrink-0'>
        <span className='text-[15px]'>{label}</span>
      </div>
      <div className='flex min-h-[60px] flex-1 items-center'>{children}</div>
    </div>
  )
}
