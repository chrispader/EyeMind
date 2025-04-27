import { useCallback, useState } from 'react'
import { traverseItem } from '@/app/client/components/FileImport/traverseItem'
import { containerClasses } from '@/app/client/css/styles'
import { nFiles, shiftFile } from '@/app/client/modules/dataModels/filesBuffer'
import { setFiles } from '@/app/client/modules/dataModels/filesBuffer'
import { useStateStore } from '@/app/client/modules/dataModels/state'
import { cancelDefault, errorAlert } from '@/app/client/modules/utils/utils'

declare global {
  interface DataTransfer {
    isForTestingPurpose: boolean
  }
}

type FileImportProps = {
  uploadLabel: string
  onProcessFiles?: () => void
}

function FileImport({
  uploadLabel,
  onProcessFiles,
}: FileImportProps): React.ReactElement {
  const { state } = useStateStore((state) => state)

  const [isActive, setIsActive] = useState(false)
  const [filesInternal, setFilesInternal] = useState<FileList | undefined>(undefined)

  console.log({ filesInternal })

  const handleDroppedFiles = useCallback(async (e: React.DragEvent<HTMLDivElement>) => {
    console.log('onDrop')

    setIsActive(false)

    // a hack to support the testing of a single file upload using the drag/drop feature as the testing library playwright have an issue with webkitGetAsEntry returning always null
    if (e.dataTransfer.isForTestingPurpose) {
      traverseItem(e.dataTransfer.files[0])
      return
    }

    cancelDefault(e)

    // get dropped files
    const files = e.dataTransfer.files

    setFilesInternal(files)
    setFiles(files)

    if (state.importMode == 'multiple') {
      console.log('multiple files import mode')
      console.log('files', files)

      // traverse first file item
      await traverseItem(shiftFile())
    } else if (state.importMode == 'single') {
      console.log('single file import mode')

      // ensure that you have only one single item
      if (nFiles() == 1) {
        // traverse the file item
        await traverseItem(shiftFile())
      }
      // not a single item
      else {
        const msg = 'only a single file can be imported' // check third argument
        console.error(msg)
        errorAlert(msg)
      }
    }
  }, [])

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
            onClick={onProcessFiles}>
            Load files
          </button>
        </div>
      </div>
    </div>
  )
}

export default FileImport
