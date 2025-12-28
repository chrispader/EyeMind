import ConfigLinkButton from '@/renderer/components/ConfigLinkButton'
import { containerClasses } from '@/renderer/css/styles'

export function HomePage(): React.ReactElement {
  return (
    <div id='home' className={`${containerClasses} button-gaps`}>
      <ConfigLinkButton to={} configClass='eye-tracking'>
        Eye-tracking
      </ConfigLinkButton>
      <ConfigLinkButton to={ROUTES_NAMES.ANALYSIS} configClass='analysis'>
        Analysis
      </ConfigLinkButton>
    </div>
  )
}
