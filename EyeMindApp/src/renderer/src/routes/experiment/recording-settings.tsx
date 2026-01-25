import { createFileRoute } from '@tanstack/react-router'
import { ModalContainer } from '../../components/ModalContainer'
import { InputField, TextareaField, SubmitButton } from '../../components/form'

export const Route = createFileRoute('/experiment/recording-settings')({
  component: RecordingSettingsPage,
})

function RecordingSettingsPage(): React.ReactElement {
  return (
    <ModalContainer
      id="startET-modal"
      className="startET-modal"
      title="Data Collection Settings"
      closeId="close-startET-modal">
      <InputField label=" X Screen dimension in pixels*: " id="x-dim" />
      <InputField label=" Y Screen dimension in pixels*: " id="y-dim" />
      <InputField label=" Screen distance in centimeters*: " id="screen-distance" />
      <InputField label=" Monitor size in inches*: " id="monitor-size" />
      <InputField label=" Recording ID*: " id="recording-id" />
      <InputField label=" Participant ID: " id="participant-id" />
      <InputField label=" Experiment ID: " id="experiment-id" />
      <InputField label=" Experimenter ID:" id="experimenter-id" />
      <TextareaField label=" Additional notes: " id="additional-notes" />

      <div className="row">
        <div style={{ textAlign: 'center' }}>
          <input
            type="submit"
            className="submit-form-button"
            id="submit-recording-form"
            value="Start recording"
          />
          <input type="submit" className="save-session" id="save-session" value="Save Session" />
        </div>
      </div>

      <div className="row">
        <div style={{ textAlign: 'center' }}>* required fields</div>
      </div>
    </ModalContainer>
  )
}
