import { useCallback, useMemo, useState } from 'react'
import { loadFiles } from '@/app/client/components/FileImport/loadFile'
import { LoadFileConfig } from '@/app/client/components/FileImport/types'
import { containerClasses } from '@/app/client/css/styles'
import { cancelDefault } from '@/app/client/modules/utils/utils'

declare global {
  interface DataTransfer {
    isForTestingPurpose: boolean
  }
}

type FileImportProps = LoadFileConfig & {
  uploadLabel: string
  onLoad: () => void
  onDrop: (files: File[], config: LoadFileConfig) => void
  onRemove?: (file: File) => void
  renderItemContent?: (item: File) => React.ReactElement
}

function FileImport({
  uploadLabel,
  mode = 'data-collection',
  importMode = 'multiple',
  expectedArtifact,
  expectedExtensions,
  onLoad,
  renderItemContent,
  onRemove,
  onDrop,
}: FileImportProps): React.ReactElement {
  const [isActive, setIsActive] = useState(false)
  const [files, setFiles] = useState<File[]>([])

  const config: LoadFileConfig = useMemo(
    () => ({
      mode,
      importMode,
      expectedArtifact,
      expectedExtensions,
    }),
    [mode, importMode, expectedArtifact, expectedExtensions],
  )

  const shouldHoldItems = renderItemContent != null && onRemove != null

  const handleDroppedFiles = useCallback(
    async (e: React.DragEvent<HTMLDivElement>) => {
      console.log('onDrop')

      setIsActive(false)

      // a hack to support the testing of a single file upload using the drag/drop feature as the testing library playwright have an issue with webkitGetAsEntry returning always null
      if (e.dataTransfer.isForTestingPurpose) {
        loadFiles([e.dataTransfer.files[0]!], config)
        return
      }

      cancelDefault(e)

      const files = e.dataTransfer.files
      const filesArray = Array.from(files)
      setFiles(filesArray)

      onDrop(filesArray, config)
    },
    [config, onDrop],
  )

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
          {shouldHoldItems && (
            <div className="file-list" id="file-list">
              {files.map((file) => (
                <div id={`fileinfo-${file.id}`} className="row" key={file.id}>
                  {renderItemContent(file)}
                  <div className="column">
                    <button
                      className="remove-btn"
                      id={`remove-${file.id}`}
                      onClick={() => {
                        onRemove(file)
                        setFiles(files.filter((f) => f.id !== file.id))
                      }}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="process-files-btn-container">
          <button
            className="process-files-btn"
            id="process-files"
            disabled={files.length == 0}
            onClick={onLoad}>
            Load files
          </button>
        </div>
      </div>
    </div>
  )
}

export default FileImport
