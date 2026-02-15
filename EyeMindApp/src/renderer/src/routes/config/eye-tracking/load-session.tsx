import LANG from '@renderer/LANG'
import FileImport from '@renderer/components/FileImport'
import { loadFiles } from '@renderer/components/FileImport/loadFile'
import type { FileImportConfig } from '@renderer/components/FileImport/types'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import toast from 'react-hot-toast'
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
  const [sessionFile, setSessionFile] = useState<File | null>(null)

  return (
    <FileImport
      items={sessionFile != null ? [sessionFile] : []}
      errors={[]}
      onDismissError={() => {}}
      uploadLabel={LANG.dropSessionFile}
      onDrop={(files) => {
        if (files.length > 1) {
          toast.error(LANG.errorSingleFileOnly, { duration: 3000 })
          return
        }

        const file = files[0]
        if (file) {
          setSessionFile(file)
        }
      }}
      onSubmit={() => {
        if (sessionFile != null) {
          loadFiles([sessionFile], fileImportConfig)
          navigate({ to: experimentRoute.to })
        }
      }}
    />
  )
}
