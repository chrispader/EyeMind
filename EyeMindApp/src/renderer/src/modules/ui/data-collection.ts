/*MIT License

Copyright (c) 2022 Eye-Mind Tool (Author: Amine Abbad-Andaloussi)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.*/
/*  data-collection with the support of eye-tracking   */
import {
  hideChildElements,
  moveFromTo,
  updateTextAndDisplayDomElement,
} from '@renderer/modules/utils/dom'
import { errorAlert, infoAlert } from '@renderer/modules/utils/utils'
import { useGlobalStore } from '@renderer/state/global'

import { mapGazestoElementsFromPageSnapshotListener } from './mapping'
import { hideGeneralWaitingScreen, showGeneralWaitingScreen } from './progress'
import { updateProcessMessageListener } from './progress'

type IpcResult = { success: boolean; msg?: string }

/**
 * Title: import questions interactions
 *
 * Description: provide settings allowing to import questions
 *
 * Control-flow summary: moving to import-view, hide the previous content of "upload-zone" (coming from models upload), setting "upload-label", getting client state and providing settings allowing to import questions
 *
 * @param {void} . .
 *
 * Returns {void}
 *
 *
 * Additional notes: none
 *
 */
function importQuestionsInteraction() {
  // move to iport-view
  moveFromTo('data-collection-session-options-view', 'import-view', 'flex')
  // clear upload-zone. This is because importQuestionsInteraction comes after importModelsInteraction
  hideChildElements('upload-zone')
  // upload-label in import view
  updateTextAndDisplayDomElement('upload-label', 'Drop questions csv files', 'block')

  // get client state
  const { setState } = useGlobalStore.getState()

  setState({
    importMode: 'single',
    temp: {
      expectedArtifact: 'questions',
      expectedExtensions: ['csv'],
    },
  })
}


type Snapshot = {
  id: number
  tabName: string | undefined
  timestamp: number
  code: string
  screenX: number
  screenY: number
  boundingClientRect: string | null
}

/**
 * Title: take snapshot
 *
 * Description: take a snapshot of the current window
 *
 * @param {string} timestamp timestamp of the snapshot
 * @param {string} code current HTML code of the page
 * @param {int} screenX window.screenX
 * @param {int} screenY window.screenY
 *
 * Returns {void}
 *
 *
 * Additional notes: As of 24/09/22 screenX,screenY parameters are ignored and set to 0 by default*.
 *                   the snapshot object is exposed in window.clientTests for testing purpose.
 *
 */

function takesnapshot(_timestamp: number, _code: string, _screenX: number, _screenY: number): void {
  const { setState, ...state } = useGlobalStore.getState()
  console.log('state to be used in snapshot', state)

  // check that eye-tracking is still on recording
  if (!state.isEtOn) {
    console.log('snapshot not taken,  isEtOn=', state.isEtOn)
    return
  }

  // create snapshot
  const snapshot: Snapshot = {
    id: state.snapshotsCounter ?? 0,
    tabName: state.activeTab,
    timestamp: Date.now(),
    code: document.body.innerHTML,
    screenX: 0,
    screenY: 0,
    boundingClientRect: null,
  }

  // dm
  if (snapshot.tabName != null && snapshot.tabName != '') {
    // find shownTab i.e., a tab with .tab-container and display==flex. There should be always one tab satisfying this condition
    const shownTabs = Array.from(document.querySelectorAll('.tab-container')).filter(
      (s) => window.getComputedStyle(s).getPropertyValue('display') == 'flex', // 'block'
    )

    // find svg object with svg[data-element-id]
    const svg = shownTabs[0].querySelector('svg[data-element-id]')

    // console.log("shownTabs",shownTabs);
    // console.log("selected svg",svg);

    snapshot.boundingClientRect = svg ? JSON.stringify(svg.getBoundingClientRect()) : null
    // console.log("snapshot.boundingClientRect",snapshot.boundingClientRect)
  } else {
    snapshot.boundingClientRect = null
  }

  //console.log("taken snapshot ",snapshot.id,", for tab ",snapshot.tabName);
  console.log('taken snapshot', snapshot)

  // send snapshot id to the eye-tracking server
  sendSnapshotID(snapshot)

  // send full snapshot to the eye-tracking server
  sendFullSnapshot(snapshot)

  // update snapshots snapshotsCounter
  setState({
    snapshotsCounter: (state.snapshotsCounter ?? 0) + 1,
  })

  // console.log("new snapshotCounter", state.snapshotsCounter);
  // console.log("new state ",state);

  // for testing purpose
  if ('clientTests' in window) {
    ;(window.clientTests as typeof window.clientTests & { lastSnapshot?: Snapshot }).lastSnapshot = snapshot
  }
}

/**
 * Title: send snapshot id
 *
 * Description: send snapshot id to the eye-tracking server (through the server side)
 *
 * @param {object} snapshot snapshot object
 *
 * Returns {void}
 *
 *
 * Additional notes: none
 *
 */
async function sendSnapshotID(snapshot: Snapshot): Promise<void> {
  console.log('sendSnapshotID', arguments)

  const res = (await window.eyeTracker.sendSnapshotID(snapshot)) as IpcResult
  if (!res.success) {
    console.error(res.msg)
  }
}

/**
 * Title: send the full snapshot object
 *
 * Description: send the full snapshot object to the eye-tracking server (through the server side)
 *
 * @param {object} snapshot snapshot object
 *
 * Returns {void}
 *
 *
 * Additional notes: none
 *
 */
async function sendFullSnapshot(snapshot: Snapshot): Promise<void> {
  console.log('sendFullSnapshot ', arguments)

  const res = (await window.eyeTracker.sendFullSnapshot(snapshot)) as IpcResult
  if (!res.success) {
    console.error(res.msg)
  }
}

