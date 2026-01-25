import ConfigLinkButton from '@renderer/components/ConfigLinkButton'
import { containerClasses } from '@renderer/css/styles'
import { createFileRoute } from '@tanstack/react-router'

import { Route as homeRoute } from '../index'

export const Route = createFileRoute('/analysis/')({
  component: AnalysisPage,
})

function AnalysisPage(): React.ReactElement {
  return (
    <div id='analysis-view' className={`${containerClasses} button-gaps`}>
      <ConfigLinkButton to={homeRoute.to} configClass='analysis'>
        Back to Home
      </ConfigLinkButton>
    </div>
  )
}
