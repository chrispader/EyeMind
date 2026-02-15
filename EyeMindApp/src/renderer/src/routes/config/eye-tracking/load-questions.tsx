import LANG from '@renderer/LANG'
import FileImport from '@renderer/components/FileImport'
import { isQuestionsFile } from '@renderer/components/FileImport/loadFile'
import type { FileImportConfig } from '@renderer/components/FileImport/types'
import { useToast } from '@renderer/hooks/useToast'
import {
  type QuestionFile,
  createDefaultQuestionFile,
  extractQuestionsFromFile,
  getQuestionFileIdFromFileName,
} from '@renderer/model/questions'
import {
  useDraftModels,
  useModelActions,
  useQuestionActions,
  useQuestionFiles,
} from '@renderer/state/session'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

import { CONST } from '@/CONST'

import { Route as experimentRoute } from '../../experiment'
import { Route as loadModelsRoute } from './load-models'

const fileImportConfig: FileImportConfig = {
  mode: 'data-collection',
  importMode: 'single',
  expectedArtifact: 'questions',
  expectedExtensions: ['csv'],
}

export const Route = createFileRoute('/config/eye-tracking/load-questions')({
  component: EyeTrackingLoadQuestionsPage,
})

function EyeTrackingLoadQuestionsPage(): React.ReactElement {
  const navigate = useNavigate()
  const { toast } = useToast()

  const questionFiles = useQuestionFiles()
  const draftModels = useDraftModels()
  const { addQuestionFiles, removeQuestionFile, setQuestions } = useQuestionActions()
  const { updateModel } = useModelActions()

  const [errors, setErrors] = useState<string[]>([])

  async function validateQuestionFiles() {
    const questionFilesValues = Object.values(questionFiles)

    if (questionFilesValues.length === 0) {
      setErrors([LANG.errorNoQuestionsFiles])
      return
    }

    for (const file of questionFilesValues) {
      try {
        const questions = await extractQuestionsFromFile(file.file)
        setQuestions(questions)

        // New session flow complete: finalize draft models (isDraft: false, groupId)
        const draftModelValues = Object.values(draftModels)

        if (draftModelValues.length === 0) {
          toast({
            message: 'There were no models set.',
            type: 'info',
            duration: 'short',
          })
          navigate({ to: loadModelsRoute.to })
          return
        }

        for (const model of draftModelValues) {
          updateModel(model.id, {
            isDraft: false,
            groupId: model.groupId ?? CONST.DEFAULT_MODEL_GROUP_ID,
          })
        }

        navigate({ to: experimentRoute.to })
      } catch (error) {
        let msg = LANG.errorValidatingQuestions
        if (error instanceof Error) {
          msg += ': ' + error.message
        }
        setErrors([msg])
      }
    }
  }

  function addDroppedQuestions(files: File[]) {
    const newErrors: string[] = []
    let questionFileToAdd: QuestionFile | null = null

    for (const file of files) {
      const questionFileId = getQuestionFileIdFromFileName(file.name)

      if (!isQuestionsFile(file, fileImportConfig)) {
        newErrors.push(
          `${file.name} (id: ${questionFileId}) ${LANG.errorNotValidQuestionsFile}`,
        )
        continue
      }

      questionFileToAdd = createDefaultQuestionFile(file, true)
      break
    }

    if (newErrors.length > 0) {
      setErrors(newErrors)
      return
    }

    if (questionFileToAdd === null) {
      return
    }

    const existingIds = Object.keys(questionFiles)
    for (const id of existingIds) {
      removeQuestionFile(id)
    }
    addQuestionFiles([questionFileToAdd])
  }

  const singleQuestionFile = Object.values(questionFiles).slice(0, 1)

  return (
    <FileImport
      items={singleQuestionFile}
      errors={errors}
      onDismissError={(error) => setErrors(errors.filter((e) => e !== error))}
      uploadLabel={LANG.dropQuestionsFile}
      onDrop={addDroppedQuestions}
      onSubmit={validateQuestionFiles}
      onRemove={(questionFile) => removeQuestionFile(questionFile.id)}
      renderItem={(questionFile) => <QuestionFileItem questionFile={questionFile} />}
    />
  )
}

function QuestionFileItem({ questionFile }: { questionFile: QuestionFile }) {
  // Always show the file name - the file is in the FileImport component's local state
  return <div className='column file-info'>{questionFile.fileName}</div>
}
