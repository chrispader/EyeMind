import { useCallback, useEffect, useRef } from 'react'
import { containerClasses } from '@/app/client/css/styles'
import { nFiles, shiftFile } from '@/app/client/modules/dataModels/filesBuffer'
import { setFiles } from '@/app/client/modules/dataModels/filesBuffer'
import { useStateStore } from '@/app/client/modules/dataModels/state'
import { traverseItem } from '@/app/client/modules/ui/files-setup'
import { cancelDefault, errorAlert } from '@/app/client/modules/utils/utils'

type FileImportProps = {
  uploadLabel: string
  onProcessFiles?: () => void
}

function FileImport({
  uploadLabel,
  onProcessFiles,
}: FileImportProps): React.ReactElement {
  const { state } = useStateStore((state) => state)

  const uploadZoneRef = useRef<HTMLDivElement>(null)

  const handleDroppedFiles = useCallback(async (e: React.DragEvent<HTMLDivElement>) => {
    // a hack to support the testing of a single file upload using the drag/drop feature as the testing library playwright have an issue with webkitGetAsEntry returning always null
    if (e.dataTransfer.isForTestingPurpose) {
      traverseItem(e.dataTransfer.files[0])
      return
    }

    cancelDefault(e)

    // get dropped files
    const files = e.dataTransfer.files

    setFiles(files)

    //  differ execution denpending on the state.importMode
    if (state.importMode == 'multiple') {
      console.log('multiple files import mode')
      console.log('files', files)

      // traverse first file item
      await traverseItem(shiftFile())
    }
    // state.importMode=="single"
    else if (state.importMode == 'single') {
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

  useEffect(() => {
    uploadZoneRef
    /// drag and drop event listeners
    uploadZoneRef.current?.addEventListener('dragover', (e) => {
      e.preventDefault()
      e.stopPropagation()

      e.dataTransfer.dropEffect = 'copy'
    })

    uploadZoneRef.current?.addEventListener('drop', handleDroppedFiles)
  })

  return (
    <div className={`${containerClasses} import-view`} id="import-view">
      <div className="import-box" id="import-box">
        <div
          className="upload-zone"
          id="upload-zone"
          ref={uploadZoneRef}
          onDragOver={() =>
            document.getElementById('upload-zone')?.setAttribute('drop-active', 'true')
          }
          onDragLeave={() =>
            document.getElementById('upload-zone')?.setAttribute('drop-active', 'false')
          }
          onDrop={() =>
            document.getElementById('upload-zone')?.setAttribute('drop-active', 'false')
          }>
          <span id="upload-label" className="upload-label">
            {uploadLabel}
          </span>
          <div className="file-list" id="file-list"></div>
        </div>
        <div className="process-files-btn-container">
          <button
            className="process-files-btn"
            id="process-files"
            onClick={onProcessFiles}>
            Load files
          </button>
        </div>
      </div>
    </div>
  )
}

export default FileImport
