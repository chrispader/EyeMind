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
import { useGlobalStore } from '@renderer/state/global'

/**
 * Send click event to the eye-tracking server
 *
 * @param clickTimestamp timestamp when the click occurred
 * @param clickedElement clicked element identifier
 */
async function sendClickEvent(clickTimestamp: number, clickedElement: string) {
  console.log('sendClickEvent', arguments)

  const state = useGlobalStore.getState()

  if (state.isEtOn) {
    const res = (await window.eyeTracker.sendClickEvent(
      clickTimestamp,
      clickedElement,
    )) as {
      success: boolean
      msg?: string
    }
    if (!res.success) {
      console.error(res.msg)
    }

    // for testing purpose - store last click for test verification
    window.clientTests.lastRelevantClick = {
      clickTimestamp: clickTimestamp,
      clickedElement: clickedElement,
    }
  }
}

export { sendClickEvent }
