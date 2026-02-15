import LANG from '@renderer/LANG'
import stopDisabledIcon from '@renderer/assets/icons/stop_disabled.svg'
import stopEnabledIcon from '@renderer/assets/icons/stop_enabled.svg'
import { ToggleButton } from './ToggleButton'

export interface StopButtonProps {
  /** When true, recording is in progress and the button is clickable */
  isRecording: boolean
  /** Called when the user clicks stop (only relevant when isRecording is true) */
  onStop?: () => void
  id?: string
  className?: string
  size?: number | { width: number; height: number }
  style?: React.CSSProperties
}

/**
 * Stop control: disabled appearance when not recording, active and clickable when recording.
 * Uses stop_enabled icon when recording and stop_disabled when idle.
 */
export function StopButton({
  isRecording,
  onStop,
  id = 'stop-btn',
  className = 'icon',
  size = 20,
  style,
}: StopButtonProps): React.ReactElement {
  return (
    <ToggleButton
      id={id}
      className={className}
      iconPressed={stopEnabledIcon}
      iconUnpressed={stopDisabledIcon}
      pressed={isRecording}
      ariaLabel={LANG.iconStop}
      title={LANG.iconStop}
      disabled={!isRecording}
      onClick={onStop}
      size={size}
      style={style}
    />
  )
}
