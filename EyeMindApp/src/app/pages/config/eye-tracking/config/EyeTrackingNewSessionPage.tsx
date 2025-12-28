import { useState } from 'react'
import { useNavigate } from 'react-router'
import { containerClasses } from '@/app/css/styles'
import {
  SUB_PROCESS_LINKING_MODES,
  type SubProcessLinkingMode,
} from '@/app/model/settings'
import { ROUTES_NAMES } from '@/app/routes'
import { useSessionActions } from '@/app/state/session'

export function EyeTrackingNewSessionPage(): React.ReactElement {
  const { updateSessionSettings } = useSessionActions()
  const navigate = useNavigate()

  const [subProcessLinkingMode, setSubProcessLinkingMode] =
    useState<SubProcessLinkingMode>('no-support')

  const proceedWithAdvancedSettings = () => {
    updateSessionSettings({
      subProcessLinkingMode: subProcessLinkingMode,
    })

    navigate(ROUTES_NAMES.EYE_TRACKING_NEW_LOAD_MODELS)
  }

  return (
    <div className={containerClasses} id='data-collection-settings-view'>
      <div className='data-collection-settings-box' id='data-collection-settings-box'>
        <div id='settings' className='settings'>
          <h2>Advanced settings</h2>

          <div className='row'>
            <div className='column'>
              <span className='text-container'>Linking of sub-processes*:</span>
            </div>

            <div className='column'>
              <select
                id='linking-sub-processes'
                className='form-select'
                onChange={(e) =>
                  setSubProcessLinkingMode(e.target.value as SubProcessLinkingMode)
                }>
                {SUB_PROCESS_LINKING_MODES.map((mode) => (
                  <option key={mode.value} value={mode.value}>
                    {mode.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div id='info-linking' className='info-link'>
            *If linking is supported, then ids of the activities refering to collapsed
            sub-processes should be the same as the names of the corresponding BPMN files.
          </div>
        </div>

        <div className='proceed-data-collection-settings-btn-container'>
          <button
            className='proceed-data-collection-settings-btn'
            id='proceed-data-collection-settings'
            onClick={proceedWithAdvancedSettings}>
            Proceed
          </button>
        </div>
      </div>
    </div>
  )
}
