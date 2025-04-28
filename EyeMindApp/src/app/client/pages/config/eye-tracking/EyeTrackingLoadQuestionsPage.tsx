import { useEffect } from 'react'
import FileImport from '@/app/client/components/FileImport'
import { useStateStore } from '@/app/client/state/state'

export function EyeTrackingLoadQuestionsPage(): React.ReactElement {
  const { setState } = useStateStore.getState()

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
    />
  )
}
