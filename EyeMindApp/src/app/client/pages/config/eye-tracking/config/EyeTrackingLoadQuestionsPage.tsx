import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { ROUTES } from '@/app/client/ROUTES'
import FileImport from '@/app/client/components/FileImport'
import { useStateStore } from '@/app/client/state/state'

export function EyeTrackingLoadQuestionsPage(): React.ReactElement {
  const { setState } = useStateStore.getState()
  const navigate = useNavigate()
  // TODO: Remove once state is split up
  useEffect(() => {
    setState({
      importMode: 'single',
      expectedArtifact: 'questions',
      expectedExtensions: ['csv'],
    })
  }, [setState])

  return (
    <FileImport
      mode="data-collection"
      importMode="single"
      expectedArtifact="questions"
      expectedExtensions={['csv']}
      uploadLabel="Drop a questions csv file"
      onFilesLoaded={() => {
        navigate(ROUTES.EYE_TRACKING_EXPERIMENT)
      }}
    />
  )
}
