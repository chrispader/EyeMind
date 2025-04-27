import { useEffect } from 'react'
import FileImport from '@/app/client/components/FileImport'
import { containerClasses } from '@/app/client/css/styles'
import { useProcessFiles } from '@/app/client/hooks/useProcessFiles'
import { useStateStore } from '@/app/client/modules/dataModels/state'

export function EyeTrackingLoadSessionPage(): React.ReactElement {
  const { setState } = useStateStore((state) => state)
  const processFiles = useProcessFiles()

  useEffect(() => {
    setState({
      importMode: 'single',
      temp: { expectedArtifact: 'session', expectedExtensions: ['json'] },
    })
  }, [])

  return (
    <div className={containerClasses}>
      <FileImport uploadLabel="Drop a session file" onProcessFiles={processFiles} />
    </div>
  )
}
