/**
 * Image file utilities. Image content is stored as Model with dataUrl (see model/models.ts).
 */

export function isImageFile(file: File): boolean {
  const extension = file.name.split('.').pop()?.toLowerCase() ?? ''
  return ['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(extension)
}

export function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result
      if (typeof result === 'string') {
        resolve(result)
      } else {
        reject(new Error('Failed to read file as data URL'))
      }
    }
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsDataURL(file)
  })
}
