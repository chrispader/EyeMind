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
import { takesnapshot } from './snapshot'

/**
 * Handle window refresh - clears state and removes fullscreen
 */
export function handleWindowRefresh() {
  window.electron.removeFullScreen()
  window.state.clearState()
  window.state.clearStates()
}

/**
 * Take snapshot when the app window is resized
 */
export function takeSnapshotOnWindowResize() {
  window.electron.onBrowserResize(function (_message) {
    takesnapshot(Date.now(), document.body.innerHTML, window.screenX, window.screenY)
  })
}

/**
 * Take snapshot when the app window is moved
 */
export function takeSnapshotOnWindowMovement() {
  window.electron.onBrowserMovement(function (_message) {
    takesnapshot(Date.now(), document.body.innerHTML, window.screenX, window.screenY)
  })
}

/**
 * Disable critical keys - prevent ctrl and alt except refresh (ctrl+R) and dev tools (ctrl+shift+I)
 */
export function DisableCriticalKeys() {
  window.onkeydown = function (evt) {
    if ((evt.ctrlKey || evt.altKey) && evt.keyCode != 82 && evt.keyCode != 73) {
      evt.preventDefault()
    }
  }
}
