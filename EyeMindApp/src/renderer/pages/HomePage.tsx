import ConfigLinkButton from '@/renderer/components/ConfigLinkButton'
import { containerClasses } from '@/renderer/css/styles'
import { ROUTES_NAMES } from '../routes'

export function HomePage(): React.ReactElement {
  return (
    <div id='home' className={`${containerClasses} button-gaps`}>
      <ConfigLinkButton to={ROUTES_NAMES.EYE_TRACKING} configClass='eye-tracking'>
        Eye-tracking
      </ConfigLinkButton>
      <ConfigLinkButton to={ROUTES_NAMES.ANALYSIS} configClass='analysis'>
        Analysis
      </ConfigLinkButton>
    </div>
  )
}
