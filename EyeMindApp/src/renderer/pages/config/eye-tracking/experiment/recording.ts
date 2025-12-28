import { useGlobalStore } from '@/renderer/state/global'

/**
 * Title: record eye-tracking interaction
 *
 * Description: a flow that executes when you press eye-tracking recording icon, here the startET-modal opens and prompts the user for some settings
 *
 * @param {void} . .
 *
 * Returns {void}
 *
 *
 * Additional notes: none
 *
 */
export function recordETInteraction() {
  // const state = useStateStore.getState()

  // load recording form data (would work if a existing session is load)
  loadRecordingFormData()

  // set default recordingID
  document.getElementById('recording-id').value = 'R' + Date.now()

  // show StartET modal
  document.getElementById('startET-modal').style.display = 'block'

  //////// the following should be removed in production mode
  // show main tab
  /*  if(state.linkingSubProcessesMode=="withinTab") {
    openMainTab("display",true);
  }
  else {
    openMainTab("display",false);
  }
  state.isEtOn = true;*/
  /////////////////////////////////////////////////////
}

/**
 * Title: load recording form data
 *
 * Description: load recording form data from a session file
 *
 * @param {void} . .
 *
 * Returns {void}
 *
 *
 * Additional notes: none
 *
 */
function loadRecordingFormData() {
  const state = useGlobalStore.getState()

  if (state.processedGazeData === undefined) {
    return
  }

  if (state.processedGazeData.hasOwnProperty('xScreenDim'))
    document.getElementById('x-dim').value = state.processedGazeData['xScreenDim']
  if (state.processedGazeData.hasOwnProperty('yScreenDim'))
    document.getElementById('y-dim').value = state.processedGazeData['yScreenDim']
  if (state.processedGazeData.hasOwnProperty('screenDistance'))
    document.getElementById('screen-distance').value =
      state.processedGazeData['screenDistance']
  if (state.processedGazeData.hasOwnProperty('monitorSize'))
    document.getElementById('monitor-size').value = state.processedGazeData['monitorSize']
  if (state.processedGazeData.hasOwnProperty('experimentID'))
    document.getElementById('experiment-id').value =
      state.processedGazeData['experimentID']
  if (state.processedGazeData.hasOwnProperty('experimenterID'))
    document.getElementById('experimenter-id').value =
      state.processedGazeData['experimenterID']
  if (state.processedGazeData.hasOwnProperty('additionalNotes'))
    document.getElementById('additional-notes').value =
      state.processedGazeData['additionalNotes']
}
