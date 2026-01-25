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
 * Find the main tab and set it as a main tab
 */
export function setMainTab() {
  const { setState, ...state } = useGlobalStore.getState()

  const setAsMainRadioBoxList = document.getElementsByClassName(
    'set-as-main',
  ) as HTMLCollectionOf<HTMLInputElement>

  for (let i = 0; i < setAsMainRadioBoxList.length; i++) {
    const checked = setAsMainRadioBoxList[i]?.checked ?? false
    if (checked) {
      const modelId = setAsMainRadioBoxList[i]?.getAttribute('modelId')
      if (modelId == null || state.models == null) {
        continue
      }

      const model = state.models[modelId]
      if (model == null) {
        continue
      }

      setState({
        models: {
          ...state.models,
          [modelId]: {
            ...model,
            mainTab: checked,
          },
        },
      })
    }
  }
}

/**
 * Find the unclosable tabs and set the property to be unclosable to them
 */
export function setUnclosableTabs() {
  const { setState, ...state } = useGlobalStore.getState()

  const setUnclosableTabCheckBoxList = document.getElementsByClassName(
    'unclosable-tab',
  ) as HTMLCollectionOf<HTMLInputElement>

  for (let i = 0; i < setUnclosableTabCheckBoxList.length; i++) {
    const checked = setUnclosableTabCheckBoxList[i]?.checked ?? false
    if (checked) {
      const modelId = setUnclosableTabCheckBoxList[i]?.getAttribute('modelId')
      if (modelId == null || state.models == null) {
        continue
      }

      const model = state.models[modelId]
      if (model == null) {
        continue
      }

      setState({
        models: {
          ...state.models,
          [modelId]: {
            ...model,
            unclosable: checked,
          },
        },
      })
    }
  }
}
