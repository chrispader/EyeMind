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
} from '@/app/modules/utils/dom'
import { errorAlert, infoAlert } from '@/app/modules/utils/utils'
import { useGlobalStore } from '@/app/state/state'
import { assignModelsToGroups } from '../../components/FileImport/loadFile'
import { mapGazestoElementsFromPageSnapshotListener } from './mapping'
import { hideGeneralWaitingScreen, showGeneralWaitingScreen } from './progress'
import { updateProcessMessageListener } from './progress'
import { generateQuestionsSequence } from './questions'
import { startQuestions } from './questions'
import { loadModels } from './shared-interactions'
import { setMainTab, setUnclosableTabs } from './tabs'

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

/**
 * Title:save Eye-tracking session interaction
 *
 * Description: saving the current data collection session settings into a file that can be loaded for a later data collection
 *
 * @param {void} . .
 *
 * Returns {void}
 *
 *
 * Additional notes: none
 *
 */
async function saveSessionInteraction() {
  const { setState, ...state } = useGlobalStore.getState()

  if (areRequiredFieldsEntered()) {
    setState({
      processedGazeData: {
        xScreenDim: (document.getElementById('x-dim') as HTMLInputElement).value,
        yScreenDim: (document.getElementById('y-dim') as HTMLInputElement).value,
        screenDistance: (document.getElementById('screen-distance') as HTMLInputElement)
          .value,
        monitorSize: (document.getElementById('monitor-size') as HTMLInputElement).value,
        experimentID: (document.getElementById('experiment-id') as HTMLInputElement)
          .value,
        experimenterID: (document.getElementById('experimenter-id') as HTMLInputElement)
          .value,
        additionalNotes: (document.getElementById('additional-notes') as HTMLInputElement)
          .value,
      },
    })

    const res = await window.utils.saveSession(state)

    if (res.success) {
      infoAlert(res.msg)
    } else {
      errorAlert(res.msg)
    }
  }
}

/**
 * Title: prepare the loaded content view for data collection
 *
 * Description: prepare the loaded content view for data collection
 *
 * @param {booleam} filePropertiesDefined allows to set unclosable tabs if not already defined (that is the case when you load a session)
 *
 * Returns {void}
 *
 *
 * Additional notes: none
 *
 */
function prepareDataCollectionContent(filePropertiesDefined: boolean) {
  // showing file explorer, loading models, questions and configuring tables

  const state = useGlobalStore.getState()
}

/**
 * Title: closing the start ET modal by settings its display to none
 *
 * Description:closing the start ET modal by settings its display to none
 *
 * @param {void} . .
 *
 * Returns {void}
 *
 *
 * Additional notes: none
 *
 */
function closeStartETModalInteraction() {
  console.log('closeStartETModalInteraction', arguments)

  /// hide startET modal
  document.getElementById('startET-modal').style.display = 'none'
}

/**
 * Title: start eye-tracking recording
 *
 * Description: a flow that executes when you press start eye-tracking recording
 *
 * @param {void} . .
 *
 * Returns {void}
 *
 *
 * Additional notes: none
 *
 */
async function startETInteraction() {
  console.log('startETInteraction', arguments)

  if (areRequiredFieldsEntered()) {
    let setup = false

    try {
      await setupTracking(
        document.getElementById('x-dim').value,
        document.getElementById('y-dim').value,
      )
      setup = true
    } catch (error) {
      const msg =
        'Cannot setup the eye-tracking session. Please make sure that the eye-tracking server is running.'
      errorAlert(msg)
      console.error(msg)
    }

    // console.log("setup",setup)

    if (setup) {
      // prevent another click on submit-recording-form by setting submit-recording-form interaction to null
      document.getElementById('submit-recording-form').onclick = null

      // set record-btn interaction to null
      document.getElementById('record-btn').onclick = null

      // initiate ET session
      await initiateETsession()

      // hide startET-modal
      document.getElementById('startET-modal').style.display = 'none'

      // update ET icons and cursor
      document.getElementById('record-btn').src = 'icons/record_disabled.svg'
      document.getElementById('record-btn').style.cursor = 'default'
      document.getElementById('stop-btn').src = 'icons/stop_enabled.svg'
      document.getElementById('stop-btn').style.cursor = 'pointer'

      // set stop-btn interaction
      document.getElementById('stop-btn').onclick = () => stopETInteraction()

      try {
        // start tracking
        startTracking(Date.now(), document.body.innerHTML, window.screenX, window.screenY)

        /*          // show main tab
          console.log("state.linkingSubProcessesMode",state.linkingSubProcessesMode)
          if(state.linkingSubProcessesMode=="withinTab") {
            openMainTab("display",true,false);
          }
          else {
            openMainTab("display",false,false);
          }*/

        // start questions - show first question
        startQuestions()
      } catch (error) {
        const msg = 'Eror when starting the eye-tracking'
        errorAlert(msg)
        console.error(msg)
      }
    }
  }
}

