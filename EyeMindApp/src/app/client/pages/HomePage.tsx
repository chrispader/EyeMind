import ConfigLinkButton from '@/app/client/components/ConfigLinkButton'
import { containerClasses } from '@/app/client/css/styles'

export function HomePage(): React.ReactElement {
  return (
    <div id="home" className={`${containerClasses} button-gaps`}>
      <ConfigLinkButton to="/eye-tracking" configClass="eye-tracking">
        Eye-tracking
      </ConfigLinkButton>
      <ConfigLinkButton to="/analysis" configClass="analysis">
        Analysis
      </ConfigLinkButton>
    </div>
  )
}
