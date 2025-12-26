import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'
import 'bpmn-js/dist/assets/bpmn-js.css'
import 'bpmn-js/dist/assets/diagram-js.css'
import { useEffect } from 'react'
import { HashRouter, Route, Routes } from 'react-router'
import { ROUTES } from '@/app/client/ROUTES'
import { LoadingScreen } from '@/app/client/components/LoadingScreen'
import { ProcessingStates } from '@/app/client/components/ProcessingStates'
import '@/app/client/css/app.css'
import '@/app/client/css/main.css'
import '@/app/client/css/new.css'
import { AnalysisPage } from '@/app/client/pages/AnalysisPage'
import { HomePage } from '@/app/client/pages/HomePage'
import { ConfigPagesWrapper } from '@/app/client/pages/config/ConfigPagesWrapper'
import { EyeTrackingPage } from '@/app/client/pages/config/EyeTrackingPage'
import { EyeTrackingLoadModelsPage } from '@/app/client/pages/config/eye-tracking/config/EyeTrackingLoadModelsPage'
import { EyeTrackingLoadQuestionsPage } from '@/app/client/pages/config/eye-tracking/config/EyeTrackingLoadQuestionsPage'
import { EyeTrackingLoadSessionPage } from '@/app/client/pages/config/eye-tracking/config/EyeTrackingLoadSessionPage'
import { EyeTrackingNewSessionPage } from '@/app/client/pages/config/eye-tracking/config/EyeTrackingNewSessionPage'
import '@extra/object-diagram-modeler/starter/app/css/app.css'
import { DownloadModal } from './components/DownloadModal'
import { FixationSettingsModal } from './components/FixationSettingsModal'
import { GazeProjectionModal } from './components/GazeProjectionModal'
import { HeatmapSettingsModal } from './components/HeatmapSettingsModal'
import { closeModalOutsideClickInteraction } from './modules/ui/shared-interactions'
import {
  DisableCriticalKeys,
  handleWindowRefresh,
  takeSnapshotOnWindowMovement,
  takeSnapshotOnWindowResize,
  testListeners,
} from './modules/ui/window-events'
import { EyeTrackingExperimentPage } from './pages/config/eye-tracking/experiment/EyeTrackingExperimentPage'
import { loadServerStateIntoClient, useStateStore } from './state/state'

async function initializeApp(): Promise<void> {
  try {
    // Load server state
    await loadServerStateIntoClient()

    // Call window event listeners
    DisableCriticalKeys()
    handleWindowRefresh()
    takeSnapshotOnWindowResize()
    takeSnapshotOnWindowMovement()

    // Test listener
    testListeners()

    // Event listener for clicks outside the modal area
    window.onclick = closeModalOutsideClickInteraction
  } catch (error) {
    console.error('Error initializing app:', error)
  }
}

