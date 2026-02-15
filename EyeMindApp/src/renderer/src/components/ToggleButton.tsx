import { Link } from '@tanstack/react-router'
import React from 'react'

import { Icon } from './Icon'

export interface ToggleButtonProps {
  /** Icon source when pressed/active */
  iconPressed: string
  /** Icon source when unpressed/inactive */
  iconUnpressed: string
  /** Whether the button is in the pressed (active) state */
  pressed: boolean
  /** Accessible label (required for buttons/links) */
  ariaLabel: string
  /** Optional tooltip */
  title?: string
  /** Called when the button is clicked (only when rendered as button and not disabled) */
  onClick?: () => void
  /** When set, render as Link to this path instead of a button */
  to?: string
  /** When true, button is non-interactive and shows disabled appearance */
  disabled?: boolean
  id?: string
  className?: string
  /** Icon size in pixels (applied to both dimensions if a number) */
  size?: number | { width: number; height: number }
  /** Extra inline styles (e.g. for layout) */
  style?: React.CSSProperties
}

/**
 * A togglable button that shows one of two icon states. Can render as a button
 * or as a Link when `to` is provided. Used for record/stop and similar controls.
 */
export function ToggleButton({
  iconPressed,
  iconUnpressed,
  pressed,
  ariaLabel,
  title,
  onClick,
  to,
  disabled = false,
  id,
  className = 'icon',
  size = 20,
  style,
}: ToggleButtonProps): React.ReactElement {
  const width = typeof size === 'number' ? size : size.width
  const height = typeof size === 'number' ? size : size.height
  const iconSrc = pressed ? iconPressed : iconUnpressed

  const icon = (
    <Icon
      src={iconSrc}
      alt={ariaLabel}
      width={width}
      height={height}
      className={className}
      title={title}
    />
  )

  const isInteractive = !disabled && (to != null || onClick != null)

  if (to != null && isInteractive) {
    return (
      <Link
        id={id}
        to={to}
        className={className}
        style={style}
        aria-label={ariaLabel}
        title={title}>
        {icon}
      </Link>
    )
  }

  return (
    <button
      type='button'
      id={id}
      className={className}
      style={style}
      aria-label={ariaLabel}
      title={title}
      disabled={disabled}
      onClick={onClick}>
      {icon}
    </button>
  )
}
