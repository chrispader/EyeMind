import { zodResolver } from '@hookform/resolvers/zod'
import LANG from '@renderer/LANG'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

import { ModalContainer } from '../../components/ModalContainer'
import { InputField, TextareaField } from '../../components/form'
import { useSessionActions } from '../../state/session'

export const Route = createFileRoute('/experiment/recording-settings')({
  component: RecordingSettingsPage,
})

const MODAL_ID = 'startET-modal'
const CLOSE_BTN_ID = 'close-startET-modal'

/** Required: non-empty string. Used for all fields that show " *" in the label. */
const requiredString = z.string().min(1, 'Required')
const optionalString = z.string().optional()

const recordingSettingsSchema = z.object({
  xScreenDimension: requiredString,
  yScreenDimension: requiredString,
  screenDistance: requiredString,
  monitorSize: requiredString,
  recordingId: requiredString,
  participantId: optionalString,
  experimentId: optionalString,
  experimenterId: optionalString,
  additionalNotes: optionalString,
})

type RecordingSettingsFormValues = z.infer<typeof recordingSettingsSchema>

const defaultValues: RecordingSettingsFormValues = {
  xScreenDimension: '',
  yScreenDimension: '',
  screenDistance: '',
  monitorSize: '',
  recordingId: `R${Date.now()}`,
  participantId: '',
  experimentId: '',
  experimenterId: '',
  additionalNotes: '',
}

type RecordingFieldKey = keyof RecordingSettingsFormValues

interface RecordingFieldConfig {
  /** Used as form key, DOM id, and key into LANG.FORM.RECORDING_SETTINGS for the label. */
  key: RecordingFieldKey
  required: boolean
  type: 'input' | 'textarea'
}

const RECORDING_FIELDS: RecordingFieldConfig[] = [
  { key: 'xScreenDimension', required: true, type: 'input' },
  { key: 'yScreenDimension', required: true, type: 'input' },
  { key: 'screenDistance', required: true, type: 'input' },
  { key: 'monitorSize', required: true, type: 'input' },
  { key: 'recordingId', required: true, type: 'input' },
  { key: 'participantId', required: false, type: 'input' },
  { key: 'experimentId', required: false, type: 'input' },
  { key: 'experimenterId', required: false, type: 'input' },
  { key: 'additionalNotes', required: false, type: 'textarea' },
]

function RecordingSettingsPage(): React.ReactElement {
  const navigate = useNavigate({ from: '/experiment/recording-settings' })
  const { getSessionData } = useSessionActions()

  const {
    control,
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
      const sessionData = getSessionData()
      await window.utils.saveSession(sessionData)
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
        {RECORDING_FIELDS.map((fieldConfig) => {
          const label = `${LANG.FORM.RECORDING_SETTINGS[fieldConfig.key]}:`
          return (
            <Controller
              key={fieldConfig.key}
              name={fieldConfig.key}
              control={control}
              render={({ field, fieldState }) => {
                const invalid = fieldState.invalid
                const errorMessage = fieldState.error?.message
                return fieldConfig.type === 'textarea' ? (
                  <TextareaField
                    label={label}
                    id={fieldConfig.key}
                    required={fieldConfig.required}
                    invalid={invalid}
                    error={errorMessage}
                    {...field}
                  />
                ) : (
                  <InputField
                    label={label}
                    id={fieldConfig.key}
                    required={fieldConfig.required}
                    invalid={invalid}
                    error={errorMessage}
                    {...field}
                  />
                )
              }}
            />
          )
        })}

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