/**
 * Title: checking if all the required fields are entered
 *
 * Description: checking if all the required fields are entered
 *
 * @param {void} . .
 *
 * Returns {void}
 *
 *
 * Additional notes: none
 *
 */
function areRequiredFieldsEntered() {
  // console.log("areRequiredFieldsEntered",arguments);

  if (
    document.getElementById('recording-id').value == '' ||
    isNaN(Number(document.getElementById('x-dim').value)) ||
    document.getElementById('x-dim').value == '' ||
    isNaN(Number(document.getElementById('y-dim').value)) ||
    document.getElementById('y-dim').value == '' ||
    isNaN(Number(document.getElementById('screen-distance').value)) ||
    document.getElementById('screen-distance').value == '' ||
    isNaN(Number(document.getElementById('monitor-size').value)) ||
    document.getElementById('monitor-size').value == ''
  ) {
    errorAlert('Some required fields are missing or invalid')
    return false
  }

  return true
}

/**
 * Title: initiate eye-tracking session by setting a set of settings to state
 *
 * Description: initiate eye-tracking session by setting a set of settings to state
 *
 * @param {void} . .
 *
 * Returns {void}
 *
 *
 * Additional notes: none
 *
 */
async function initiateETsession() {
  const { setState } = useGlobalStore.getState()

  const styleParameters = await saveStyleParameters()

  setState({
    styleParameters,
    processedGazeData: {
      xScreenDim: (document.getElementById('x-dim') as HTMLInputElement).value,
      yScreenDim: (document.getElementById('y-dim') as HTMLInputElement).value,
      screenDistance: (document.getElementById('screen-distance') as HTMLInputElement)
        .value,
      monitorSize: (document.getElementById('monitor-size') as HTMLInputElement).value,
      recordingID: (document.getElementById('recording-id') as HTMLInputElement).value,
      participantID: (document.getElementById('participant-id') as HTMLInputElement)
        .value,
      experimentID: (document.getElementById('experiment-id') as HTMLInputElement).value,
      experimenterID: (document.getElementById('experimenter-id') as HTMLInputElement)
        .value,
      additionalNotes: (document.getElementById('additional-notes') as HTMLInputElement)
        .value,
      gazeData: '',
    },
  })
}

/**
 * Title: Save style parameters
 *
 * Description: Save CSS style parameters
 *
 * @param {void} . .
 *
 * Returns {void}
 *
 *
 * Additional notes: this is used for reconstructing the snapshots allowing in turn to correct the gazes mapping later
 *
 */
async function saveStyleParameters() {
  let stylesContent = ''

  const styles = document.querySelectorAll('link')
  for (let i = 0; i < styles.length; i++) {
    const url = styles[i].getAttribute('href')
    // console.log("url",url);
    const data = await fetch(url)
    const text = await data.text()

    stylesContent += ' ' + text
  }

  // console.log("stylesContent",stylesContent);
  return stylesContent
}

/**
 * Title: setup tracking
 *
 * Description: setup the communication with the eye-tracking server
 *
 * @param {string} xScreenDim screen dimension on the x axis
 * @param {string} yScreenDim screen dimension on the y axis
 *
 * Returns {void}
 *
 *
 * Additional notes: none
 *
 */
