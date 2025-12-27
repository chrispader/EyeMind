import ConfigLinkButton from '@/app/client/components/ConfigLinkButton'
import { containerClasses } from '@/app/client/css/styles'
import { ROUTES } from '../ROUTES'

export function HomePage(): React.ReactElement {
  return (
    <div id='home' className={`${containerClasses} button-gaps`}>
      <ConfigLinkButton to={ROUTES.EYE_TRACKING} configClass='eye-tracking'>
        Eye-tracking
      </ConfigLinkButton>
      <ConfigLinkButton to={ROUTES.ANALYSIS} configClass='analysis'>
        Analysis
      </ConfigLinkButton>
    </div>
  )
}
