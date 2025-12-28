import { useState } from 'react'
import { useNavigate } from 'react-router'
import FileImport from '@/app/components/FileImport'
import { isQuestionsFile } from '@/app/components/FileImport/loadFile'
import { FileImportConfig } from '@/app/components/FileImport/types'
import {
  type QuestionFile,
  createDefaultQuestionFile,
  extractQuestionsFromFile,
  getQuestionFileIdFromFileName,
} from '@/app/model/questions'
import { ROUTES_NAMES } from '@/app/routes'
import { useQuestionActions, useQuestionFiles } from '@/app/state/session'

const fileImportConfig: FileImportConfig = {
  mode: 'data-collection',
  importMode: 'single',
  expectedArtifact: 'questions',
  expectedExtensions: ['csv'],
}

export function EyeTrackingLoadQuestionsPage(): React.ReactElement {
  const navigate = useNavigate()

  const questionFiles = useQuestionFiles()
  const { addQuestionFiles, removeQuestionFile, setQuestions } = useQuestionActions()

  const [errors, setErrors] = useState<string[]>([])

  async function validateQuestionFiles() {
    if (Object.values(questionFiles).length === 0) {
      setErrors(['No questions files to load. Please drop a questions file first.'])
      return
    }

    try {
      const questions = await extractQuestionsFromFile(file)
      setQuestions(questions)
      navigate(ROUTES_NAMES.EYE_TRACKING_EXPERIMENT)
    } catch (error) {
      let msg = 'An error occured while validating the questions file'
      if (error instanceof Error) {
        msg += ': ' + error.message
      }
      setErrors([msg])
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
