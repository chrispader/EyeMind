import { createFileRoute } from '@tanstack/react-router'

import ConfigLinkButton from '@/renderer/components/ConfigLinkButton'
import { containerClasses } from '@/renderer/css/styles'

import { Route as analysisRoute } from './analysis'
import { Route as eyeTrackingPageRoute } from './config/eye-tracking'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage(): React.ReactElement {
  return (
    <div id='home' className={`${containerClasses} button-gaps`}>
      <ConfigLinkButton to={eyeTrackingPageRoute.to} configClass='eye-tracking'>
        Eye-tracking
      </ConfigLinkButton>
      <ConfigLinkButton to={analysisRoute.to} configClass='analysis'>
        Analysis
      </ConfigLinkButton>
    </div>
  )
}
