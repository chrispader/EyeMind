declare global {
  interface File {
    id: string
    isForTestingPurpose: boolean
    localFilePath: string
  }

  interface DataTransfer {
    isForTestingPurpose: boolean
  }
}
