import LANG from '@renderer/LANG'
import { containerClasses } from '@renderer/css/styles'
import {
  SUB_PROCESS_LINKING_MODES,
  type SubProcessLinkingMode,
} from '@renderer/model/settings'
import { useSessionActions } from '@renderer/state/session'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

import { Route as loadModelsRoute } from './load-models'

export const Route = createFileRoute('/config/eye-tracking/new-session')({
  component: EyeTrackingNewSessionPage,
})

function EyeTrackingNewSessionPage(): React.ReactElement {
  const { updateSessionSettings } = useSessionActions()
  const navigate = useNavigate()

  const [subProcessLinkingMode, setSubProcessLinkingMode] =
    useState<SubProcessLinkingMode>('no-support')

  const proceedWithAdvancedSettings = () => {
    updateSessionSettings({
      subProcessLinkingMode: subProcessLinkingMode,
    })

    navigate({ to: loadModelsRoute.to })
  }

  return (
    <div className={containerClasses} id='data-collection-settings-view'>
      <div className='data-collection-settings-box' id='data-collection-settings-box'>
        <div id='settings' className='settings'>
          <h2>{LANG.advancedSettings}</h2>

          <div className='row'>
            <div className='column'>
              <span className='text-container'>{LANG.linkingSubProcesses}</span>
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
            {LANG.linkingSubProcessesInfo}
          </div>
        </div>

        <div className='proceed-data-collection-settings-btn-container'>
          <button
            className='proceed-data-collection-settings-btn'
            id='proceed-data-collection-settings'
            onClick={proceedWithAdvancedSettings}>
            {LANG.proceed}
          </button>
        </div>
      </div>
    </div>
  )
}
