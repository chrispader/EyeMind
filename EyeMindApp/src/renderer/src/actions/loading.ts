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

import { CONST } from '@/CONST'

/**
 * Delay for a given number of milliseconds
 */
function delay(delayInMs: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(2)
    }, delayInMs)
  })
}

/**
 * Show general waiting screen with loading message
 */
async function showGeneralWaitingScreen(text: string) {
  const { setState } = useGlobalStore.getState()

  setState({ isLoading: true, loadingMessage: text })
  await delay(CONST.DELAY_FOR_RENDRING)
}

/**
 * Hide general waiting screen
 */
async function hideGeneralWaitingScreen() {
  const { setState } = useGlobalStore.getState()
  setState({ isLoading: false, loadingMessage: undefined })
  await delay(CONST.DELAY_FOR_RENDRING)
}

export {
  showGeneralWaitingScreen,
  hideGeneralWaitingScreen,
}
