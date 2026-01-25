import FileImport from '@renderer/components/FileImport'
import { loadFiles } from '@renderer/components/FileImport/loadFile'
import { FileImportConfig } from '@renderer/components/FileImport/types'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

import { Route as experimentRoute } from '../../experiment'

const fileImportConfig: FileImportConfig = {
  mode: 'data-collection',
  importMode: 'single',
  expectedArtifact: 'session',
  expectedExtensions: ['json'],
}

export const Route = createFileRoute('/config/eye-tracking/load-session')({
  component: EyeTrackingLoadSessionPage,
})

function EyeTrackingLoadSessionPage(): React.ReactElement {
  const navigate = useNavigate()
  const [errors, setErrors] = useState<string[]>([])
  const [sessionFile, setSessionFile] = useState<File | null>(null)

  return (
    <FileImport
      items={sessionFile ? [sessionFile] : []}
      errors={errors}
      onDismissError={(error) => setErrors(errors.filter((e) => e !== error))}
      uploadLabel='Drop a session file'
      onDrop={(files) => {
        if (files.length > 1) {
          setErrors(['Only a single file can be imported'])
          return
        }

        const file = files[0]
        if (file) {
          setSessionFile(file)
        }
      }}
      onSubmit={() => {
        if (sessionFile) {
          loadFiles([sessionFile], fileImportConfig)
          navigate({ to: experimentRoute.to })
        }
      }}
    />
  )
}
