import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { ROUTES } from '@/app/client/ROUTES'
import FileImport from '@/app/client/components/FileImport'
import {
  getModelIdFromFileName,
  loadFiles,
} from '@/app/client/components/FileImport/loadFile'
import { errorAlert } from '@/app/client/modules/utils/utils'
import { useStateStore } from '@/app/client/state/state'

export function EyeTrackingLoadModelsPage() {
  const { models, updateModel, setState } = useStateStore()
  const navigate = useNavigate()

  // TODO: Remove once state is split up
  useEffect(() => {
    setState({
      importMode: 'multiple',
      expectedArtifact: 'models',
      expectedExtensions: ['bpmn', 'odm'],
    })
  }, [setState])

  function removeModelFile(file: File) {
    updateModel(getModelIdFromFileName(file.name), undefined)
  }

  function validateModels() {
    const modelValues = Object.values(models ?? {})

    const mainModels = modelValues.filter((model) => model?.isMain === true)

    console.log({ mainModels })

    if (mainModels.length !== 1) {
      const msg = 'There must be exactly one model set as main'
      errorAlert(msg)
      console.error(msg)
      return
    }

    if (modelValues.some((model) => (model?.groupId ?? '') === '')) {
      const msg = 'All models must be assigned to a group'
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
  }

  return (
    <FileImport
      mode="data-collection"
      importMode="multiple"
      expectedArtifact="models"
      expectedExtensions={['bpmn', 'odm']}
      uploadLabel="Drop models files"
      onLoad={validateModels}
      onDrop={loadFiles}
      onRemove={removeModelFile}
      renderItemContent={(file) => <ModelFileItem file={file} />}
    />
  )
}

function ModelFileItem({ file }: { file: File }) {
  const { models, updateModel } = useStateStore()
  const modelFile = models?.[getModelIdFromFileName(file.name)]

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
          defaultChecked={modelFile.isMain}
          onChange={(e) => {
            updateModel(modelFile.id, { isMain: e.target.checked })
          }}
        />
        Set as main
      </div>
      <div className="column">
        <input
          type="checkbox"
          className="unclosable-tab"
          id={`unclosable-tab-${file.id}`}
          modelId={modelFile.id}
          onChange={(e) => {
            updateModel(modelFile.id, { unclosable: e.target.checked })
          }}
          defaultChecked={modelFile.unclosable}
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
          onChange={(e) => {
            updateModel(modelFile.id, { groupId: e.target.value })
          }}
          placeholder={modelFile.groupId}
          name={`group-assignement-for-file-${file.id}`}
          id={`group-assignement-for-file-${file.id}`}
        />
      </div>
    </>
  )
}
