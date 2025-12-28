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
/*  Shared interactions between data collection and anaylsis  */
import { useGlobalStore } from '@/renderer/state/global'

/**
 * Title: close the modal with clicks outside the modal area
 *
 * Description:  close the modal with clicks outside the modal area
 *
 * @param {object} event click event
 *
 * Returns {void}
 *
 *
 * Additional notes: none
 *
 */
function closeModalOutsideClickInteraction(event) {
  console.log('closeModalOutsideClickInteraction', arguments)

  if (
    event.target == document.getElementById('startET-modal') ||
    event.target == document.getElementById('heatmap-settings-modal') ||
    event.target == document.getElementById('download-modal')
  ) {
    event.target.style.display = 'none'
  }
}

export { closeModalOutsideClickInteraction }
