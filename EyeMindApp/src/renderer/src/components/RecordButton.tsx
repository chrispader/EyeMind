import LANG from '@renderer/LANG'
import recordDisabledIcon from '@renderer/assets/icons/record_disabled.svg'
import recordEnabledIcon from '@renderer/assets/icons/record_enabled.svg'

import { ToggleButton } from './ToggleButton'

export interface RecordButtonProps {
  /** When true, recording is in progress and the button is inactive */
  isRecording: boolean
  /** Path to open when not recording (e.g. recording settings). Omit to render as non-link when not recording. */
  to?: string
  id?: string
  className?: string
  size?: number | { width: number; height: number }
  style?: React.CSSProperties
}

/**
 * Record control: link to settings when idle, disabled appearance when recording.
 * Uses record_enabled icon when not recording and record_disabled when recording.
 */
export function RecordButton({
  isRecording,
  to = '/experiment/recording-settings',
  id = 'record-btn',
  className = 'icon',
  size = 20,
  style,
}: RecordButtonProps): React.ReactElement {
  return (
    <ToggleButton
      id={id}
      className={className}
      iconPressed={recordDisabledIcon}
      iconUnpressed={recordEnabledIcon}
      pressed={isRecording}
      ariaLabel={LANG.iconRecord}
      title={LANG.iconRecord}
      to={isRecording ? undefined : to}
      disabled={isRecording}
      size={size}
      style={style}
    />
  )
}
