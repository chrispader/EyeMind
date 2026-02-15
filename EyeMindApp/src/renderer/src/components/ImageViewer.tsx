import { useCallback, useEffect, useRef, useState } from 'react'

type ImageViewerProps = {
  src: string
  alt?: string
  className?: string
  minScale?: number
  maxScale?: number
}

type Transform = {
  scale: number
  x: number
  y: number
}

/**
 * ImageViewer component with zoom, pan, and gesture support.
 * Supports mouse wheel zoom, drag to pan, and touch gestures (pinch to zoom, pan).
 */
export function ImageViewer({
  src,
  alt = 'Image',
  className = '',
  minScale = 0.5,
  maxScale = 5,
}: ImageViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  const [transform, setTransform] = useState<Transform>({ scale: 1, x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [lastTouchDistance, setLastTouchDistance] = useState<number | null>(null)

  // Clamp scale to min/max bounds
  const clampScale = useCallback(
    (scale: number) => Math.min(Math.max(scale, minScale), maxScale),
    [minScale, maxScale],
  )

  // Handle mouse wheel zoom
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault()

      const container = containerRef.current
      if (container == null) return

      const rect = container.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top

      const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1
      const newScale = clampScale(transform.scale * zoomFactor)
      const scaleDiff = newScale / transform.scale

      // Zoom toward mouse position
      setTransform({
        scale: newScale,
        x: mouseX - (mouseX - transform.x) * scaleDiff,
        y: mouseY - (mouseY - transform.y) * scaleDiff,
      })
    },
    [transform, clampScale],
  )

  // Handle mouse down for dragging
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.button !== 0) return // Only left click
      setIsDragging(true)
      setDragStart({ x: e.clientX - transform.x, y: e.clientY - transform.y })
    },
    [transform.x, transform.y],
  )

  // Handle mouse move for dragging
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return

      setTransform((prev) => ({
        ...prev,
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      }))
    },
    [isDragging, dragStart],
  )

  // Handle mouse up to stop dragging
  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Get distance between two touch points
  const getTouchDistance = (touches: React.TouchList) => {
    if (touches.length < 2) return null
    const dx = touches[0].clientX - touches[1].clientX
    const dy = touches[0].clientY - touches[1].clientY
    return Math.sqrt(dx * dx + dy * dy)
  }

  // Handle touch start
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 1) {
        // Single touch - start panning
        setIsDragging(true)
        setDragStart({
          x: e.touches[0].clientX - transform.x,
          y: e.touches[0].clientY - transform.y,
        })
      } else if (e.touches.length === 2) {
        // Two fingers - start pinch zoom
        setLastTouchDistance(getTouchDistance(e.touches))
      }
    },
    [transform.x, transform.y],
  )

  // Handle touch move
  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault()

      if (e.touches.length === 1 && isDragging) {
        // Single touch - pan
        setTransform((prev) => ({
          ...prev,
          x: e.touches[0].clientX - dragStart.x,
          y: e.touches[0].clientY - dragStart.y,
        }))
      } else if (e.touches.length === 2 && lastTouchDistance !== null) {
        // Two fingers - pinch zoom
        const currentDistance = getTouchDistance(e.touches)
        if (currentDistance === null) return

        const container = containerRef.current
        if (container == null) return

        const rect = container.getBoundingClientRect()
        const centerX = (e.touches[0].clientX + e.touches[1].clientX) / 2 - rect.left
        const centerY = (e.touches[0].clientY + e.touches[1].clientY) / 2 - rect.top

        const scaleFactor = currentDistance / lastTouchDistance
        const newScale = clampScale(transform.scale * scaleFactor)
        const scaleDiff = newScale / transform.scale

        setTransform({
          scale: newScale,
          x: centerX - (centerX - transform.x) * scaleDiff,
          y: centerY - (centerY - transform.y) * scaleDiff,
        })

        setLastTouchDistance(currentDistance)
      }
    },
    [isDragging, dragStart, lastTouchDistance, transform, clampScale],
  )

  // Handle touch end
  const handleTouchEnd = useCallback(() => {
    setIsDragging(false)
    setLastTouchDistance(null)
  }, [])

  // Reset transform to fit image in container
  const resetTransform = useCallback(() => {
    setTransform({ scale: 1, x: 0, y: 0 })
  }, [])

  // Stop dragging when mouse leaves window
  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false)
    window.addEventListener('mouseup', handleGlobalMouseUp)
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp)
  }, [])

  return (
    <div className='relative w-full h-full'>
      <div
        ref={containerRef}
        className={`relative overflow-hidden cursor-grab ${isDragging ? 'cursor-grabbing' : ''} ${className}`}
        style={{ width: '100%', height: '100%' }}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}>
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          draggable={false}
          style={{
            transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
            transformOrigin: '0 0',
            userSelect: 'none',
            maxWidth: 'none',
          }}
        />
      </div>

      {/* Controls */}
      <div className='absolute bottom-4 right-4 flex gap-2'>
        <button
          type='button'
          onClick={() =>
            setTransform((prev) => ({
              ...prev,
              scale: clampScale(prev.scale * 1.2),
            }))
          }
          className='px-3 py-1 bg-white/80 hover:bg-white rounded shadow text-lg font-bold'
          title='Zoom in'>
          +
        </button>
        <button
          type='button'
          onClick={() =>
            setTransform((prev) => ({
              ...prev,
              scale: clampScale(prev.scale / 1.2),
            }))
          }
          className='px-3 py-1 bg-white/80 hover:bg-white rounded shadow text-lg font-bold'
          title='Zoom out'>
          -
        </button>
        <button
          type='button'
          onClick={resetTransform}
          className='px-3 py-1 bg-white/80 hover:bg-white rounded shadow text-sm'
          title='Reset zoom'>
          Reset
        </button>
      </div>

      {/* Scale indicator */}
      <div className='absolute bottom-4 left-4 px-2 py-1 bg-white/80 rounded shadow text-sm'>
        {Math.round(transform.scale * 100)}%
      </div>
    </div>
  )
}

export default ImageViewer
