import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import FileImport from '@/renderer/components/FileImport'
import { isQuestionsFile } from '@/renderer/components/FileImport/loadFile'
import { FileImportConfig } from '@/renderer/components/FileImport/types'
import {
  type QuestionFile,
  createDefaultQuestionFile,
  extractQuestionsFromFile,
  getQuestionFileIdFromFileName,
} from '@/renderer/model/questions'
import { useQuestionActions, useQuestionFiles } from '@/renderer/state/session'
import { Route as experimentRoute } from '../../experiment'

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

  const questionFiles = useQuestionFiles()
  const { addQuestionFiles, removeQuestionFile, setQuestions } = useQuestionActions()

  const [errors, setErrors] = useState<string[]>([])

  async function validateQuestionFiles() {
    const questionFilesValues = Object.values(questionFiles)

    if (questionFilesValues.length === 0) {
      setErrors(['No questions files to load. Please drop a questions file first.'])
      return
    }

    for (const file of questionFilesValues) {
      try {
        const questions = await extractQuestionsFromFile(file.file)
        setQuestions(questions)
        navigate(experimentRoute.to)
      } catch (error) {
        let msg = 'An error occured while validating the questions file'
        if (error instanceof Error) {
          msg += ': ' + error.message
        }
        setErrors([msg])
      }
    }
  }

  function addDroppedQuestions(files: File[]) {
    let questionFilesToAdd: QuestionFile[] = []
    let newErrors: string[] = []

    for (const file of files) {
      const questionFileId = getQuestionFileIdFromFileName(file.name)

      if (!isQuestionsFile(file, fileImportConfig)) {
        newErrors.push(
          file.name + ' (id: ' + questionFileId + ') is not a valid questions file',
        )
        continue
      }

      if (questionFiles?.[questionFileId] !== undefined) {
        newErrors.push(file.name + ' (id: ' + questionFileId + ') is already added')
        continue
      }

      const questionFile = createDefaultQuestionFile(file, true)

      questionFilesToAdd.push(questionFile)
    }

    if (newErrors.length > 0) {
      setErrors(newErrors)
      return
    }

    addQuestionFiles(questionFilesToAdd)
  }

  return (
    <FileImport
      items={Object.values(questionFiles)}
      errors={errors}
      onDismissError={(error) => setErrors(errors.filter((e) => e !== error))}
      uploadLabel='Drop a questions csv file'
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
