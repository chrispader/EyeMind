import LANG from '@renderer/LANG'
import ConfigLinkButton from '@renderer/components/ConfigLinkButton'
import { containerClasses } from '@renderer/css/styles'
import { createFileRoute } from '@tanstack/react-router'

import { Route as loadSessionRoute } from './load-session'
import { Route as newSessionRoute } from './new-session'

export const Route = createFileRoute('/config/eye-tracking/')({
  component: EyeTrackingPage,
})

function EyeTrackingPage(): React.ReactElement {
  return (
    <div
      className={`${containerClasses} button-gaps`}
      id='data-collection-session-options-view'>
      <ConfigLinkButton to={newSessionRoute.to} configClass='new-session'>
        {LANG.newSession}
      </ConfigLinkButton>
      <ConfigLinkButton to={loadSessionRoute.to} configClass='load-session'>
        {LANG.loadSession}
      </ConfigLinkButton>
    </div>
  )
}
