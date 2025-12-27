import { useCallback, useState } from 'react'
import { translate } from '@/app/LANG'
import { containerClasses } from '@/app/client/css/styles'
import { cancelDefault } from '@/app/client/modules/utils/utils'

declare global {
  interface DataTransfer {
    isForTestingPurpose: boolean
  }
}

type FileImportProps<FileType> = {
  items: FileType[]
  getItemId?: (item: FileType) => string
  uploadLabel?: string
  submitLabel?: string
  onSubmit: () => void
  onDrop: (files: File[]) => void
  onRemove?: (file: FileType) => void
  renderItem?: (item: FileType) => React.ReactElement
}

function FileImport<FileType>({
  items,
  getItemId,
  onSubmit,
  uploadLabel = translate('dropFiles'),
  submitLabel = translate('loadFiles'),
  renderItem,
  onRemove,
  onDrop,
}: FileImportProps<FileType>): React.ReactElement {
  const [isActive, setIsActive] = useState(false)

  const shouldHoldItems = renderItem != null && onRemove != null

  const handleDroppedFiles = useCallback(
    async (e: React.DragEvent<HTMLDivElement>) => {
      cancelDefault(e)

      setIsActive(false)

      // a hack to support the testing of a single file upload using the drag/drop feature as the testing library playwright have an issue with webkitGetAsEntry returning always null
      // if (e.dataTransfer.isForTestingPurpose) {
      //   loadFiles([e.dataTransfer.files[0]!], config)
      //   return
      // }

      const files = e.dataTransfer.files
      const filesArray = Array.from(files)
      onDrop(filesArray)
    },
    [onDrop],
  )

  return (
    <div className={`${containerClasses} import-view`} id='import-view'>
      <div className='import-box' id='import-box'>
        <div
          className={`upload-zone ${isActive ? 'upload-zone-active' : ''}`}
          id='upload-zone'
          onDrop={handleDroppedFiles}
          onDragEnter={() => setIsActive(true)}
          onDragOver={(e) => {
            e.preventDefault()
            e.stopPropagation()

            e.dataTransfer.dropEffect = 'copy'
          }}
          onDragLeave={() => setIsActive(false)}>
          <span id='upload-label' className='upload-label'>
            {uploadLabel}
          </span>
          {shouldHoldItems && (
            <div className='file-list' id='file-list'>
              {items.map((item, index) => {
                const itemId = getItemId?.(item) ?? index
                return (
                  <div id={`fileinfo-${itemId}`} className='row' key={itemId}>
                    {renderItem(item)}
                    <div className='column'>
                      <button
                        className='remove-btn'
                        id={`remove-${itemId}`}
                        onClick={() => {
                          onRemove(item)
                        }}>
                        Remove
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <div className='process-files-btn-container'>
          <button
            className='process-files-btn'
            id='process-files'
            disabled={items.length == 0}
            onClick={onSubmit}>
            {submitLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

export default FileImport
