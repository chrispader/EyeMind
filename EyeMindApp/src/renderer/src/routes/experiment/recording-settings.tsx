import { zodResolver } from '@hookform/resolvers/zod'
import LANG from '@renderer/LANG'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

import { ModalContainer } from '../../components/ModalContainer'
import { InputField, TextareaField } from '../../components/form'
import { useGlobalStore } from '../../state/global'

export const Route = createFileRoute('/experiment/recording-settings')({
  component: RecordingSettingsPage,
})

const MODAL_ID = 'startET-modal'
const CLOSE_BTN_ID = 'close-startET-modal'

/** Required: non-empty string. Used for all fields that show " *" in the label. */
const requiredString = z.string().min(1, 'Required')

const recordingSettingsSchema = z.object({
  xScreenDimension: requiredString,
  yScreenDimension: requiredString,
  screenDistance: requiredString,
  monitorSize: requiredString,
  recordingId: requiredString,
  participantId: requiredString,
  experimentId: requiredString,
  experimenterId: requiredString,
  additionalNotes: z.string().optional(),
})

type RecordingSettingsFormValues = z.infer<typeof recordingSettingsSchema>

const defaultValues: RecordingSettingsFormValues = {
  xScreenDimension: '',
  yScreenDimension: '',
  screenDistance: '',
  monitorSize: '',
  recordingId: '',
  participantId: '',
  experimentId: '',
  experimenterId: '',
  additionalNotes: '',
}

function RecordingSettingsPage(): React.ReactElement {
  const navigate = useNavigate({ from: '/experiment/recording-settings' })
  const store = useGlobalStore()
  const { setState: _setState, ...stateToSave } = store

  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { isValid },
  } = useForm<RecordingSettingsFormValues>({
    resolver: zodResolver(recordingSettingsSchema),
    mode: 'onChange',
    defaultValues,
  })

  const handleClose = () => {
    navigate({ to: '/experiment' })
  }

  const onStartRecording = () => {
    // TODO: apply form values to state, then start recording
    handleClose()
  }

  const onSaveSession = async () => {
    try {
      await window.utils.saveSession(stateToSave)
      handleClose()
    } catch {
      toast.error(LANG.errorFailedToSaveSession)
    }
  }

  const canSubmit = isValid

  return (
    <ModalContainer
      id={MODAL_ID}
      title={LANG.dataCollectionSettings}
      closeId={CLOSE_BTN_ID}
      onClose={handleClose}>
      <form
        onSubmit={handleFormSubmit(onStartRecording)}
        className='grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-1'>
        <InputField
          label={LANG.xScreenDimension}
          id='x-dim'
          required
          {...register('xScreenDimension')}
        />
        <InputField
          label={LANG.yScreenDimension}
          id='y-dim'
          required
          {...register('yScreenDimension')}
        />
        <InputField
          label={LANG.screenDistance}
          id='screen-distance'
          required
          {...register('screenDistance')}
        />
        <InputField
          label={LANG.monitorSize}
          id='monitor-size'
          required
          {...register('monitorSize')}
        />
        <InputField
          label={LANG.recordingId}
          id='recording-id'
          required
          {...register('recordingId')}
        />
        <InputField
          label={LANG.participantId}
          id='participant-id'
          required
          {...register('participantId')}
        />
        <InputField
          label={LANG.experimentId}
          id='experiment-id'
          required
          {...register('experimentId')}
        />
        <InputField
          label={LANG.experimenterId}
          id='experimenter-id'
          required
          {...register('experimenterId')}
        />
        <TextareaField
          label={LANG.additionalNotes}
          id='additional-notes'
          {...register('additionalNotes')}
        />

        <div className='col-span-2 flex flex-col gap-4'>
          <div className='flex justify-center gap-4'>
            <button
              type='submit'
              id='submit-recording-form'
              disabled={!canSubmit}
              className='w-[35%] cursor-pointer rounded-sm border-none bg-remove-btn px-2.5 py-3.5 text-white hover:bg-success disabled:cursor-not-allowed disabled:opacity-50'>
              {LANG.startRecording}
            </button>
            <button
              type='button'
              id='save-session'
              onClick={onSaveSession}
              disabled={!canSubmit}
              className='w-[35%] cursor-pointer rounded-sm border-none bg-secondary px-2.5 py-3.5 text-white hover:bg-warning disabled:cursor-not-allowed disabled:opacity-50'>
              {LANG.saveSession}
            </button>
          </div>
          <div className='text-center text-sm text-text-muted'>{LANG.requiredFields}</div>
        </div>
      </form>
    </ModalContainer>
  )
}
