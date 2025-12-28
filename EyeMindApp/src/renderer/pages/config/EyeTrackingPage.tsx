import { useEffect } from 'react'
import ConfigLinkButton from '@/renderer/components/ConfigLinkButton'
import { containerClasses } from '@/renderer/css/styles'
import { ROUTES_NAMES } from '@/renderer/routes'
import { useGlobalStore } from '@/renderer/state/global'

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
