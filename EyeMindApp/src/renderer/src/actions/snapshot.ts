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
/*  Eye-tracking snapshot functionality   */
import { useGlobalStore } from '@renderer/state/global'

type IpcResult = { success: boolean; msg?: string }

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

function takesnapshot(
  _timestamp: number,
  _code: string,
  _screenX: number,
  _screenY: number,
): void {
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

    snapshot.boundingClientRect =
      svg != null ? JSON.stringify(svg.getBoundingClientRect()) : null
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
    ;(
      window.clientTests as typeof window.clientTests & { lastSnapshot?: Snapshot }
    ).lastSnapshot = snapshot
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

export { takesnapshot }
