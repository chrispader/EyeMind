export {}

declare global {
  interface File {
    id: string
    isForTestingPurpose: boolean
    localFilePath: string
    /** Electron-specific: absolute path to the file */
    path: string
  }

  interface DataTransfer {
    isForTestingPurpose: boolean
  }
}
