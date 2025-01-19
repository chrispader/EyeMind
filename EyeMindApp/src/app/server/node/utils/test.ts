import { getState } from '@server/dataModels/state'

export async function getServerState() {
  return getState()
}
