import LANG from '@renderer/LANG'
import { Spacer } from '@renderer/components/Spacer'
import { useCanGoBack, useLocation, useRouter } from '@tanstack/react-router'
import React from 'react'
import { IoArrowBackOutline, IoHomeOutline } from 'react-icons/io5'

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
        {!isRoot && (
          <HeaderBarButton
            label={LANG.goBack}
            icon={<IoHomeOutline />}
            onClick={() => router.history.push('/')}
          />
        )}
        {canGoBack && !isRoot && (
          <>
            <HeaderBarButton
              label={LANG.goBack}
              icon={<IoArrowBackOutline />}
              onClick={() => router.history.back()}
            />
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

type HeaderBarButtonProps = {
  onClick: () => void
  label: string
  icon: React.ReactNode
}

function HeaderBarButton({
  onClick,
  label,
  icon,
}: HeaderBarButtonProps): React.ReactElement {
  return (
    <button
      className='bg-transparent border-none text-[#3a86ff] text-[14px] cursor-pointer px-2.5 py-1.5 rounded transition-colors duration-200 hover:bg-[rgba(58,134,255,0.1)]'
      onClick={onClick}
      aria-label={label}>
      {icon}
    </button>
  )
}
