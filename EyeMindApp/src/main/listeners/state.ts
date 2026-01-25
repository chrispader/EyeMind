import {
  areAreGazesCorrectedOfState,
  clearState,
  clearStates,
  doesStateExist,
  getQuestions,
  getSnapshotsOfState,
  getState,
  getStates,
  getStyleParametersOfState,
  removeState,
  setAreGazesCorrectedOfState,
} from '@renderer/server/node/dataModels/state'

import { createNamespaceRegistrar } from './ipc-helpers'

const register = createNamespaceRegistrar<'state'>()

export function stateListeners() {
  // No-arg handlers
  register.noArgs('getState', getState)
  register.noArgs('clearState', clearState)
  register.noArgs('getQuestions', getQuestions)
  register.noArgs('getStates', getStates)
  register.noArgs('clearStates', clearStates)

  // Single-arg handlers
  register.spread('getSnapshotsOfState', getSnapshotsOfState)
  register.spread('getStyleParametersOfState', getStyleParametersOfState)
  register.spread('removeState', removeState)
  register.spread('doesStateExist', doesStateExist)
  register.spread('areAreGazesCorrectedOfState', areAreGazesCorrectedOfState)

  // Multi-arg handlers
  register.spread('setAreGazesCorrectedOfState', setAreGazesCorrectedOfState)
}
