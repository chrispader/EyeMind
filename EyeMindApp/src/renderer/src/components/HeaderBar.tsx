import LANG from '@renderer/LANG'
import { Spacer } from '@renderer/components/Spacer'
import { useCanGoBack, useLocation, useRouter } from '@tanstack/react-router'
import React from 'react'
import { IoArrowBackOutline } from 'react-icons/io5'

interface HeaderBarProps {
  title?: string
}

export function HeaderBar({ title }: HeaderBarProps): React.ReactElement {
  const router = useRouter()
  const canGoBack = useCanGoBack()
  const location = useLocation()
  const isRoot = location.pathname === '/'

  return (
    <div className='header-bar'>
      <div className='header-bar-content'>
        {canGoBack && !isRoot && (
          <>
            <button
              className='back-button'
              onClick={() => router.history.back()}
              aria-label={LANG.goBack}>
              <IoArrowBackOutline />
            </button>
            <Spacer horizontal={20} />
          </>
        )}
        {title == null ? (
          <Spacer horizontal='stretch' />
        ) : (
          <h1 className='header-title'>{title}</h1>
        )}
        <Spacer horizontal={20} />
        <h1 className='header-title'>{location.pathname}</h1>
      </div>
    </div>
  )
}