export function App(): React.ReactElement {
  const { isLoading, loadingMessage } = useStateStore()

  useEffect(() => {
    initializeApp()
  }, [])

  return (
    <>
      <HashRouter>
        <Routes>
          <Route path={ROUTES.HOME} element={<ConfigPagesWrapper />}>
            <Route index element={<HomePage />} />
            <Route path={ROUTES.EYE_TRACKING} element={<EyeTrackingPage />} />
            <Route
              path={ROUTES.EYE_TRACKING_NEW_SESSION}
              element={<EyeTrackingNewSessionPage />}
            />

            <Route
              path={ROUTES.EYE_TRACKING_NEW_LOAD_MODELS}
              element={<EyeTrackingLoadModelsPage />}
            />
            <Route
              path={ROUTES.EYE_TRACKING_LOAD_QUESTIONS}
              element={<EyeTrackingLoadQuestionsPage />}
            />
            <Route
              path={ROUTES.EYE_TRACKING_LOAD_SESSION}
              element={<EyeTrackingLoadSessionPage />}
            />

            <Route
              path={ROUTES.EYE_TRACKING_EXPERIMENT}
              element={<EyeTrackingExperimentPage />}
            />

            <Route path={ROUTES.ANALYSIS} element={<AnalysisPage />} />
            <Route path={ROUTES.FIXATION_SETTINGS} element={<FixationSettingsModal />} />
            <Route path={ROUTES.HEATMAP_SETTINGS} element={<HeatmapSettingsModal />} />
            <Route path={ROUTES.DOWNLOAD} element={<DownloadModal />} />
            <Route path={ROUTES.GAZE_PROJECTION} element={<GazeProjectionModal />} />
          </Route>
        </Routes>
      </HashRouter>

      <div className='fixation-settings-view' id='fixation-settings-view'>
        <div className='fixation-settings-box' id='fixation-settings-box'>
          <span className='close' id='close-fixation-settings-projection'>
            <img
              className='close-icon'
              id='close-icon'
              src='icons/close.svg'
              alt='Close'
            />
          </span>

          <h2>Fixation Detection Settings</h2>
          <h3 style={{ paddingBottom: '30px', color: 'grey' }}>
            Using the Velocity-Threshold Identification (I-VT) fixation classification
            algorithm
          </h3>

          <div className='section'>
            <div className='title'>
              Interpolation:{' '}
              <input type='checkbox' id='is-interpolation' defaultChecked />
            </div>
            <div className='row'>
              <div className='column'>
                <span className='text'> Max gap length in ms: </span>
              </div>
              <div className='column'>
                <input
                  className='form-input is-interpolation'
                  id='max-gap-length'
                  type='text'
                  defaultValue='75'
                />
              </div>
            </div>
          </div>

          <div className='section'>
            <div className='title'>
              Noise reduction: <input type='checkbox' id='is-noice-reduction' />
            </div>
            <div className='row'>
              <div className='column'>
                <span className='text'> Method: </span>
              </div>
              <div className='column'>
                <select
                  className='form-select-short is-noice-reduction'
                  id='noise-reduction-method'
                  disabled
                  defaultValue='Median'>
                  <option value='Average'>Moving average</option>
                  <option value='Median'>Moving median</option>
                </select>
              </div>
              <div className='column'>
                <span className='text'> Window size in samples: </span>
              </div>
              <div className='column'>
                <input
                  className='form-input is-noice-reduction'
                  id='window-size'
                  type='text'
                  defaultValue='3'
                  disabled
                />
              </div>
            </div>
          </div>

          <div className='section'>
            <div className='title'> Fixation filter:</div>
            <div className='row'>
              <div className='column'>
                <span className='text'> Window length in ms: </span>
              </div>
              <div className='column'>
                <input
                  className='form-input'
                  id='window-length'
                  type='text'
                  defaultValue='20'
                />
              </div>
              <div className='column'>
                <span className='text'> Velocity threshold in degrees/second: </span>
              </div>
              <div className='column'>
                <input
                  className='form-input'
                  id='Velocity-threshold'
                  type='text'
                  defaultValue='30'
                />
              </div>
            </div>
          </div>

          <div className='section'>
            <div className='title'>
              Discard short fixations:{' '}
              <input type='checkbox' id='is-discard-short-fixations' defaultChecked />
            </div>
            <div className='row'>
              <div className='column'>
                <span className='text'> Minimum fixation duration in ms: </span>
              </div>
              <div className='column'>
                <input
                  className='form-input is-discard-short-fixations'
                  id='minimum-fixation-duration'
                  type='text'
                  defaultValue='60'
                />
              </div>
            </div>
          </div>

          <div className='section'>
            <div className='title'>
              Merge adjacent fixations:{' '}
              <input type='checkbox' id='is-merge-adjacent-fixations' defaultChecked />
            </div>
            <div className='row'>
              <div className='column'>
                <span className='text'> Maximum time between fixations in ms: </span>
              </div>
              <div className='column'>
                <input
                  className='form-input is-merge-adjacent-fixations'
                  id='maximum-time-between-fixations'
                  type='text'
                  defaultValue='75'
                />
              </div>
              <div className='column'>
                <span className='text'> Maximum angle between fixations in degree: </span>
              </div>
              <div className='column'>
                <input
                  className='form-input is-merge-adjacent-fixations'
                  id='maximum-angle-between-fixations'
                  type='text'
                  defaultValue='0.5'
                />
              </div>
            </div>
          </div>

          <div className='section'>
            <div className='title'> Mapping Fixations to elements: </div>
            <div className='row'>
              <div className='column'>
                <span className='text'>
                  {' '}
                  Handling of fixation spanning over multiple elements, tabs or
                  questions{' '}
                </span>
              </div>
              <div className='column'>
                <select id='fixation-mapping-handling' className='form-select-long'>
                  <option value='soft'>
                    Assign to the element/tab/question with max gaze points
                  </option>
                  <option value='hard'>Discard</option>
                </select>
              </div>
            </div>
          </div>

          <div className='fixation-settings-btn-container'>
            <input
              type='submit'
              className='fixation-settings-btn'
              id='submit-apply-fixation-settings-form'
              value='Apply Settings'
            />
          </div>
        </div>
      </div>

      <ProcessingStates />

      <LoadingScreen message={loadingMessage ?? ''} visible={isLoading ?? false} />
    </>
  )
}
