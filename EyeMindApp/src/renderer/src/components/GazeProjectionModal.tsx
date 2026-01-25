import React from 'react'
import { ModalContainer } from './ModalContainer'
import { InputField, SelectField, SubmitButton } from './form'

export function GazeProjectionModal(): React.ReactElement {
  return (
    <ModalContainer
      id="gaze-projection-modal"
      className="gaze-projection-modal"
      title="Gaze Projection Settings"
      closeId="close-gaze-projection"
      visible={false}>
      <InputField
        label="Gaze sample Size* "
        id="gaze-sample-size-in-percentage"
        defaultValue="20"
        suffix="%"
      />

      <SelectField label="Participant (File) " id="participant-file-gaze-projection">
        <option value="">Select</option>
      </SelectField>

      <SubmitButton id="submit-gaze-projection-form" value="Generate Gaze Projections" />

      <div className="row">
        <div id="info-gaze-projections" className="info-gaze-projections">
          *For better performance, it is recommended to choose a small sample size.
        </div>
      </div>
    </ModalContainer>
  )
}