/**
 * Title: stop eye-tracking interaction
 *
 * Description: a flow that executes when you process the stop recording icon
 *
 * @param {void} . .
 *
 * Returns {void}
 *
 *
 * Additional notes: none
 *
 */
async function stopETInteraction(): Promise<void> {
  console.log('stopETInteraction', arguments)

  const state = useGlobalStore.getState()

  // set stop-btn interaction to null
  const stopBtn = document.getElementById('stop-btn') as HTMLImageElement | null
  if (stopBtn) {
    stopBtn.onclick = null
    // update ET icons and cursor
    stopBtn.src = 'icons/stop_disabled.svg'
    stopBtn.style.cursor = 'default'
  }

  // show waiting screen
  await showGeneralWaitingScreen(
    'Please wait while the gaze data is being processed<br>Do not resize this window',
  )

  // intiate progress report
  const progressWindow = initiateProgressWindow(state.styleParameters)

  // save to window
  if (!window.hasOwnProperty('externalProgressWindows'))
    window.externalProgressWindows = {}
  const externalProgressWindow = 'Window' + Date.now()
  if (progressWindow) window.externalProgressWindows[externalProgressWindow] = progressWindow

  // initiate update process message listener
  updateProcessMessageListener()

  /// lunch endTracking procedure
  endTracking(externalProgressWindow)

  // completeProcessingListener
  completeProcessingListener()
}

/**
 * Title: end tracking
 *
 * Description: end tracking flow
 *
 * @param {string} id of the externalProgressWindow
 *
 * Returns {void}
 *
 *
 * Additional notes: none
 *
 */
function endTracking(externalProgressWindow: string): void {
  console.log('endTracking function ', arguments)

  const { setState } = useGlobalStore.getState()

  setState({
    isEtOn: false,
  })

  // processing gaze data
  processGazeData(externalProgressWindow)
}

/**
 * Title: process gaze data
 *
 * Description: process gaze data flow
 *
 * @param {string} id of the externalProgressWindow
 *
 * Returns {void}
 *
 *
 * Additional notes: none
 *
 */
function processGazeData(externalProgressWindow: string): void {
  console.log('processGazeData function ', arguments)

  const state = useGlobalStore.getState()

  mapGazestoElementsFromPageSnapshotListener()

  window.eyeTracker.processGazeData(state, externalProgressWindow)

  /*    const res = await window.eyeTracker.processGazeData(state,externalDocumentName);
    if(!res.success){
      console.error(res.msg);
    }*/
}

/**
 * Title: initiate progress window
 *
 * Description: intitate the window meant to show the progress of the gaze mapping
 *
 * @param {string} styleParameters style parameters for the progress iwndow
 *
 * Returns {void}
 *
 *
 * Additional notes: the progress of the gaze mapping is coming from the server side (see progress)
 *
 */
function initiateProgressWindow(styleParameters: string | undefined): Window | null {
  console.log('initiateProgressWindow', arguments)

  const progressWindow = window.open(
    'about:blank',
    '',
    '_blank, width=500, height=200, directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no',
  )

  if (!progressWindow) return null

  // clone document.getElementById("wait-processing-gaze-data")
  const waitProcessingGazeData = document.getElementById('wait')?.cloneNode(true)

  // append to the pop-up window
  if (waitProcessingGazeData) progressWindow.document.body.appendChild(waitProcessingGazeData)

  // remove wait-icon
  progressWindow.document.getElementById('wait-icon')?.remove()

  // add style
  progressWindow.document.head.innerHTML = '<style>' + (styleParameters ?? '') + '</style>'

  return progressWindow
}

/**
 * Title: complete processing listener
 *
 * Description: a listener called when the gaze mapping is over
 *
 * @param {void} . .
 *
 * Returns {void}
 *
 *
 * Additional notes: none
 *
 */
function completeProcessingListener(): void {
  console.log('completeProcessingListener', arguments)

  window.eyeTracker.onCompleteProcessingListener(async function (args: unknown[]) {
    console.log('onCompleteProcessingListener', arguments)
    const externalProgressWindow = args[0] as string
    const msg = args[1] as string
    const success = args[2] as boolean
    await completeProcessing(externalProgressWindow, msg, success)
  })
}

/**
 * Title: complete processing
 *
 * Description: a flow that executes when the gaze mapping is over
 *
 * @param {void} . .
 *
 * Returns {void}
 *
 *
 * Additional notes: none
 *
 */
async function completeProcessing(externalProgressWindow: string, msg: string, success: boolean): Promise<void> {
  console.log('completeProcessing', arguments)

  // close progress report
  window.externalProgressWindows[externalProgressWindow]?.close()

  // move to finished-processing-gaze-data
  const allContent = document.getElementById('all-content') as HTMLElement | null
  if (allContent) allContent.style.display = 'none'
  await hideGeneralWaitingScreen()

  // remove full screen mode
  if (window.hasOwnProperty('electron')) {
    window.electron.removeFullScreen()
  }

  if (success) {
    infoAlert(msg)
  } else {
    errorAlert(msg)
  }
}

/**
 * Title: prepare the loaded content view for data collection
 *
 * Description: prepare the loaded content view for data collection
 *
 * @param {booleam} _filePropertiesDefined allows to set unclosable tabs if not already defined (that is the case when you load a session)
 *
 * Returns {void}
 *
 *
 * Additional notes: Now a no-op stub - content view preparation is handled in React
 *
 */
function prepareDataCollectionContent(_filePropertiesDefined: boolean): void {
  // No-op: content preparation now handled in React routes
}

export {
  prepareDataCollectionContent,
  takesnapshot,
  stopETInteraction,
  importQuestionsInteraction,
}
