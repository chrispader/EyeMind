let localRpid = -1

export function setLocalRpid(val: number | undefined) {
  localRpid = val ?? -1
}

export function getLocalRpid() {
  return localRpid
}
