import LANG from '@renderer/LANG'
import { createFileRoute } from '@tanstack/react-router'
import { ModalContainer } from '../../components/ModalContainer'
import { InputField, TextareaField } from '../../components/form'

export const Route = createFileRoute('/experiment/recording-settings')({
  component: RecordingSettingsPage,
})

function RecordingSettingsPage(): React.ReactElement {
  return (
    <ModalContainer
      id="startET-modal"
      className="startET-modal"
      title={LANG.dataCollectionSettings}
      closeId="close-startET-modal">
      <InputField label={LANG.xScreenDimension} id="x-dim" />
      <InputField label={LANG.yScreenDimension} id="y-dim" />
      <InputField label={LANG.screenDistance} id="screen-distance" />
      <InputField label={LANG.monitorSize} id="monitor-size" />
      <InputField label={LANG.recordingId} id="recording-id" />
      <InputField label={LANG.participantId} id="participant-id" />
      <InputField label={LANG.experimentId} id="experiment-id" />
      <InputField label={LANG.experimenterId} id="experimenter-id" />
      <TextareaField label={LANG.additionalNotes} id="additional-notes" />

      <div className="row">
        <div style={{ textAlign: 'center' }}>
          <input
            type="submit"
            className="submit-form-button"
            id="submit-recording-form"
            value={LANG.startRecording}
          />
          <input type="submit" className="save-session" id="save-session" value={LANG.saveSession} />
        </div>
      </div>

      <div className="row">
        <div style={{ textAlign: 'center' }}>{LANG.requiredFields}</div>
      </div>
    </ModalContainer>
  )
}
