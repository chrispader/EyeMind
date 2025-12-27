import { useState } from 'react'
import { useNavigate } from 'react-router'
import { ROUTES } from '@/app/client/ROUTES'
import { ErrorList } from '@/app/client/components/ErrorList'
import FileImport from '@/app/client/components/FileImport'
import { isQuestionsFile } from '@/app/client/components/FileImport/loadFile'
import { FileImportConfig } from '@/app/client/components/FileImport/types'
import {
  type QuestionFile,
  createDefaultQuestionFile,
  getQuestionFileIdFromFileName,
} from '@/app/client/model/questions'
import { useQuestionFileActions, useQuestionFiles } from '@/app/client/state/session'

const fileImportConfig: FileImportConfig = {
  mode: 'data-collection',
  importMode: 'single',
  expectedArtifact: 'questions',
  expectedExtensions: ['csv'],
}

export function EyeTrackingLoadQuestionsPage(): React.ReactElement {
  const navigate = useNavigate()

  const questionFiles = useQuestionFiles()
  const { addQuestionFiles, removeQuestionFile } = useQuestionFileActions()

  const [errors, setErrors] = useState<string[]>([])

  async function validateQuestionFiles() {
    if (Object.values(questionFiles).length === 0) {
      setErrors(['No questions files to load. Please drop a questions file first.'])
      return
    }

    navigate(ROUTES.EYE_TRACKING_EXPERIMENT)
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
