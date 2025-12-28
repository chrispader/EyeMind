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
import { CONST } from '@/CONST'
import { useGlobalStore } from '@/renderer/state/global'

/* progress */

/**
 * Title: update processing message listener
 *
 * Description: a listener for receving processing messages from the server side
 *
 * @param {void} .
 *
 * Returns {void}
 *
 *
 * Additional notes: none
 *
 */
function updateProcessMessageListener() {
  window.progress.onUpdateProcessingMessage(async function (args) {
    const msg = args[0]
    const externalProgressWindow = args[1]
    await updateProcessingMessage(msg, externalProgressWindow)
  })
}

/**
 * Title: update processing message
 *
 * Description: update the content of documentContainer.getElementById("wait-progress")
 *
 * @param {string} msg message to show
 * @param {object} the container of the "wait-progress" DOM object
 *
 * Returns {void}
 *
 *
 * Additional notes: none
 *
 */
async function updateProcessingMessage(msg: string, container: HTMLElement) {
  let documentContainer

  if (typeof container == 'string' && container != '') {
    documentContainer = window.externalProgressWindows[container].document
  } else {
    documentContainer = document
  }

  documentContainer.getElementById('wait-progress').innerHTML = msg

  await delay(CONST.DELAY_FOR_RENDRING)
}

/**
 * Title: delay
 *
 * Description: sleep for some milliseconds
 *
 * @param {int} delayInMs sleep time in milliseconds
 *
 * Returns {void}
 *
 *
 * Additional notes: none
 *
 */
function delay(delayInMs: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(2)
    }, delayInMs)
  })
}

/**
 * Title: show general waiting screen
 *
 * Description: show general waiting screen
 *
 * @param {string} text to display in document.getElementById("wait-title")
 * @param {string} show id of the DOM element to show
 * @param {string} hide id of the DOM element to hide
 *
 * Returns {void}
 *
 *
 * Additional notes: none
 *
 */
async function showGeneralWaitingScreen(text: string) {
  const { setState } = useGlobalStore.getState()

  setState({ isLoading: true, loadingMessage: text })
  await delay(CONST.DELAY_FOR_RENDRING)
}

/**
 * Title: hide general waiting screen
 *
 * Description: hide general waiting screen
 *
 * @param {string} show id of the DOM element to show
 * @param {string} hide id of the DOM element to hide
 *
 * Returns {void}
 *
 *
 * Additional notes: none
 *
 */
async function hideGeneralWaitingScreen() {
  const { setState } = useGlobalStore.getState()
  setState({ isLoading: false, loadingMessage: undefined })
  await delay(CONST.DELAY_FOR_RENDRING)
}

export {
  updateProcessingMessage,
  updateProcessMessageListener,
  showGeneralWaitingScreen,
  hideGeneralWaitingScreen,
}
