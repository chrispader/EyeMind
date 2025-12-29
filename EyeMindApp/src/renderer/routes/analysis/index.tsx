import { createFileRoute } from '@tanstack/react-router'
import { NavLink } from 'react-router'

export const Route = createFileRoute('/analysis/')({
  component: AnalysisPage,
})

function AnalysisPage(): React.ReactElement {
  return (
    <div className='main-view' id='main-view'>
      <div className='row'>
        <NavLink to='/eye-tracking' id='eye-tracking' className='btn eye-tracking'>
          Eye-tracking
        </NavLink>
        <NavLink to='/analysis' id='analysis' className='btn analysis'>
          Analysis
        </NavLink>
      </div>
    </div>
  )
}
