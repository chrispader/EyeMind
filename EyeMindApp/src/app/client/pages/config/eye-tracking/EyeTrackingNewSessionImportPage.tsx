import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { ROUTES } from '@/app/client/ROUTES'
import FileImport from '@/app/client/components/FileImport'
import { useStateStore } from '@/app/client/state/state'

export function EyeTrackingNewSessionImportPage(): React.ReactElement {
  const { setState } = useStateStore.getState()
  const navigate = useNavigate()

  // TODO: Remove once state is split up
  useEffect(() => {
    setState({
      importMode: 'multiple',
      expectedArtifact: 'models',
      expectedExtensions: ['bpmn', 'odm'],
    })
  }, [setState])

  return (
    <FileImport
      mode="data-collection"
      importMode="multiple"
      expectedArtifact="models"
      expectedExtensions={['bpmn', 'odm']}
      uploadLabel="Drop models files"
      onFilesLoaded={() => {
        navigate(ROUTES.EYE_TRACKING_LOAD_QUESTIONS)
      }}
    />
  )
}
