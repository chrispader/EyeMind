import { createFileRoute } from '@tanstack/react-router'
import { ModalContainer } from '../../components/ModalContainer'
import { SelectField, SubmitButton } from '../../components/form'

export const Route = createFileRoute('/experiment/export-options')({
  component: ExportOptionsPage,
})

function ExportOptionsPage(): React.ReactElement {
  return (
    <ModalContainer
      id="download-modal"
      className="download-modal"
      title="Export Options"
      closeId="close-download">
      <SelectField label="File type " id="download-file-type">
        <option value="analysis-data">Analysis File</option>
        <option value="gaze-data">Gaze Data</option>
        <option value="fixation-data">Fixation Data</option>
      </SelectField>

      <SubmitButton id="submit-download-form" value="Download" />
    </ModalContainer>
  )
}
