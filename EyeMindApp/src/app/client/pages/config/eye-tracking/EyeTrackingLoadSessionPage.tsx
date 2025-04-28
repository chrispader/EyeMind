import { useEffect } from 'react'
import FileImport from '@/app/client/components/FileImport'
import { containerClasses } from '@/app/client/css/styles'
import { useStateStore } from '@/app/client/state/state'

export function EyeTrackingLoadSessionPage(): React.ReactElement {
  const { setState } = useStateStore.getState()

  // TODO: Remove once state is split up
  useEffect(() => {
    setState({
      importMode: 'single',
      temp: { expectedArtifact: 'session', expectedExtensions: ['json'] },
    })
  }, [])

  return (
    <div className={containerClasses}>
      <FileImport
        importMode="single"
        expectedArtifact="session"
        expectedExtensions={['json']}
        uploadLabel="Drop a session file"
      />
    </div>
  )
}
