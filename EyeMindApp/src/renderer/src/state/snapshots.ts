export type Snapshot = {
  code: string
  tabName: string
  screenX: number
  screenY: number
}

let snapshots: Record<number, Snapshot> | null = null

function setSnapshots(val: unknown) {
  snapshots = val as Record<number, Snapshot> | null
}

function getSnapshots(): Record<number, Snapshot> | null {
  return snapshots
}

export { setSnapshots, getSnapshots }
