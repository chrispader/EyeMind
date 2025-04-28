const files = []

export function setFiles(vals) {
  Array.from(vals).forEach((val) => files.push(val))
}

export function shiftFile() {
  return files.shift()
}

export function nFiles() {
  return files.length
}
