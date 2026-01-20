import { HeaderBar } from '@renderer/components/HeaderBar'
import { Outlet, useLocation } from '@tanstack/react-router'

export function ConfigPagesWrapper(): React.ReactElement {
  const location = useLocation()
  const isRoot = location.pathname === '/'

  return (
    <div className='flex-container-vertical'>
      <HeaderBar title='EyeMind' showBackButton={!isRoot} />
      <Outlet />
    </div>
  )
}
