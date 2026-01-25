import LANG from '@renderer/LANG'
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
      title={LANG.gazeProjectionSettings}
      closeId="close-gaze-projection">
      <InputField
        label={LANG.gazeSampleSize}
        id="gaze-sample-size-in-percentage"
        defaultValue="20"
        suffix="%"
      />

      <SelectField label={LANG.participantFile} id="participant-file-gaze-projection">
        <option value="">{LANG.select}</option>
      </SelectField>

      <SubmitButton id="submit-gaze-projection-form" value={LANG.generateGazeProjections} />

      <div className="row">
        <div id="info-gaze-projections" className="info-gaze-projections">
          {LANG.gazeProjectionsInfo}
        </div>
      </div>
    </ModalContainer>
  )
}
