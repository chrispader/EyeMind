import { useEffect } from 'react'
import FileImport from '@/app/client/components/FileImport'
import { useProcessFiles } from '@/app/client/hooks/useProcessFiles'
import { useStateStore } from '@/app/client/modules/dataModels/state'

export function EyeTrackingNewSessionImportPage(): React.ReactElement {
  const { setState } = useStateStore((state) => state)
  const processFiles = useProcessFiles()

  useEffect(() => {
    setState({
      importMode: 'multiple',
      temp: {
        expectedArtifact: 'models',
        expectedExtensions: ['bpmn', 'odm'],
      },
    })
  }, [])

  return <FileImport uploadLabel="Drop models files" onProcessFiles={processFiles} />
}
