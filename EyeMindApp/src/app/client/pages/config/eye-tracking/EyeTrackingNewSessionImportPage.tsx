import { useCallback, useEffect } from 'react'
import FileImport from '@/app/client/components/FileImport'
import { useStateStore } from '@/app/client/modules/dataModels/state'
import { importQuestionsInteraction } from '@/app/client/modules/ui/data-collection'
import { areModelsCorrectlyGrouped } from '@/app/client/modules/ui/files-setup'
import { errorAlert } from '@/app/client/modules/utils/utils'

export function EyeTrackingNewSessionImportPage(): React.ReactElement {
  const { state, setState } = useStateStore((state) => state)

  useEffect(() => {
    setState({ ...state, importMode: 'multiple' })
    setState({ ...state, temp: { ...state.temp, expectedArtifact: 'models' } })
    setState({ ...state, temp: { ...state.temp, expectedExtensions: ['bpmn', 'odm'] } })
  }, [])

  const processFiles = useCallback(() => {
    // check models grouping
    const modelsCorrectlyGrouped = areModelsCorrectlyGrouped()
    if (!modelsCorrectlyGrouped['success']) {
      const msg = modelsCorrectlyGrouped['msg']
      errorAlert(msg)
      console.error(msg)
      return false
    }

    // check if at least one model was imported
    if ((Object.keys(state.models).length === 0) == 0) {
      importQuestionsInteraction()
    } else {
      const msg = 'No models to load'
      errorAlert(msg)
      console.error(msg)
      return false
    }
  }, [])

  return <FileImport uploadLabel="Drop models files" onProcessFiles={processFiles} />
}
