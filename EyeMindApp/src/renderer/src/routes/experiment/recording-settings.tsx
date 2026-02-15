import LANG from '@renderer/LANG'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import toast from 'react-hot-toast'

import { ModalContainer } from '../../components/ModalContainer'
import { InputField, TextareaField } from '../../components/form'
import { useGlobalStore } from '../../state/global'

export const Route = createFileRoute('/experiment/recording-settings')({
  component: RecordingSettingsPage,
})

const MODAL_ID = 'startET-modal'
const CLOSE_BTN_ID = 'close-startET-modal'

function RecordingSettingsPage(): React.ReactElement {
  const navigate = useNavigate({ from: '/experiment/recording-settings' })
  const store = useGlobalStore()
  const { setState: _setState, ...stateToSave } = store

  const handleClose = () => {
    navigate({ to: '/experiment' })
  }

  const handleSubmit = () => {
    // TODO: validate form, apply values to state, then start recording
    handleClose()
  }

  const handleSaveSession = async () => {
    try {
      await window.utils.saveSession(stateToSave)
      handleClose()
    } catch {
      toast.error(LANG.errorFailedToSaveSession)
    }
  }

  return (
    <ModalContainer
      id={MODAL_ID}
      title={LANG.dataCollectionSettings}
      closeId={CLOSE_BTN_ID}
      onClose={handleClose}>
      <div className='grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-1'>
        <InputField label={LANG.xScreenDimension} id='x-dim' />
        <InputField label={LANG.yScreenDimension} id='y-dim' />
        <InputField label={LANG.screenDistance} id='screen-distance' />
        <InputField label={LANG.monitorSize} id='monitor-size' />
        <InputField label={LANG.recordingId} id='recording-id' />
        <InputField label={LANG.participantId} id='participant-id' />
        <InputField label={LANG.experimentId} id='experiment-id' />
        <InputField label={LANG.experimenterId} id='experimenter-id' />
        <TextareaField label={LANG.additionalNotes} id='additional-notes' />
      </div>

      <div className='flex flex-col gap-4'>
        <div className='flex justify-center gap-4'>
          <button
            type='button'
            id='submit-recording-form'
            onClick={handleSubmit}
            className='w-[35%] cursor-pointer rounded-sm border-none bg-remove-btn px-2.5 py-3.5 text-white hover:bg-success'>
            {LANG.startRecording}
          </button>
          <button
            type='button'
            id='save-session'
            onClick={handleSaveSession}
            className='w-[35%] cursor-pointer rounded-sm border-none bg-secondary px-2.5 py-3.5 text-white hover:bg-warning'>
            {LANG.saveSession}
          </button>
        </div>
        <div className='text-center text-sm text-text-muted'>{LANG.requiredFields}</div>
      </div>
    </ModalContainer>
  )
}
