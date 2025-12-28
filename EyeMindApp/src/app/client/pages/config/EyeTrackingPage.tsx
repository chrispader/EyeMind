import { useEffect } from 'react'
import ConfigLinkButton from '@/app/client/components/ConfigLinkButton'
import { containerClasses } from '@/app/client/css/styles'
import { ROUTES_NAMES } from '@/app/client/routes'
import { useGlobalStore } from '@/app/client/state/state'

export function EyeTrackingPage(): React.ReactElement {
  const { setState } = useGlobalStore()

  // useEffect(() => {
  //   setState({ mode: 'data-collection' })
  // }, [])

  return (
    <div
      className={`${containerClasses} button-gaps`}
      id='data-collection-session-options-view'>
      <ConfigLinkButton
        to={ROUTES_NAMES.EYE_TRACKING_NEW_SESSION}
        configClass='new-session'>
        New session
      </ConfigLinkButton>
      <ConfigLinkButton
        to={ROUTES_NAMES.EYE_TRACKING_LOAD_SESSION}
        configClass='load-session'>
        Load session
      </ConfigLinkButton>
    </div>
  )
}
