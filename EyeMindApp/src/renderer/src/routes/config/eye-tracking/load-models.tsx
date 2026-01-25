import { translate } from '@renderer/LANG'
import FileImport from '@renderer/components/FileImport'
import { isModelsFile } from '@renderer/components/FileImport/loadFile'
import type { FileImportConfig } from '@renderer/components/FileImport/types'
import {
  type Model,
  createDefaultModel,
  getModelIdFromFileName,
} from '@renderer/model/models'
import { readFileContent } from '@renderer/modules/utils/utils'
import { useDraftModels, useModelActions } from '@renderer/state/session'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

import { CONST } from '@/CONST'

import { Route as loadQuestionsRoute } from './load-questions'

const fileImportConfig: FileImportConfig = {
  mode: 'data-collection',
  importMode: 'multiple',
  expectedArtifact: 'models',
  expectedExtensions: ['bpmn', 'odm'],
}

export const Route = createFileRoute('/config/eye-tracking/load-models')({
  component: EyeTrackingLoadModelsPage,
})

function EyeTrackingLoadModelsPage() {
  const navigate = useNavigate()

  const draftModels = useDraftModels()
  const { addModels, removeModel, updateModel } = useModelActions()

  const draftModelValues = Object.values(draftModels)

  const [errors, setErrors] = useState<string[]>([])

  function validateModels() {
    const mainModels = draftModelValues.filter((model) => model?.isMain === true)

    if (mainModels.length !== 1) {
      setErrors(['There must be exactly one model set as main'])
      return
    }

    if (draftModelValues.some((model) => (model?.groupId ?? '') === '')) {
      setErrors(['All models must be assigned to a group'])
      return
    }

    if (draftModelValues.length === 0) {
      setErrors(['No models to load'])
      return
    }

    // Mark all draft models as not draft
    for (const model of Object.values(draftModels)) {
      updateModel(model.id, { isDraft: false })
    }

    navigate({ to: loadQuestionsRoute.to })
  }

  async function addDraftModels(files: File[]) {
    let draftModelsToAdd: Model[] = []
    let newErrors: string[] = []

    for (const file of files) {
      const modelId = getModelIdFromFileName(file.name)

      if (!isModelsFile(file, fileImportConfig)) {
        continue
      }

      if (draftModels?.[modelId] !== undefined) {
        newErrors.push(file.name + ' (id: ' + modelId + ') is already added')
        continue
      }

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

      draftModelsToAdd.push(model)

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

    if (newErrors.length > 0) {
      setErrors(newErrors)
      return
    }

    addModels(draftModelsToAdd)
  }

  return (
    <FileImport
      items={draftModelValues}
      errors={errors}
      onDismissError={(error) => setErrors(errors.filter((e) => e !== error))}
      uploadLabel={translate('dropModelsFiles')}
      onSubmit={validateModels}
      onDrop={addDraftModels}
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
        Group:
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
