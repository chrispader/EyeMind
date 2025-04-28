import { useEffect } from 'react'
import FileImport from '@/app/client/components/FileImport'
import { useStateStore } from '@/app/client/state/state'

export function EyeTrackingLoadSessionPage(): React.ReactElement {
  const { setState } = useStateStore.getState()

  // TODO: Remove once state is split up
  useEffect(() => {
    setState({
      importMode: 'single',
      expectedArtifact: 'session',
      expectedExtensions: ['json'],
    })
  }, [setState])

  return (
    <FileImport
      mode="data-collection"
      importMode="single"
      expectedArtifact="session"
      expectedExtensions={['json']}
      uploadLabel="Drop a session file"
    />
  )
}
