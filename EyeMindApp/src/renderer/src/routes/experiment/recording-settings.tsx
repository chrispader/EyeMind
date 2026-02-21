import { zodResolver } from '@hookform/resolvers/zod'
import LANG from '@renderer/LANG'
import { ModalContainer } from '@renderer/components/ModalContainer'
import { InputField, TextareaField } from '@renderer/components/form'
import {
  useRecordingActions,
  useRecordingSettings,
  useSessionActions,
} from '@renderer/state/session'
import {
  type RecordingSettings,
  RecordingSettingsSchema,
} from '@renderer/state/session/recording'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export const Route = createFileRoute('/experiment/recording-settings')({
  component: RecordingSettingsPage,
})

const MODAL_ID = 'startET-modal'
const CLOSE_BTN_ID = 'close-startET-modal'

interface RecordingFieldConfig {
  /** Used as form key, DOM id, and key into LANG.FORM.RECORDING_SETTINGS for the label. */
  key: keyof RecordingSettings
  type: 'input' | 'textarea'
}

const RECORDING_FIELDS: RecordingFieldConfig[] = [
  { key: 'xScreenDimension', type: 'input' },
  { key: 'yScreenDimension', type: 'input' },
  { key: 'screenDistance', type: 'input' },
  { key: 'monitorSize', type: 'input' },
  { key: 'recordingId', type: 'input' },
  { key: 'participantId', type: 'input' },
  { key: 'experimentId', type: 'input' },
  { key: 'experimenterId', type: 'input' },
  { key: 'additionalNotes', type: 'textarea' },
]

function RecordingSettingsPage(): React.ReactElement {
  const router = useRouter()
  const recordingSettings = useRecordingSettings()
  const { updateRecordingSettings } = useRecordingActions()
  const { getSessionData } = useSessionActions()

  const {
    control,
    handleSubmit: handleFormSubmit,
    formState: { isValid },
  } = useForm({
    resolver: zodResolver(RecordingSettingsSchema),
    mode: 'onChange',
    defaultValues: {
      xScreenDimension: recordingSettings?.xScreenDimension.toString(),
      yScreenDimension: recordingSettings?.yScreenDimension.toString(),
      screenDistance: recordingSettings?.screenDistance.toString(),
      monitorSize: recordingSettings?.monitorSize.toString(),
      recordingId: recordingSettings?.recordingId ?? `R${Date.now()}`,
      participantId: recordingSettings?.participantId,
      experimentId: recordingSettings?.experimentId,
      experimenterId: recordingSettings?.experimenterId,
      additionalNotes: recordingSettings?.additionalNotes,
    },
  })

  const closeModal = () => router.history.back()

  const startRecording = (data: RecordingSettings) => {
    updateRecordingSettings(data)
    closeModal()
  }

  const saveSession = async (data: RecordingSettings) => {
    updateRecordingSettings(data)

    try {
      const sessionData = getSessionData()
      const result = await window.session.saveSession(sessionData)
      if (!result.success) {
        toast.error(LANG.errorFailedToSaveSession)
        return
      }

result.data

      toast.success(LANG.sessionSaved, result.data.)

      closeModal()
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
      onClose={closeModal}>
      <form
        onSubmit={handleFormSubmit(startRecording)}
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
                    invalid={invalid}
                    error={errorMessage}
                    {...field}
                  />
                ) : (
                  <InputField
                    label={label}
                    id={fieldConfig.key}
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
              onClick={handleFormSubmit(startRecording)}
              className='w-[35%] cursor-pointer rounded-sm border-none bg-remove-btn px-2.5 py-3.5 text-white hover:bg-success disabled:cursor-not-allowed disabled:opacity-50'>
              {LANG.startRecording}
            </button>
            <button
              type='button'
              id='save-session'
              onClick={handleFormSubmit(saveSession)}
              disabled={!canSubmit}
              className='w-[35%] cursor-pointer rounded-sm border-none bg-secondary px-2.5 py-3.5 text-white hover:bg-warning disabled:cursor-not-allowed disabled:opacity-50'>
              {LANG.saveSession}
            </button>
          </div>
        </div>
      </form>
    </ModalContainer>
  )
}
