import { getState } from '@root/src/app/server/node/DataModels/state'

export async function getServerState() {
  return getState()
}
