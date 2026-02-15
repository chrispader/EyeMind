import React from 'react'

export interface IconProps {
  /** Image source (URL or imported asset path) */
  src: string
  /** Accessible description */
  alt: string
  width?: number | string
  height?: number | string
  className?: string
  id?: string
  title?: string
}

/**
 * Renders an icon image with consistent accessibility and optional dimensions.
 */
export function Icon({
  src,
  alt,
  width,
  height,
  className,
  id,
  title,
}: IconProps): React.ReactElement {
  const style: React.CSSProperties = {}
  if (width != null) style.width = typeof width === 'number' ? `${width}px` : width
  if (height != null) style.height = typeof height === 'number' ? `${height}px` : height

  return (
    <img
      id={id}
      className={className}
      src={src}
      alt={alt}
      title={title}
      style={Object.keys(style).length > 0 ? style : undefined}
    />
  )
}
