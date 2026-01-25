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

/**
 * Title: move from one view to another
 *
 * Description:  hide one DOM element and show another one
 *
 * Control-flow summary: hide one DOM element and show another one
 *
 * @param {string} fromDomElementId  the id of the dom element to hide
 * @param {string} toDomElementId  the id of the dom element to show
 * @param {string} toDomElementDisplayMode  the display mode (e.g., flex, block)
 *
 * Returns {void}
 *
 * Tests: none
 *
 * Additional notes: none
 *
 */

function moveFromTo(
  fromDomElementId: string,
  toDomElementId: string,
  toDomElementDisplayMode: string,
) {
  console.log('moveFromTo', arguments)

  hideElement(fromDomElementId)
  const toEl = document.getElementById(toDomElementId)
  if (toEl) toEl.style.display = toDomElementDisplayMode
}

/**
 * Title: update text and display dom element
 *
 * Description: update the text of a dom element and display it
 *
 * Control-flow summary:  update the text of a dom element and display it
 *
 * @param {string} domElementId  the id of the dom element to update
 * @param {string} text  new text
 * @param {string} domElementDisplayMode  the display mode (e.g., flex, block)
 *
 * Returns {void}
 *
 * Tests: none
 *
 * Additional notes: none
 *
 */

function updateTextAndDisplayDomElement(
  domElementId: string,
  text: string,
  domElementDisplayMode: string,
) {
  console.log('updateTextAndDisplayDomElement', arguments)

  const el = document.getElementById(domElementId)
  if (el) {
    el.innerText = text
    el.style.display = domElementDisplayMode
  }
}

/**
 * Title: display dom element
 *
 * Description: display dom element
 *
 * Control-flow summary:  display dom element
 *
 * @param {string} domElementId  the id of the dom element to display
 * @param {string} mode  display mode (e.g., block,flex)
 *
 * Returns {void}
 *
 * Tests: none
 *
 * Additional notes: none
 *
 */
function displayElement(domElementId: string, mode: string) {
  console.log('displayElement', arguments)

  if (mode != 'none') {
    const el = document.getElementById(domElementId)
    if (el) el.style.display = mode
  } else {
    console.error('Use hideElement() instead')
  }
}

/**
 * Title: hide html of child elements
 *
 * Description: hide html of child elements
 *
 * Control-flow summary:  iterate through the childs of an element, then for each child set child.style.display = "none"
 *
 * @param {string} domElementId  the id of the dom element
 *
 * Returns {void}
 *
 * Tests: none
 *
 * Additional notes: none
 *
 */

function hideChildElements(domElementId: string) {
  console.log('hideChildElements', arguments)

  const parentElement = document.getElementById(domElementId)
  if (parentElement) {
    for (const child of Array.from(parentElement.children) as HTMLElement[]) {
      child.style.display = 'none'
    }
  }
}

/**
 * Title: populate element with participant/file info
 *
 * Description: populate (select) element with participant/file info
 *
 * @param {string} targetDomId  id of the dom element to populate
 *
 * Returns {void}
 *
 * Tests: none
 *
 * Additional notes: none
 *
 */
async function populateParticipantFileSelect(targetDomId: string) {
  console.log('populateParticipantFileSelect', arguments)

  const pariticipantFileSelect = document.getElementById(targetDomId) as HTMLSelectElement | null
  if (!pariticipantFileSelect) return

  if (
    pariticipantFileSelect.options.length == 0 ||
    (pariticipantFileSelect.options.length == 1 &&
      pariticipantFileSelect.options[0].value == '')
  ) {
    const statesInfo = (await window.analysis.getStatesInfo()) as Record<string, string>

    for (const [key, participantID] of Object.entries(statesInfo)) {
      const opt = document.createElement('option')
      opt.value = key
      opt.innerHTML = participantID + ' (' + key + ')'
      pariticipantFileSelect.appendChild(opt)
    }
  }
}

/**
 * Title: get select values
 *
 * Description: get select values
 *
 * @param {string} selectId  id of the select dom element
 * @param {string} outType  return the value or the text of the select option
 *
 * Returns an array of the selected opion values
 *
 * Tests: none
 *
 * Additional notes: none
 *
 */
function getSelectValues(selectId: string, outType: 'value' | 'text') {
  const select = document.getElementById(selectId) as HTMLSelectElement | null
  const result: string[] = []
  if (!select) return null
  const options = select.options

  if (outType != 'value' && outType != 'text') {
    console.error('unsuported outType', outType)
    return null
  }

  for (let i = 0, iLen = options.length; i < iLen; i++) {
    const opt = options[i]

    if (opt.selected) {
      result.push(opt[outType])
    }
  }
  return result
}

/**
 * Title: update user configuration
 *
 * Description: update the chosen user configuration
 *
 * @param {object} userConfig  user configuration
 *
 * Returns {void}
 *
 * Tests: none
 *
 * Additional notes: none
 *
 */
function updateShownUserConfig(userConfig: Record<string, unknown>) {
  console.log('updateShownUserConfig', arguments)

  const el = document.getElementById('user-config-content')
  if (!el) return

  el.innerHTML = ''

  for (const [key, value] of Object.entries(userConfig)) {
    el.innerHTML +=
      '<span class=key>' + key + '</span>: <span class=value>' + value + '</span><br>'
  }
}

function hideElement(domElementId: string) {
  const el = document.getElementById(domElementId)
  if (el) el.style.display = 'none'
}

export {
  moveFromTo,
  updateTextAndDisplayDomElement,
  hideElement,
  hideChildElements,
  displayElement,
  populateParticipantFileSelect,
  getSelectValues,
  updateShownUserConfig,
}
