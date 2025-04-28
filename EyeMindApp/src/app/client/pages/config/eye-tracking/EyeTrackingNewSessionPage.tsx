import { useCallback } from 'react'
import { useNavigate } from 'react-router'
import { ROUTES } from '@/app/client/ROUTES'
import { containerClasses } from '@/app/client/css/styles'
import { useStateStore } from '@/app/client/state/state'

export function EyeTrackingNewSessionPage(): React.ReactElement {
  const state = useStateStore((state) => state.state)
  const navigate = useNavigate()

  const handleProceedDataCollectionSettings = useCallback(() => {
    // set linkingSubProcessesMode
    const linkingSubProcessesSelect = document.getElementById('linking-sub-processes')
    state.linkingSubProcessesMode =
      linkingSubProcessesSelect.options[linkingSubProcessesSelect.selectedIndex].value

    navigate(ROUTES.EYE_TRACKING_NEW_SESSION_IMPORT)
  }, [])

  return (
    <div className={containerClasses} id="data-collection-settings-view">
      <div className="data-collection-settings-box" id="data-collection-settings-box">
        <div id="settings" className="settings">
          <h2>Advanced settings</h2>
          <div className="row">
            <div className="column">
              <span className="text-container">Linking of sub-processes*:</span>
            </div>
            <div className="column">
              <select id="linking-sub-processes" className="form-select">
                <option value="no">No support</option>
                <option value="newTab">Symbol links</option>
                <option value="withinTab">Breadcrumb navigation</option>
              </select>
            </div>
          </div>
          <div id="info-linking" className="info-link">
            *If linking is supported, then ids of the activities refering to collapsed
            sub-processes should be the same as the names of the corresponding BPMN files.
          </div>
        </div>
        <div className="proceed-data-collection-settings-btn-container">
          <button
            className="proceed-data-collection-settings-btn"
            id="proceed-data-collection-settings"
            onClick={handleProceedDataCollectionSettings}>
            Proceed
          </button>
        </div>
      </div>
    </div>
  )
}
