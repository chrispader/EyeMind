import { getState } from '@/renderer/server/node/dataModels/state'

export async function getServerState() {
  return getState()
}
