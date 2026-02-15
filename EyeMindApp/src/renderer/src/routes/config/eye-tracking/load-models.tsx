import LANG, { translate } from '@renderer/LANG'
import FileImport from '@renderer/components/FileImport'
import { isModelsFile } from '@renderer/components/FileImport/loadFile'
import type { FileImportConfig } from '@renderer/components/FileImport/types'
import {
  type ImageFile,
  createDefaultImageFile,
  isImageFile,
  readFileAsDataUrl,
} from '@renderer/model/images'
import {
  type Model,
  createDefaultModel,
  getModelIdFromFileName,
} from '@renderer/model/models'
import { readFileContent } from '@renderer/modules/utils/utils'
import {
  useDraftImages,
  useDraftModels,
  useImageActions,
  useModelActions,
} from '@renderer/state/session'
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

type DraftItem = ImageFile | Model

function isDraftImage(item: DraftItem): item is ImageFile {
  return 'dataUrl' in item
}

export const Route = createFileRoute('/config/eye-tracking/load-models')({
  component: EyeTrackingLoadModelsPage,
})

function EyeTrackingLoadModelsPage() {
  const navigate = useNavigate()

  const draftImages = useDraftImages()
  const draftModels = useDraftModels()
  const { addImageFiles, removeImageFile, updateImageFile } = useImageActions()
  const { addModels, removeModel, updateModel } = useModelActions()

  const draftImageValues = Object.values(draftImages)
  const draftModelValues = Object.values(draftModels)
  const combinedItems: DraftItem[] = [...draftImageValues, ...draftModelValues]

  const [errors, setErrors] = useState<string[]>([])

  function validateAndProceed() {
    const modelErrors: string[] = []

    const mainModels = draftModelValues.filter((model) => model?.isMain === true)
    if (mainModels.length !== 1) {
      modelErrors.push(LANG.errorExactlyOneMain)
    }

    if (draftModelValues.some((model) => (model?.groupId ?? '') === '')) {
      modelErrors.push(LANG.errorAllModelsNeedGroup)
    }

    if (draftModelValues.length === 0) {
      modelErrors.push(LANG.errorNoModelsToLoad)
    }

    if (modelErrors.length > 0) {
      setErrors(modelErrors)
      return
    }

    // Mark all draft images as not draft
    for (const image of Object.values(draftImages)) {
      updateImageFile(image.id, { isDraft: false })
    }

    // Mark all draft models as not draft
    for (const model of Object.values(draftModels)) {
      updateModel(model.id, { isDraft: false })
    }

    navigate({ to: loadQuestionsRoute.to })
  }

  async function addDraftItems(files: File[]) {
    const imagesToAdd: ImageFile[] = []
    const modelsToAdd: Model[] = []
    const newErrors: string[] = []

    for (const file of files) {
      if (isImageFile(file)) {
        const existingImage = draftImages[file.name.replace(/[\W_.]/g, '')]
        if (existingImage !== undefined) {
          newErrors.push(`${file.name} ${LANG.errorAlreadyAdded}`)
          continue
        }
        try {
          const dataUrl = await readFileAsDataUrl(file)
          const imageFile = createDefaultImageFile(file, dataUrl, true)
          imageFile.groupId = CONST.DEFAULT_MODEL_GROUP_ID
          imagesToAdd.push(imageFile)
        } catch {
          newErrors.push(`${LANG.errorFailedToRead} ${file.name}`)
        }
        continue
      }

      if (!isModelsFile(file, fileImportConfig)) {
        continue
      }

      const modelId = getModelIdFromFileName(file.name)
      if (draftModels?.[modelId] !== undefined) {
        newErrors.push(`${file.name} (id: ${modelId}) ${LANG.errorAlreadyAdded}`)
        continue
      }

      const model = createDefaultModel(file, true)
      const doesMainModelExist = draftModelValues.some((m) => m?.isMain)
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

    if (imagesToAdd.length > 0) {
      addImageFiles(imagesToAdd)
    }
    if (modelsToAdd.length > 0) {
      addModels(modelsToAdd)
    }
  }

  return (
    <FileImport<DraftItem>
      items={combinedItems}
      getItemId={(item) => item.id}
      errors={errors}
      onDismissError={(error) => setErrors(errors.filter((e) => e !== error))}
      uploadLabel={LANG.dropImageAndModelFiles}
      submitLabel={LANG.continue}
      onSubmit={validateAndProceed}
      onDrop={addDraftItems}
      onRemove={(item) => {
        if (isDraftImage(item)) {
          removeImageFile(item.id)
        } else {
          removeModel(item.id)
        }
      }}
      renderItem={(item) =>
        isDraftImage(item) ? (
          <DraftImageItem image={item} />
        ) : (
          <DraftModelItem model={item} />
        )
      }
    />
  )
}

function DraftImageItem({ image }: { image: ImageFile }) {
  const { updateImageFile } = useImageActions()

  return (
    <>
      <div className='column file-info'>
        <img
          src={image.dataUrl}
          alt={image.fileName}
          className='h-16 w-16 object-cover rounded border'
        />
        <span>{image.fileName}</span>
      </div>
      <div className='column'>
        <span>{LANG.group}</span>
        <input
          className='w-12 px-2 py-1 border rounded group-assignement'
          type='text'
          onChange={(e) => {
            updateImageFile(image.id, { groupId: e.target.value })
          }}
          placeholder={image.groupId}
          defaultValue={image.groupId}
        />
      </div>
    </>
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
        {LANG.group}
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
