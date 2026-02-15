import LANG, { translate } from '@renderer/LANG'
import FileImport from '@renderer/components/FileImport'
import { isModelsFile } from '@renderer/components/FileImport/loadFile'
import type { FileImportConfig } from '@renderer/components/FileImport/types'
import { isImageFile, readFileAsDataUrl } from '@renderer/model/images'
import {
  type Model,
  createDefaultImageModel,
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
  const { addModels, removeModel } = useModelActions()

  const draftModelValues = Object.values(draftModels)
  const draftBpmnModels = draftModelValues.filter((m) => m.xml != null && m.xml !== '')

  const [errors, setErrors] = useState<string[]>([])

  function validateAndProceed() {
    const modelErrors: string[] = []

    if (draftModelValues.length === 0) {
      modelErrors.push(LANG.errorNoModelsToLoad)
    } else {
      // When there are BPMN models, exactly one must be marked as main
      if (draftBpmnModels.length > 0) {
        const mainModels = draftBpmnModels.filter((m) => m.isMain === true)
        if (mainModels.length !== 1) {
          modelErrors.push(LANG.errorExactlyOneMain)
        }
      }
    }

    if (modelErrors.length > 0) {
      setErrors(modelErrors)
      return
    }

    navigate({ to: loadQuestionsRoute.to })
  }

  async function addDraftItems(files: File[]) {
    const modelsToAdd: Model[] = []
    const newErrors: string[] = []

    for (const file of files) {
      if (isImageFile(file)) {
        const imageModelId = getModelIdFromFileName(file.name)
        if (draftModels[imageModelId] !== undefined) {
          newErrors.push(`${file.name} ${LANG.errorAlreadyAdded}`)
          continue
        }
        try {
          const dataUrl = await readFileAsDataUrl(file)
          const imageModel = createDefaultImageModel(file, dataUrl, true)
          imageModel.groupId = CONST.DEFAULT_MODEL_GROUP_ID
          modelsToAdd.push(imageModel)
        } catch {
          newErrors.push(`${LANG.errorFailedToRead} ${file.name}`)
        }
        continue
      }

      if (!isModelsFile(file, fileImportConfig)) {
        continue
      }

      // BPMN models use file.name as id (see createDefaultModel)
      const bpmnModelId = file.name
      if (draftModels[bpmnModelId] !== undefined) {
        newErrors.push(`${file.name} ${LANG.errorAlreadyAdded}`)
        continue
      }

      const model = createDefaultModel(file, true)
      const doesMainModelExist = draftBpmnModels.some((m) => m.isMain)
      model.isMain = !doesMainModelExist
      model.groupId = CONST.DEFAULT_MODEL_GROUP_ID

      const content = await new Promise<string>((resolve, reject) => {
        try {
          readFileContent(file, (content) => resolve(content as string))
        } catch (error) {
          reject(error)
        }
      })
      model.xml = content
      modelsToAdd.push(model)
    }

    if (newErrors.length > 0) {
      setErrors(newErrors)
    }

    if (modelsToAdd.length > 0) {
      addModels(modelsToAdd)
    }
  }

  return (
    <FileImport<Model>
      items={draftModelValues}
      getItemId={(item) => item.id}
      errors={errors}
      onDismissError={(error) => setErrors(errors.filter((e) => e !== error))}
      uploadLabel={translate('dropImageAndModelFiles')}
      submitLabel={translate('continue')}
      onSubmit={validateAndProceed}
      onDrop={addDraftItems}
      onRemove={(model) => removeModel(model.id)}
      renderItem={(model) => <DraftModelItem model={model} />}
    />
  )
}

function DraftModelItem({ model }: { model: Model }) {
  const { updateModel } = useModelActions()

  return (
    <>
      <div className='table-cell p-1.5 list-none text-[17px] font-normal h-10 align-middle'>
        {model.fileName}
      </div>
      <div className='table-cell p-1.5 align-middle'>
        <div className='flex items-center gap-3'>
          <input
            type='checkbox'
            id={`set-as-main-${model.id}`}
            name='set-as-main'
            defaultChecked={model.isMain}
            onChange={(e) => {
              updateModel(model.id, { isMain: e.target.checked })
            }}
          />
          <label htmlFor={`set-as-main-${model.id}`}>{translate('setAsMain')}</label>
        </div>
      </div>
      <div className='table-cell p-1.5 align-middle'>
        <div className='flex items-center gap-3'>
          <input
            type='checkbox'
            id={`unclosable-tab-${model.id}`}
            onChange={(e) => {
              updateModel(model.id, { unclosable: e.target.checked })
            }}
            defaultChecked={model.unclosable}
          />
          <label htmlFor={`unclosable-tab-${model.id}`}>
            {translate('unclosableTab')}
          </label>
        </div>
      </div>
      <div className='table-cell p-1.5 align-middle'>
        <span className='mr-2'>{translate('group')}</span>
        <input
          type='text'
          size={2}
          className='w-12 border border-gray-300 rounded px-1 py-0.5'
          value={model.groupId}
          onChange={(e) => {
            updateModel(model.id, {
              groupId: e.target.value === '' ? undefined : e.target.value,
            })
          }}
          placeholder={CONST.DEFAULT_MODEL_GROUP_ID}
          name={`group-assignement-for-file-${model.id}`}
          id={`group-assignement-for-file-${model.id}`}
        />
      </div>
    </>
  )
}
