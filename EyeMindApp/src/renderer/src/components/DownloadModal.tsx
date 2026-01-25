import React from 'react'
import { ModalContainer } from './ModalContainer'
import { SelectField, SubmitButton } from './form'

export function DownloadModal(): React.ReactElement {
  return (
    <ModalContainer
      id="download-modal"
      className="download-modal"
      title="Export Options"
      closeId="close-download"
      visible={false}>
      <SelectField label="File type " id="download-file-type">
        <option value="analysis-data">Analysis File</option>
        <option value="gaze-data">Gaze Data</option>
        <option value="fixation-data">Fixation Data</option>
      </SelectField>

      <SubmitButton id="submit-download-form" value="Download" />
    </ModalContainer>
  )
}
