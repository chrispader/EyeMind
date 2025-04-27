import { useEffect } from 'react'
import FileImport from '@/app/client/components/FileImport'
import { useProcessFiles } from '@/app/client/hooks/useProcessFiles'
import { useStateStore } from '@/app/client/modules/dataModels/state'

export function EyeTrackingNewSessionImportPage(): React.ReactElement {
  const { state, setState } = useStateStore((state) => state)
  const processFiles = useProcessFiles()

  useEffect(() => {
    setState({ ...state, importMode: 'multiple' })
    setState({ ...state, temp: { ...state.temp, expectedArtifact: 'models' } })
    setState({ ...state, temp: { ...state.temp, expectedExtensions: ['bpmn', 'odm'] } })
  }, [])

  return <FileImport uploadLabel="Drop models files" onProcessFiles={processFiles} />
}
