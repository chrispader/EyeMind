import { useEffect } from 'react'
import FileImport from '@/app/client/components/FileImport'
import { containerClasses } from '@/app/client/css/styles'
import { useStateStore } from '@/app/client/modules/dataModels/state'

export function EyeTrackingLoadSessionPage(): React.ReactElement {
  const { state, setState } = useStateStore((state) => state)

  useEffect(() => {
    setState({ ...state, importMode: 'single' })
    setState({ ...state, temp: { ...state.temp, expectedArtifact: 'session' } })
    setState({ ...state, temp: { ...state.temp, expectedExtensions: ['json'] } })
  }, [])

  return (
    <div className={containerClasses}>
      <FileImport uploadLabel="Drop a session file" />
    </div>
  )
}
