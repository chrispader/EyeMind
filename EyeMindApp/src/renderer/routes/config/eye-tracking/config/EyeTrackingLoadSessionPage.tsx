import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import FileImport from '@/renderer/components/FileImport'
import { loadFiles } from '@/renderer/components/FileImport/loadFile'
import { errorAlert } from '@/renderer/modules/utils/utils'
import { ROUTES_NAMES } from '@/renderer/routes'
import { useGlobalStore } from '@/renderer/state/global'

export function EyeTrackingLoadSessionPage(): React.ReactElement {
  const { setState } = useGlobalStore.getState()
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
      mode='data-collection'
      importMode='single'
      expectedArtifact='session'
      expectedExtensions={['json']}
      uploadLabel='Drop a session file'
      onDrop={(files, config) => {
        if (files.length > 1) {
          const msg = 'only a single file can be imported' // check third argument
          console.error(msg)
          errorAlert(msg)
          return
        }

        loadFiles(files, config)
      }}
      onSubmit={() => {
        navigate(ROUTES_NAMES.EYE_TRACKING_EXPERIMENT)
      }}
    />
  )
}
