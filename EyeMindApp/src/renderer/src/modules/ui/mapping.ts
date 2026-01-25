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
import { getSnapshots, setSnapshots } from '../../state/snapshots'

function mapGazestoElementsFromPageSnapshotListener() {
  window.eyeTracker.onMapGazestoElementsFromPageSnapshot(function (args) {
    console.log('mapGazestoElementsFromPageSnapshot', arguments)
    const gazeData = args[0] as unknown[]
    const start = args[1] as number
    const gazeDataSize = args[2] as number
    const externalProgressWindow = args[3]
    const snapshots = args[4]

    if (snapshots != null) {
      console.log('snapshots set')
      setSnapshots(snapshots)
    }

    const dataMapped = mapGazestoElementsFromPageSnapshot(gazeData as GazePoint[])
    window.eyeTracker.dataMapped(dataMapped, start, gazeDataSize, externalProgressWindow)
  })
}

type GazePoint = {
  x?: number
  y?: number
  snapshotId?: number
  tabName?: string
  element?: string
}

function mapGazestoElementsFromPageSnapshot(gazeData: GazePoint[]) {
  console.log('mapGazestoElementsFromPageSnapshot function ', arguments)

  const snapshots = getSnapshots()
  if (!snapshots) return []

  let currentSnapshotID = -1
  const dataMapped: GazePoint[] = []

  const gazeDataLength = gazeData.length

  for (let i = 0; i < gazeDataLength; i++) {
    const gazepoint = gazeData[i]

    // console.log("gazepoint x,y ",gazepoint.x,gazepoint.y);
    // with gazepoint.x!=null  &&  gazepoint.y!=null && gazepoint.snapshotId != null question event markers are exclued from the mapping
    if (
      gazepoint.x != null &&
      gazepoint.y != null &&
      gazepoint.snapshotId != null &&
      gazepoint.snapshotId != -1 &&
      snapshots[gazepoint.snapshotId] != null
    ) {
      if (currentSnapshotID != gazepoint.snapshotId) {
        currentSnapshotID = gazepoint.snapshotId
        document.body.innerHTML = snapshots[currentSnapshotID].code
        // // // console.log("snapshot loaded", currentSnapshotID);
      }
      /// set tabName
      gazepoint.tabName = snapshots[currentSnapshotID].tabName
      // map gaze point to elements
      gazepoint.element =
        doMapping(
          gazepoint.x,
          gazepoint.y,
          snapshots[currentSnapshotID].screenX,
          snapshots[currentSnapshotID].screenY,
        ) ?? ''
    } else {
      gazepoint.tabName = ''
      gazepoint.element = ''
    }

    //add gaze points
    dataMapped.push(gazepoint)
  }

  //console.log("dataMapped ",dataMapped);

  return dataMapped
}

function mapGazetoElementsFromSvgSnapshot(rX: number, rY: number, snapshotSvg: DocumentOrShadowRoot, screenX: number, screenY: number) {
  // console.log("mapGazestoElementsFromSvgSnapshot function,",arguments);

  return doMapping(rX, rY, screenX, screenY, snapshotSvg)
}

function doMapping(x: number, y: number, screenX: number, screenY: number, container?: DocumentOrShadowRoot) {
  // console.log("doMapping function ",arguments);

  const effectiveContainer = container || document

  // console.log("container",effectiveContainer);

  const relativeX = x - screenX
  const relativeY = y - screenY

  const target = effectiveContainer.elementFromPoint(relativeX, relativeY)

  // console.log("relativeX, relativeY", relativeX, relativeY);
  // console.log("target",target);

  const selector = 'svg, .djs-element, .gaze-element'

  const delegateTarget = closest(target, selector, true)

  const out = delegateTarget != null ? delegateTarget.getAttribute('data-element-id') : ''

  // console.log("x: ",x,", y: ",y, ", mapped to: ",out);

  return out
}

function closest(element: Element | null, selector: string, checkYourSelf: boolean): Element | null {
  // console.log("closest function ",arguments);

  if (!element) return null

  let currentElem: Element | null = checkYourSelf ? element : (element.parentElement ?? null)

  while (currentElem) {
    if (currentElem.matches(selector)) {
      return currentElem
    }
    currentElem = currentElem.parentElement
  }

  return null
}

function matchesSelector(el: Element | null, selector: string): boolean {
  // console.log("matchesSelector function ",arguments);

  if (!el || el.nodeType !== 1) return false
  return el.matches(selector)
}

export {
  mapGazestoElementsFromPageSnapshot,
  mapGazestoElementsFromPageSnapshotListener,
  mapGazetoElementsFromSvgSnapshot,
}
