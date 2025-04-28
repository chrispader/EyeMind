import { useEffect } from 'react'
import { ROUTES } from '@/app/client/ROUTES'
import ConfigLinkButton from '@/app/client/components/ConfigLinkButton'
import { containerClasses } from '@/app/client/css/styles'
import { useStateStore } from '@/app/client/state/state'

export function EyeTrackingPage(): React.ReactElement {
  const { setState } = useStateStore()

  useEffect(() => {
    setState({ mode: 'data-collection' })
  }, [])

  return (
    <div
      className={`${containerClasses} button-gaps`}
      id="data-collection-session-options-view">
      <ConfigLinkButton to={ROUTES.EYE_TRACKING_NEW_SESSION} configClass="new-session">
        New session
      </ConfigLinkButton>
      <ConfigLinkButton to={ROUTES.EYE_TRACKING_LOAD_SESSION} configClass="load-session">
        Load session
      </ConfigLinkButton>
    </div>
  )
}
