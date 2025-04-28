import { useCallback, useState } from 'react'
import {
  areModelsCorrectlyGrouped,
  loadFile,
} from '@/app/client/components/FileImport/loadFile'
import { LoadFileConfig } from '@/app/client/components/FileImport/types'
import { containerClasses } from '@/app/client/css/styles'
import { cancelDefault, errorAlert } from '@/app/client/modules/utils/utils'
import { nFiles, shiftFile } from '@/app/client/state/filesBuffer'
import { setFiles } from '@/app/client/state/filesBuffer'
import { useStateStore } from '@/app/client/state/state'

declare global {
  interface DataTransfer {
    isForTestingPurpose: boolean
  }
}

type FileImportProps = LoadFileConfig & {
  uploadLabel: string
  onFilesLoaded?: () => void
}

function FileImport({
  uploadLabel,
  mode = 'data-collection',
  importMode = 'multiple',
  expectedArtifact,
  expectedExtensions,
  onFilesLoaded,
}: FileImportProps): React.ReactElement {
  const [isActive, setIsActive] = useState(false)
  const [filesInternal, setFilesInternal] = useState<FileList | undefined>(undefined)
  const { models } = useStateStore()

  console.log({ filesInternal })

  const handleDroppedFiles = useCallback(
    async (e: React.DragEvent<HTMLDivElement>) => {
      console.log('onDrop')

      setIsActive(false)

      const config: LoadFileConfig = {
        mode,
        importMode,
        expectedArtifact,
        expectedExtensions,
      }

      // a hack to support the testing of a single file upload using the drag/drop feature as the testing library playwright have an issue with webkitGetAsEntry returning always null
      if (e.dataTransfer.isForTestingPurpose) {
        loadFile(e.dataTransfer.files[0], config)
        return
      }

      cancelDefault(e)

      const files = e.dataTransfer.files
      setFilesInternal(files)
      setFiles(files)

      if (importMode == 'multiple') {
        console.log('multiple files import mode')
        console.log('files', files)

        // traverse first file item
        await loadFile(shiftFile(), config)
        return
      }

      console.log('single file import mode')

      if (nFiles() == 1) {
        await loadFile(shiftFile(), config)
      } else {
        const msg = 'only a single file can be imported' // check third argument
        console.error(msg)
        errorAlert(msg)
      }
    },
    [expectedArtifact, expectedExtensions, importMode, mode],
  )

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
    if (Object.keys(models ?? {}).length > 0) {
      onFilesLoaded?.()
      return true
    } else {
      const msg = 'No models to load'
      errorAlert(msg)
      console.error(msg)
      return false
    }
  }, [models, onFilesLoaded])

  return (
    <div className={`${containerClasses} import-view`} id="import-view">
      <div className="import-box" id="import-box">
        <div
          className={`upload-zone ${isActive ? 'upload-zone-active' : ''}`}
          id="upload-zone"
          onDrop={handleDroppedFiles}
          onDragEnter={() => setIsActive(true)}
          onDragOver={(e) => {
            e.preventDefault()
            e.stopPropagation()

            e.dataTransfer.dropEffect = 'copy'
          }}
          onDragLeave={() => setIsActive(false)}>
          <span id="upload-label" className="upload-label">
            {uploadLabel}
          </span>
          <div className="file-list" id="file-list"></div>
        </div>
        <div className="process-files-btn-container">
          <button
            className="process-files-btn"
            id="process-files"
            disabled={(filesInternal?.length ?? 0) == 0}
            onClick={processFiles}>
            Load files
          </button>
        </div>
      </div>
    </div>
  )
}

export default FileImport
