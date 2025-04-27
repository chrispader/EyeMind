import { useCallback } from 'react'
import { useStateStore } from '@/app/client/modules/dataModels/state'
import { importQuestionsInteraction } from '@/app/client/modules/ui/data-collection'
import { areModelsCorrectlyGrouped } from '@/app/client/modules/ui/files-setup'
import { errorAlert } from '@/app/client/modules/utils/utils'

export function useProcessFiles() {
  const { state } = useStateStore((state) => state)

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
    if (Object.keys(state?.models ?? {}).length > 0) {
      importQuestionsInteraction()
      return true
    } else {
      const msg = 'No models to load'
      errorAlert(msg)
      console.error(msg)
      return false
    }
  }, [])

  return processFiles
}
