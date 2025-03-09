import { getState } from '@root/src/app/server/node/dataModels/state'

export async function getServerState() {
  return getState()
}
