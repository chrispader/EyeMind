import { useNavigate } from 'react-router'
import { CONST } from '@/CONST'
import { translate } from '@/app/LANG'
import { ROUTES } from '@/app/client/ROUTES'
import FileImport from '@/app/client/components/FileImport'
import {
  getModelIdFromFileName,
  isModelsFile,
} from '@/app/client/components/FileImport/loadFile'
import type { FileImportConfig } from '@/app/client/components/FileImport/types'
import { type Model, createDefaultModel } from '@/app/client/model/models'
import { errorAlert, readFileContent } from '@/app/client/modules/utils/utils'
import { useDraftModels, useModelActions } from '@/app/client/state/session'

const fileImportConfig: FileImportConfig = {
  mode: 'data-collection',
  importMode: 'multiple',
  expectedArtifact: 'models',
  expectedExtensions: ['bpmn', 'odm'],
}

export function EyeTrackingLoadModelsPage() {
  const navigate = useNavigate()

  const draftModels = useDraftModels()
  const { addModels, removeModel } = useModelActions()

  // TODO: Remove once state is split up
  // useEffect(() => {
  //   setState({
  //     importMode: 'multiple',
  //     expectedArtifact: 'models',
  //     expectedExtensions: ['bpmn', 'odm'],
  //   })
  // }, [setState])

  function validateModels() {
    const modelValues = Object.values(draftModels ?? {})

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

  async function addDroppedModels(files: File[]) {
    let models: Model[] = []

    for (const file of files) {
      const modelId = getModelIdFromFileName(file.name)

      if (!isModelsFile(file, fileImportConfig)) {
        continue
      }

      if (draftModels?.[modelId] !== undefined) {
        const msg = file.name + ' (id: ' + modelId + ') is already added'
        errorAlert(msg)
        console.error(msg)
        continue
      }

      // create file object
      const model = createDefaultModel(file, true)

      const doesMainModelExist = Object.values(draftModels ?? {}).some(
        (model) => model?.isMain,
      )
      model.isMain = !doesMainModelExist
      model.groupId = CONST.DEFAULT_MODEL_GROUP_ID

      const content = await new Promise<string>((resolve, reject) => {
        try {
          // readFileContent then traverseDataCollectionFile and traverseMoreItems
          readFileContent(file, async (content: string) => {
            resolve(content)
          })
        } catch (error) {
          reject(error)
        }
      })
      model.xml = content

      models.push(model)

      // try {
      //   // process model
      //   // await processModel(config, file.xml, file.id, file.fileName, file.path)
      //   // create file info menu
      //   // createModelFileInfoBlock(file)
      // } catch (error) {
      //   // something wrong happened with the opening of the diagram
      //   removeModelFile(file)
      //   console.error(file.fileName + ' is invalid')
      //   errorAlert(file.fileName + ' is invalid')
      // }
    }

    addModels(models)
  }

  return (
    <FileImport
      items={Object.values(draftModels)}
      uploadLabel={translate('dropModelsFiles')}
      onSubmit={validateModels}
      onDrop={addDroppedModels}
      onRemove={(model) => removeModel(model.id)}
      renderItem={(model) => <DraftModelItem model={model} />}
    />
  )
}

function DraftModelItem({ model }: { model: Model }) {
  const { updateModel } = useModelActions()

  return (
    <>
      <div className='column file-info'>{model.fileName}</div>
      <div className='column'>
        <input
          type='checkbox'
          className='set-as-main'
          id={`set-as-main-${model.id}`}
          name='set-as-main'
          defaultChecked={model.isMain}
          onChange={(e) => {
            updateModel(model.id, { isMain: e.target.checked })
          }}
        />
        {translate('setAsMain')}
      </div>
      <div className='column'>
        <input
          type='checkbox'
          className='unclosable-tab'
          id={`unclosable-tab-${model.id}`}
          onChange={(e) => {
            updateModel(model.id, { unclosable: e.target.checked })
          }}
          defaultChecked={model.unclosable}
        />
        {translate('unclosableTab')}
      </div>
      <div className='column'>
        Group:{' '}
        <input
          className='group-assignement'
          type='text'
          size={2}
          onChange={(e) => {
            updateModel(model.id, { groupId: e.target.value })
          }}
          placeholder={model.groupId}
          name={`group-assignement-for-file-${model.id}`}
          id={`group-assignement-for-file-${model.id}`}
        />
      </div>
    </>
  )
}
