import React from 'react'

interface SubmitButtonProps {
  id: string
  value: string
  className?: string
}

export function SubmitButton({
  id,
  value,
  className = 'submit-form-button',
}: SubmitButtonProps): React.ReactElement {
  return (
    <div className="row">
      <div style={{ textAlign: 'center' }}>
        <input type="submit" id={id} className={className} value={value} />
      </div>
    </div>
  )
}
