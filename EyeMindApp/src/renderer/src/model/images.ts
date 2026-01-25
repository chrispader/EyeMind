import type { Draftable } from '../types/Draftable'

export type ImageFile = Draftable & {
  id: string
  fileName: string
  path?: string
  dataUrl: string // Base64 data URL for displaying the image
  file: File
  groupId?: string
}

export function getImageIdFromFileName(fileName: string): string {
  return fileName.replace(/[\W_.]/g, '')
}

export function createDefaultImageFile(
  file: File,
  dataUrl: string,
  isDraft: boolean = false,
): ImageFile {
  return {
    id: getImageIdFromFileName(file.name),
    fileName: file.name,
    path: file.path,
    dataUrl,
    file,
    isDraft,
  }
}

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
