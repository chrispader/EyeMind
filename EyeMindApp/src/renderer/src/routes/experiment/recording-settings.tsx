import LANG from '@renderer/LANG'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

import { ModalContainer } from '../../components/ModalContainer'
import { InputField, TextareaField } from '../../components/form'

export const Route = createFileRoute('/experiment/recording-settings')({
  component: RecordingSettingsPage,
})

const MODAL_ID = 'startET-modal'
const CLOSE_BTN_ID = 'close-startET-modal'

function RecordingSettingsPage(): React.ReactElement {
  const navigate = useNavigate({ from: '/experiment/recording-settings' })

  useEffect(() => {
    const goBack = () => navigate({ to: '/experiment' })

    const closeBtn = document.getElementById(CLOSE_BTN_ID)
    const modalEl = document.getElementById(MODAL_ID)

    const onCloseClick = (e: Event) => {
      e.preventDefault()
      goBack()
    }

    const onBackdropClick = (e: MouseEvent) => {
      if (e.target === modalEl) goBack()
    }

    closeBtn?.addEventListener('click', onCloseClick)
    modalEl?.addEventListener('click', onBackdropClick)

    return () => {
      closeBtn?.removeEventListener('click', onCloseClick)
      modalEl?.removeEventListener('click', onBackdropClick)
    }
  }, [navigate])

  return (
    <ModalContainer
      id={MODAL_ID}
      className='startET-modal'
      title={LANG.dataCollectionSettings}
      closeId={CLOSE_BTN_ID}>
      <InputField label={LANG.xScreenDimension} id='x-dim' />
      <InputField label={LANG.yScreenDimension} id='y-dim' />
      <InputField label={LANG.screenDistance} id='screen-distance' />
      <InputField label={LANG.monitorSize} id='monitor-size' />
      <InputField label={LANG.recordingId} id='recording-id' />
      <InputField label={LANG.participantId} id='participant-id' />
      <InputField label={LANG.experimentId} id='experiment-id' />
      <InputField label={LANG.experimenterId} id='experimenter-id' />
      <TextareaField label={LANG.additionalNotes} id='additional-notes' />

      <div className='row'>
        <div style={{ textAlign: 'center' }}>
          <input
            type='submit'
            className='submit-form-button'
            id='submit-recording-form'
            value={LANG.startRecording}
          />
          <input
            type='submit'
            className='save-session'
            id='save-session'
            value={LANG.saveSession}
          />
        </div>
      </div>

      <div className='row'>
        <div style={{ textAlign: 'center' }}>{LANG.requiredFields}</div>
      </div>
    </ModalContainer>
  )
}