async function setupTracking(xScreenDim: number, yScreenDim: number) {
  console.log('setupTracking function')

  const res = await window.eyeTracker.setupTracking(xScreenDim, yScreenDim)
  console.log('res', res)
  if (!res.success) {
    throw res.msg
  }
}

/**
 * Title: start tracking
 *
 * Description: start eye-tracking and take a snasphot
 *
 * @param {string} timestamp current timestamp
 * @param {string} code HTML code of the current page
 * @param {string} screenX window.screenX
 * @param {string} screenY window.screenY
 *
 * Returns {void}
 *
 *
 * Additional notes: none
 *
 */
function startTracking(
  timestamp: number,
  code: string,
  screenX: number,
  screenY: number,
) {
  // console.log("startTracking function ",arguments);

  const { setState } = useGlobalStore.getState()

  setState({
    isEtOn: true,
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

function takesnapshot(timestamp: number, code: string, screenX: number, screenY: number) {
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
    timestamp,
    code,
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

    snapshot.boundingClientRect = JSON.stringify(svg.getBoundingClientRect())
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
    window.clientTests.lastSnapshot = snapshot
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
async function sendSnapshotID(snapshot) {
  console.log('sendSnapshotID', arguments)

  const res = await window.eyeTracker.sendSnapshotID(snapshot)
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
async function sendFullSnapshot(snapshot) {
  console.log('sendFullSnapshot ', arguments)

  const res = await window.eyeTracker.sendFullSnapshot(snapshot)
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
async function stopETInteraction() {
  console.log('stopETInteraction', arguments)

  const state = useGlobalStore.getState()

  // set stop-btn interaction to null
  document.getElementById('stop-btn').onclick = null

  // update ET icons and cursor
  document.getElementById('stop-btn').src = 'icons/stop_disabled.svg'
  document.getElementById('stop-btn').style.cursor = 'default'

  // show waiting screen
  await showGeneralWaitingScreen(
    'Please wait while the gaze data is being processed<br>Do not resize this window',
    'wait',
    'all-content',
  )

  // intiate progress report
  const progressWindow = initiateProgressWindow(state.styleParameters)

  // save to window
  if (!window.hasOwnProperty('externalProgressWindows'))
    window.externalProgressWindows = {}
  const externalProgressWindow = 'Window' + Date.now()
  window.externalProgressWindows[externalProgressWindow] = progressWindow

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
function endTracking(externalProgressWindow) {
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
function processGazeData(externalProgressWindow) {
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
function initiateProgressWindow(styleParameters) {
  console.log('initiateProgressWindow', arguments)

  const progressWindow = window.open(
    'about:blank',
    '',
    '_blank, width=500, height=200, directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no',
  )

  // clone document.getElementById("wait-processing-gaze-data")
  const waitProcessingGazeData = document.getElementById('wait').cloneNode(true)

  // append to the pop-up window
  progressWindow.document.body.appendChild(waitProcessingGazeData)

  // remove wait-icon
  progressWindow.document.getElementById('wait-icon').remove()

  // add style
  progressWindow.document.head.innerHTML = '<style>' + styleParameters + '</style>'

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
function completeProcessingListener() {
  console.log('completeProcessingListener', arguments)

  window.eyeTracker.onCompleteProcessingListener(async function (args) {
    console.log('onCompleteProcessingListener', arguments)
    const externalProgressWindow = args[0]
    const msg = args[1]
    const success = args[2]
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
async function completeProcessing(externalProgressWindow, msg, success) {
  console.log('completeProcessing', arguments)

  // close progress report
  window.externalProgressWindows[externalProgressWindow].close()

  // move to finished-processing-gaze-data
  document.getElementById('all-content').style.display = 'none'
  await hideGeneralWaitingScreen('finished-processing-gaze-data', 'wait')

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

export {
  prepareDataCollectionContent,
  takesnapshot,
  stopETInteraction,
  importQuestionsInteraction,
}
