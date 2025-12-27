import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { ROUTES } from '@/app/client/ROUTES'
import FileImport from '@/app/client/components/FileImport'
import { loadFiles } from '@/app/client/components/FileImport/loadFile'
import { FileImportConfig } from '@/app/client/components/FileImport/types'
import { errorAlert } from '@/app/client/modules/utils/utils'
import { useGlobalStore } from '@/app/client/state/state'

export function EyeTrackingLoadQuestionsPage(): React.ReactElement {
  const { setState } = useGlobalStore()
  const navigate = useNavigate()

  // TODO: Remove once state is split up
  useEffect(() => {
    setState({
      importMode: 'single',
      expectedArtifact: 'questions',
      expectedExtensions: ['csv'],
    })
  }, [setState])

  function removeQuestionFile(_file: File) {
    // Remove questions from state when file is removed
    setState({ questions: undefined })
  }

  async function handleLoad() {
    // Check if there are files to load (FileImport component manages this)
    // We need to load the questions file first, then navigate
    const { questions: currentQuestions } = useGlobalStore.getState()

    if (
      !currentQuestions ||
      (Array.isArray(currentQuestions) && currentQuestions.length === 0)
    ) {
      const msg = 'No questions file to load. Please drop a questions file first.'
      errorAlert(msg)
      console.error(msg)
      return
    }

    // Questions are already loaded (from the drop), just navigate
    navigate(ROUTES.EYE_TRACKING_EXPERIMENT)
  }

  function handleDrop(files: File[], config: FileImportConfig) {
    if (files.length > 1) {
      const msg = 'only a single file can be imported'
      console.error(msg)
      errorAlert(msg)
      return
    }

    // Load the questions file immediately when dropped
    // This will populate the questions in state, which allows the file item to be displayed
    loadFiles(files, config)
  }

  return (
    <FileImport
      mode='data-collection'
      importMode='single'
      expectedArtifact='questions'
      expectedExtensions={['csv']}
      uploadLabel='Drop a questions csv file'
      onDrop={handleDrop}
      onSubmit={handleLoad}
      onRemove={removeQuestionFile}
      renderItem={(file) => <QuestionFileItem file={file} />}
    />
  )
}

function QuestionFileItem({ file }: { file: File }) {
  // Always show the file name - the file is in the FileImport component's local state
  return <div className='column file-info'>{file.name}</div>
}
