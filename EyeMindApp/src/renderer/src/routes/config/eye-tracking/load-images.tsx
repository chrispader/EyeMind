import FileImport from '@renderer/components/FileImport'
import { isImageFile, readFileAsDataUrl } from '@renderer/model/images'
import {
  type ImageFile,
  createDefaultImageFile,
  useDraftImages,
  useImageActions,
} from '@renderer/state/session'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

import { CONST } from '@/CONST'

import { Route as loadModelsRoute } from './load-models'

export const Route = createFileRoute('/config/eye-tracking/load-images')({
  component: EyeTrackingLoadImagesPage,
})

function EyeTrackingLoadImagesPage() {
  const navigate = useNavigate()

  const draftImages = useDraftImages()
  const { addImageFiles, removeImageFile, updateImageFile } = useImageActions()

  const draftImageValues = Object.values(draftImages)

  const [errors, setErrors] = useState<string[]>([])

  function validateImages() {
    // Images are optional, allow proceeding with none
    // Mark all draft images as not draft
    for (const image of Object.values(draftImages)) {
      updateImageFile(image.id, { isDraft: false })
    }

    navigate({ to: loadModelsRoute.to })
  }

  async function addDraftImages(files: File[]) {
    const imagesToAdd: ImageFile[] = []
    const newErrors: string[] = []

    for (const file of files) {
      if (!isImageFile(file)) {
        newErrors.push(`${file.name} is not a supported image format`)
        continue
      }

      const existingImage = draftImages[file.name.replace(/[\W_.]/g, '')]
      if (existingImage !== undefined) {
        newErrors.push(`${file.name} is already added`)
        continue
      }

      try {
        const dataUrl = await readFileAsDataUrl(file)
        const imageFile = createDefaultImageFile(file, dataUrl, true)
        imageFile.groupId = CONST.DEFAULT_MODEL_GROUP_ID
        imagesToAdd.push(imageFile)
      } catch (error) {
        newErrors.push(`Failed to read ${file.name}`)
      }
    }

    if (newErrors.length > 0) {
      setErrors(newErrors)
    }

    if (imagesToAdd.length > 0) {
      addImageFiles(imagesToAdd)
    }
  }

  return (
    <FileImport
      items={draftImageValues}
      errors={errors}
      onDismissError={(error) => setErrors(errors.filter((e) => e !== error))}
      uploadLabel='Drop image files here (PNG, JPEG, GIF, WebP)'
      submitLabel={draftImageValues.length === 0 ? 'Skip' : 'Continue'}
      onSubmit={validateImages}
      onDrop={addDraftImages}
      onRemove={(image) => removeImageFile(image.id)}
      renderItem={(image) => <DraftImageItem image={image} />}
    />
  )
}

function DraftImageItem({ image }: { image: ImageFile }) {
  const { updateImageFile } = useImageActions()

  return (
    <div className='flex items-center gap-4 p-2'>
      <img
        src={image.dataUrl}
        alt={image.fileName}
        className='h-16 w-16 object-cover rounded border'
      />
      <div className='flex-1'>
        <div className='font-medium'>{image.fileName}</div>
      </div>
      <div className='flex items-center gap-2'>
        <span>Group:</span>
        <input
          className='w-12 px-2 py-1 border rounded'
          type='text'
          onChange={(e) => {
            updateImageFile(image.id, { groupId: e.target.value })
          }}
          placeholder={image.groupId}
          defaultValue={image.groupId}
        />
      </div>
    </div>
  )
}
