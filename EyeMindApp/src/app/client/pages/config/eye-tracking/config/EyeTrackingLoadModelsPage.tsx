import { useCallback, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router'
import { ROUTES } from '@/app/client/ROUTES'
import FileImport from '@/app/client/components/FileImport'
import {
  getModelIdFromFileName,
  loadFiles,
} from '@/app/client/components/FileImport/loadFile'
import { errorAlert } from '@/app/client/modules/utils/utils'
import { useStateStore } from '@/app/client/state/state'

export function EyeTrackingLoadModelsPage(): React.ReactElement {
  const { models, setState } = useStateStore.getState()
  const navigate = useNavigate()

  // TODO: Remove once state is split up
  useEffect(() => {
    setState({
      importMode: 'multiple',
      expectedArtifact: 'models',
      expectedExtensions: ['bpmn', 'odm'],
    })
  }, [setState])

  const removeModelFile = useCallback(
    (file: File) => {
      setState((state) => {
        delete state.models?.[getModelIdFromFileName(file.name)]
        return state
      })
    },
    [setState],
  )

  return (
    <FileImport
      mode="data-collection"
      importMode="multiple"
      expectedArtifact="models"
      expectedExtensions={['bpmn', 'odm']}
      uploadLabel="Drop models files"
      onLoad={() => {
        const modelValues = Object.values(models ?? {})

        const mainModels = modelValues.filter((model) => model?.isMain === true)
        if (mainModels.length > 1) {
          const msg = 'Only one model can be set as main'
          errorAlert(msg)
          console.error(msg)
          return
        }

        if (modelValues.length > 0) {
          navigate(ROUTES.EYE_TRACKING_LOAD_QUESTIONS)
          return
        }

        const msg = 'No models to load'
        errorAlert(msg)
        console.error(msg)
      }}
      onDrop={(files, config) => {
        loadFiles(files, config)
      }}
      onRemove={removeModelFile}
      renderItemContent={(file) => <ModelFileItem file={file} />}
    />
  )
}

function ModelFileItem({ file }: { file: File }) {
  const { models } = useStateStore()
  const modelFile = useMemo(
    () => models?.[getModelIdFromFileName(file.name)],
    [models, file.name],
  )

  console.log('modelFile', modelFile)
  if (modelFile == null) {
    return null
  }

  return (
    <>
      <div className="column file-info">{modelFile.fileName}</div>
      <div className="column">
        <input
          type="checkbox"
          className="set-as-main"
          id={`set-as-main-${file.id}`}
          name="set-as-main"
          modelId={modelFile.id}
          checked={modelFile.isMain}
        />
        Set as main
      </div>
      <div className="column">
        <input
          className="unclosable-tab"
          id={`unclosable-tab-${file.id}`}
          modelId={modelFile.id}
          type="checkbox"
          checked={modelFile.isMain}
        />
        Unclosable Tab
      </div>
      <div className="column">
        Group:{' '}
        <input
          className="group-assignement"
          modelId={modelFile.id}
          type="text"
          size={2}
          name={`group-assignement-for-file-${file.id}`}
          id={`group-assignement-for-file-${file.id}`}
          value={modelFile.groupId}
        />
      </div>
    </>
  )
}
