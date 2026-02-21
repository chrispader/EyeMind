import type { GlobalState } from '@/types/GlobalState'

/* inits */
let state: GlobalState = {
  snapshotsCounter: 0,
  activeTab: undefined,
  processedGazeData: {},
  isEtOn: false,
  models: {},
  mode: undefined,
  temp: undefined,
  linkingSubProcessesMode: undefined,
  questions: undefined,
  snapshots: {},
}

let states: Record<string, GlobalState> = {}

/* data collection */

export function getState() {
  return state
}

export function setState(newState: GlobalState) {
  state = newState
}

export function clearState() {
  state = {
    snapshotsCounter: 0,
    activeTab: undefined,
    processedGazeData: {},
    isEtOn: false,
    models: {},
    mode: undefined,
    temp: { expectedArtifact: '', expectedExtensions: [] },
    linkingSubProcessesMode: undefined,
    questions: undefined,
    snapshots: {},
  }
}

/* Analysis */

export function getStates() {
  return states
}

export function clearStates() {
  states = {}
}

export function addState(filepath: string, state: GlobalState) {
  states[filepath] = state
}

export function removeState(filePath: string) {
  delete states[filePath]
}

export function doesStateExist(filePath: string) {
  return states.hasOwnProperty(filePath)
}

export function getSnapshotsOfState(filePath: string) {
  return states[filePath].snapshots
}

export function getStyleParametersOfState(filePath: string) {
  console.log(filePath)
  console.log(states[filePath].styleParameters)
  return states[filePath].styleParameters
}

export function setAreGazesCorrectedOfState(filePath: string, val: boolean) {
  const stateAtPath = states[filePath]
  if (stateAtPath.processedGazeData) {
    stateAtPath.processedGazeData.areGazesCorrected = val
  }
}

export function areAreGazesCorrectedOfState(filePath: string) {
  return states[filePath].processedGazeData.areGazesCorrected
}

export function getQuestions() {
  return state.questions
}
