import { Outlet, useLocation } from 'react-router'
import { HeaderBar } from '@/app/client/components/HeaderBar'

export function ConfigPagesWrapper(): React.ReactElement {
  const location = useLocation()
  const isRoot = location.pathname === '/'

  return (
    <div className="flex-container-vertical">
      <HeaderBar title="EyeMind" showBackButton={!isRoot} />
      <Outlet />
    </div>
  )
}
