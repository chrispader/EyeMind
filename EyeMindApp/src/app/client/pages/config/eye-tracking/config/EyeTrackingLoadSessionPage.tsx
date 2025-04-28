import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { ROUTES } from '@/app/client/ROUTES'
import FileImport from '@/app/client/components/FileImport'
import { loadFiles } from '@/app/client/components/FileImport/loadFile'
import { errorAlert } from '@/app/client/modules/utils/utils'
import { useStateStore } from '@/app/client/state/state'

export function EyeTrackingLoadSessionPage(): React.ReactElement {
  const { setState } = useStateStore.getState()
  const navigate = useNavigate()

  // TODO: Remove once state is split up
  useEffect(() => {
    setState({
      importMode: 'single',
      expectedArtifact: 'session',
      expectedExtensions: ['json'],
    })
  }, [setState])

  return (
    <FileImport
      mode="data-collection"
      importMode="single"
      expectedArtifact="session"
      expectedExtensions={['json']}
      uploadLabel="Drop a session file"
      onDrop={(files, config) => {
        if (files.length > 1) {
          const msg = 'only a single file can be imported' // check third argument
          console.error(msg)
          errorAlert(msg)
          return
        }

        loadFiles(files, config)
      }}
      onLoad={() => {
        navigate(ROUTES.EYE_TRACKING_EXPERIMENT)
      }}
    />
  )
}
