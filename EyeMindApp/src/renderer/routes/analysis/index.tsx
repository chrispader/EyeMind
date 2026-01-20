import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/analysis/')({
  component: AnalysisPage,
})

function AnalysisPage(): React.ReactElement {
  return (
    <div className='main-view' id='main-view'>
      <div className='row'>
        <Link to='/eye-tracking' id='eye-tracking' className='btn eye-tracking'>
          Eye-tracking
        </Link>
        <Link to='/analysis' id='analysis' className='btn analysis'>
          Analysis
        </Link>
      </div>
    </div>
  )
}
