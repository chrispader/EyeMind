/*MIT License

Copyright (c) 2022 Eye-Mind Tool (Author: Amine Abbad-Andaloussi)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.*/

/**
 * ImageViewer - A simple component for viewing image files in the application
 *
 * This provides a simple wrapper for displaying PNG files within the application's
 * existing UI framework.
 */

// Define interfaces for better type safety
interface ViewboxInfo {
  x: number
  y: number
  width: number
  height: number
  scale: number
}

class ImageViewer {
  public container: string
  public language: string
  private element: HTMLElement | null
  private zoom = 1
  private dragStartX = 0
  private dragStartY = 0
  private offsetX = 0
  private offsetY = 0
  private isDragging = false

  constructor(options: { container: string }) {
    this.container = options.container
    this.language = 'Png'
    this.element = document.querySelector(this.container)
    this.setupEventListeners()
  }

  /**
   * Import the image data
   * @param imageData - Base64 encoded image data
   */
  async importImage(imageData: string): Promise<void> {
    if (this.element == null) {
      throw new Error('Container element not found')
    }

    // Create an img element
    const img = document.createElement('img')
    img.className = 'image-viewer-content'
    img.src = imageData
    img.style.width = '100%'
    img.style.height = 'auto'
    img.style.transform = 'scale(1)'
    img.style.transformOrigin = 'center center'
    img.style.position = 'relative'

    // Clear container and append image
    this.element.innerHTML = ''
    this.element.appendChild(img)

    // Add viewport div for consistent API with BPMN viewer
    const viewport = document.createElement('div')
    viewport.className = 'viewport'
    this.element.appendChild(viewport)

    // Add overlay container for consistent API with BPMN viewer
    const overlayContainer = document.createElement('div')
    overlayContainer.className = 'djs-overlay-container'
    this.element.appendChild(overlayContainer)

    return Promise.resolve()
  }

  /**
   * Get a fake registry to maintain API compatibility with the BPMN viewer
   */
  get(registryName: string): unknown {
    // Return a minimal compatible interface to avoid errors
    if (registryName === 'elementRegistry') {
      return { getAll: () => [] }
    }
    if (registryName === 'overlays') {
      return {
        // Implement stub methods that match the API
        add: (): string => '',
        remove: (): void => undefined,
        get: (): [] => [],
      }
    }
    return {}
  }

  /**
   * Simulate the event listener API of the BPMN viewer
   */
  on(event: string, callback: (context: { viewbox: ViewboxInfo }) => void): void {
    if (event === 'canvas.viewbox.changed' && this.element != null) {
      // Add event listeners to trigger this callback on zoom or pan
      const imgElement = this.element.querySelector(
        '.image-viewer-content',
      ) as HTMLElement | null

      if (imgElement == null) return

      imgElement.addEventListener('wheel', () => {
        callback({ viewbox: this.getViewbox() })
      })

      imgElement.addEventListener('mousemove', () => {
        if (this.isDragging) {
          callback({ viewbox: this.getViewbox() })
        }
      })
    }
  }

  /**
   * Get the current viewbox
   */
  private getViewbox(): ViewboxInfo {
    const width = this.element?.clientWidth ?? 0
    const height = this.element?.clientHeight ?? 0

    return {
      x: this.offsetX,
      y: this.offsetY,
      width,
      height,
      scale: this.zoom,
    }
  }

  /**
   * Set up event listeners for zoom and pan
   */
  private setupEventListeners(): void {
    if (this.element == null) return

    const element = this.element

    // Zoom with mouse wheel
    element.addEventListener('wheel', (e) => {
      e.preventDefault()
      const delta = e.deltaY > 0 ? -0.1 : 0.1
      this.zoom = Math.max(0.1, Math.min(3, this.zoom + delta))

      const imgElement = element.querySelector(
        '.image-viewer-content',
      ) as HTMLElement | null
      if (imgElement == null) return

      imgElement.style.transform = `scale(${this.zoom}) translate(${this.offsetX}px, ${this.offsetY}px)`
    })

    // Pan with mouse drag
    element.addEventListener('mousedown', (e) => {
      this.isDragging = true
      this.dragStartX = e.clientX
      this.dragStartY = e.clientY
    })

    element.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return

      const dx = (e.clientX - this.dragStartX) / this.zoom
      const dy = (e.clientY - this.dragStartY) / this.zoom

      this.offsetX += dx
      this.offsetY += dy

      this.dragStartX = e.clientX
      this.dragStartY = e.clientY

      const imgElement = element.querySelector(
        '.image-viewer-content',
      ) as HTMLElement | null
      if (imgElement == null) return

      imgElement.style.transform = `scale(${this.zoom}) translate(${this.offsetX}px, ${this.offsetY}px)`
    })

    element.addEventListener('mouseup', () => {
      this.isDragging = false
    })

    element.addEventListener('mouseleave', () => {
      this.isDragging = false
    })
  }
}

export default ImageViewer
