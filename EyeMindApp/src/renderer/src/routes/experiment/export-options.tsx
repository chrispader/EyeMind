import LANG from '@renderer/LANG'
import { createFileRoute } from '@tanstack/react-router'

import { ModalContainer } from '../../components/ModalContainer'
import { SelectField, SubmitButton } from '../../components/form'

export const Route = createFileRoute('/experiment/export-options')({
  component: ExportOptionsPage,
})

function ExportOptionsPage(): React.ReactElement {
  return (
    <ModalContainer
      id='download-modal'
      className='download-modal'
      title={LANG.exportOptions}
      closeId='close-download'>
      <SelectField label={LANG.fileType} id='download-file-type'>
        <option value='analysis-data'>{LANG.analysisFile}</option>
        <option value='gaze-data'>{LANG.gazeData}</option>
        <option value='fixation-data'>{LANG.fixationData}</option>
      </SelectField>

      <SubmitButton id='submit-download-form' value={LANG.download} />
    </ModalContainer>
  )
}
