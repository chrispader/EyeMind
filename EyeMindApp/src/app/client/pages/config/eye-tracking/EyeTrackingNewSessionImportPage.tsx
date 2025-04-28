import { useEffect } from 'react'
import FileImport from '@/app/client/components/FileImport'
import { containerClasses } from '@/app/client/css/styles'
import { useStateStore } from '@/app/client/state/state'

export function EyeTrackingNewSessionImportPage(): React.ReactElement {
  const { setState } = useStateStore((state) => state)

  // TODO: Remove once state is split up
  useEffect(() => {
    setState({
      importMode: 'multiple',
      temp: {
        expectedArtifact: 'models',
        expectedExtensions: ['bpmn', 'odm'],
      },
    })
  }, [])

  return (
    <div className={containerClasses}>
      <FileImport
        importMode="multiple"
        expectedArtifact="models"
        expectedExtensions={['bpmn', 'odm']}
        uploadLabel="Drop models files"
      />
    </div>
  )
}
