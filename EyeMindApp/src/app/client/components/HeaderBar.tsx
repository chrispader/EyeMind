import React, { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { Spacer } from '@/app/client/components/Spacer'

interface HeaderBarProps {
  showBackButton?: boolean
  title?: string
}

export function HeaderBar({
  showBackButton = true,
  title,
}: HeaderBarProps): React.ReactElement {
  const navigate = useNavigate()
  const location = useLocation()

  const handleBackClick = useCallback(() => {
    navigate(-1)
  }, [navigate])

  return (
    <div className="header-bar">
      <div className="header-bar-content">
        {showBackButton && (
          <>
            <button
              className="back-button"
              onClick={handleBackClick}
              aria-label="Go back">
              ← Back
            </button>
            <Spacer horizontal={20} />
          </>
        )}
        {title == null ? (
          <Spacer horizontal="stretch" />
        ) : (
          <h1 className="header-title">{title}</h1>
        )}
        <Spacer horizontal={20} />
        <h1 className="header-title">{location.pathname}</h1>
      </div>
    </div>
  )
}
