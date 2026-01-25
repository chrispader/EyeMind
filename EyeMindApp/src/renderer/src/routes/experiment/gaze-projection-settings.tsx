import { createFileRoute } from '@tanstack/react-router'
import { ModalContainer } from '../../components/ModalContainer'
import { InputField, SelectField, SubmitButton } from '../../components/form'

export const Route = createFileRoute('/experiment/gaze-projection-settings')({
  component: GazeProjectionSettingsPage,
})

function GazeProjectionSettingsPage(): React.ReactElement {
  return (
    <ModalContainer
      id="gaze-projection-modal"
      className="gaze-projection-modal"
      title="Gaze Projection Settings"
      closeId="close-gaze-projection">
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
