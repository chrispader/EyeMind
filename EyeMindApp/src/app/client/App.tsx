import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'
import 'bpmn-js/dist/assets/bpmn-js.css'
import 'bpmn-js/dist/assets/diagram-js.css'
import { useEffect } from 'react'
import { BrowserRouter, HashRouter, MemoryRouter, Route, Routes } from 'react-router'
import { ROUTES } from '@/app/client/ROUTES'
import '@/app/client/css/app.css'
import '@/app/client/css/main.css'
import '@/app/client/css/new.css'
import { AnalysisPage } from '@/app/client/pages/AnalysisPage'
import { HomePage } from '@/app/client/pages/HomePage'
import { ConfigPagesWrapper } from '@/app/client/pages/config/ConfigPagesWrapper'
import { EyeTrackingPage } from '@/app/client/pages/config/EyeTrackingPage'
import { EyeTrackingLoadSessionPage } from '@/app/client/pages/config/eye-tracking/EyeTrackingLoadSessionPage'
import { EyeTrackingNewSessionImportPage } from '@/app/client/pages/config/eye-tracking/EyeTrackingNewSessionImportPage'
import { EyeTrackingNewSessionPage } from '@/app/client/pages/config/eye-tracking/EyeTrackingNewSessionPage'
import '@extra/object-diagram-modeler/starter/app/css/app.css'
import { DownloadModal } from './components/DownloadModal'
import { FixationSettingsModal } from './components/FixationSettingsModal'
import { GazeProjectionModal } from './components/GazeProjectionModal'
import { HeatmapSettingsModal } from './components/HeatmapSettingsModal'
import { LoadedContentView } from './components/LoadedContentView'
import { ProcessingStates } from './components/ProcessingStates'
import { closeModalOutsideClickInteraction } from './modules/ui/shared-interactions'
import {
  DisableCriticalKeys,
  handleWindowRefresh,
  takeSnapshotOnWindowMovement,
  takeSnapshotOnWindowResize,
  testListeners,
} from './modules/ui/window-events'
import { loadServerStateIntoClient } from './state/state'

const __DEV__ = true
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
const RouterComponent = __DEV__ ? MemoryRouter : BrowserRouter

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
  useEffect(() => {
    initializeApp()
  }, [])

  return (
    <>
      <RouterComponent>
        <Routes>
          <Route path={ROUTES.HOME} element={<ConfigPagesWrapper />}>
            <Route index element={<HomePage />} />
            <Route path={ROUTES.EYE_TRACKING} element={<EyeTrackingPage />} />
            <Route
              path={ROUTES.EYE_TRACKING_NEW_SESSION}
              element={<EyeTrackingNewSessionPage />}
            />
            <Route
              path={ROUTES.EYE_TRACKING_NEW_SESSION_IMPORT}
              element={<EyeTrackingNewSessionImportPage />}
            />
            <Route
              path={ROUTES.EYE_TRACKING_LOAD_SESSION}
              element={<EyeTrackingLoadSessionPage />}
            />

            <Route path={ROUTES.ANALYSIS} element={<AnalysisPage />} />
            <Route path={ROUTES.FIXATION_SETTINGS} element={<FixationSettingsModal />} />
            <Route path={ROUTES.HEATMAP_SETTINGS} element={<HeatmapSettingsModal />} />
            <Route path={ROUTES.DOWNLOAD} element={<DownloadModal />} />
            <Route path={ROUTES.GAZE_PROJECTION} element={<GazeProjectionModal />} />
          </Route>
        </Routes>
      </RouterComponent>

      <div className="fixation-settings-view" id="fixation-settings-view">
        <div className="fixation-settings-box" id="fixation-settings-box">
          <span className="close" id="close-fixation-settings-projection">
            <img
              className="close-icon"
              id="close-icon"
              src="icons/close.svg"
              alt="Close"
            />
          </span>

          <h2>Fixation Detection Settings</h2>
          <h3 style={{ paddingBottom: '30px', color: 'grey' }}>
            Using the Velocity-Threshold Identification (I-VT) fixation classification
            algorithm
          </h3>

          <div className="section">
            <div className="title">
              Interpolation:{' '}
              <input type="checkbox" id="is-interpolation" defaultChecked />
            </div>
            <div className="row">
              <div className="column">
                <span className="text"> Max gap length in ms: </span>
              </div>
              <div className="column">
                <input
                  className="form-input is-interpolation"
                  id="max-gap-length"
                  type="text"
                  defaultValue="75"
                />
              </div>
            </div>
          </div>

          <div className="section">
            <div className="title">
              Noise reduction: <input type="checkbox" id="is-noice-reduction" />
            </div>
            <div className="row">
              <div className="column">
                <span className="text"> Method: </span>
              </div>
              <div className="column">
                <select
                  className="form-select-short is-noice-reduction"
                  id="noise-reduction-method"
                  disabled>
                  <option value="Average">Moving average</option>
                  <option value="Median" selected>
                    Moving median
                  </option>
                </select>
              </div>
              <div className="column">
                <span className="text"> Window size in samples: </span>
              </div>
              <div className="column">
                <input
                  className="form-input is-noice-reduction"
                  id="window-size"
                  type="text"
                  defaultValue="3"
                  disabled
                />
              </div>
            </div>
          </div>

          <div className="section">
            <div className="title"> Fixation filter:</div>
            <div className="row">
              <div className="column">
                <span className="text"> Window length in ms: </span>
              </div>
              <div className="column">
                <input
                  className="form-input"
                  id="window-length"
                  type="text"
                  defaultValue="20"
                />
              </div>
              <div className="column">
                <span className="text"> Velocity threshold in degrees/second: </span>
              </div>
              <div className="column">
                <input
                  className="form-input"
                  id="Velocity-threshold"
                  type="text"
                  defaultValue="30"
                />
              </div>
            </div>
          </div>

          <div className="section">
            <div className="title">
              Discard short fixations:{' '}
              <input type="checkbox" id="is-discard-short-fixations" defaultChecked />
            </div>
            <div className="row">
              <div className="column">
                <span className="text"> Minimum fixation duration in ms: </span>
              </div>
              <div className="column">
                <input
                  className="form-input is-discard-short-fixations"
                  id="minimum-fixation-duration"
                  type="text"
                  defaultValue="60"
                />
              </div>
            </div>
          </div>

          <div className="section">
            <div className="title">
              Merge adjacent fixations:{' '}
              <input type="checkbox" id="is-merge-adjacent-fixations" defaultChecked />
            </div>
            <div className="row">
              <div className="column">
                <span className="text"> Maximum time between fixations in ms: </span>
              </div>
              <div className="column">
                <input
                  className="form-input is-merge-adjacent-fixations"
                  id="maximum-time-between-fixations"
                  type="text"
                  defaultValue="75"
                />
              </div>
              <div className="column">
                <span className="text"> Maximum angle between fixations in degree: </span>
              </div>
              <div className="column">
                <input
                  className="form-input is-merge-adjacent-fixations"
                  id="maximum-angle-between-fixations"
                  type="text"
                  defaultValue="0.5"
                />
              </div>
            </div>
          </div>

          <div className="section">
            <div className="title"> Mapping Fixations to elements: </div>
            <div className="row">
              <div className="column">
                <span className="text">
                  {' '}
                  Handling of fixation spanning over multiple elements, tabs or
                  questions{' '}
                </span>
              </div>
              <div className="column">
                <select id="fixation-mapping-handling" className="form-select-long">
                  <option value="soft">
                    Assign to the element/tab/question with max gaze points
                  </option>
                  <option value="hard">Discard</option>
                </select>
              </div>
            </div>
          </div>

          <div className="fixation-settings-btn-container">
            <input
              type="submit"
              className="fixation-settings-btn"
              id="submit-apply-fixation-settings-form"
              value="Apply Settings"
            />
          </div>
        </div>
      </div>

      <div className="loaded-content-view" id="loaded-content-view">
        <div className="top-menu">
          <div className="row">
            <div className="column">
              <div className="row">
                <div className="column">
                  <div id="mode-text" className="mode-text"></div>
                </div>
                <div className="column">
                  <div id="feature-text" className="feature-text"></div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="icons-container">
                <div id="eye-tracking-icons" className="eye-tracking-icons">
                  <img
                    id="record-btn"
                    className="icon"
                    src="icons/record_enabled.svg"
                    width="20px"
                    height="20px"
                    alt="Record"
                  />
                  <img
                    src="icons/stop_disabled.svg"
                    id="stop-btn"
                    style={{ marginTop: '10px', marginRight: '50px' }}
                    width="20px"
                    height="20px"
                    alt="Stop"
                  />
                </div>

                <div id="analysis-icons" className="analysis-icons">
                  <img
                    id="fixation-filter-btn"
                    title="Fixation filter"
                    className="icon"
                    src="icons/fixation-filter.svg"
                    width="90px"
                    height="40px"
                    alt="Fixation filter"
                  />
                  <img
                    id="projections-mapping-btn"
                    title="Gaze projections and corrections"
                    className="icon"
                    style={{ marginLeft: '-50px' }}
                    src="icons/projections-mapping.svg"
                    width="90px"
                    height="40px"
                    alt="Projections mapping"
                  />
                  <img
                    id="heatmap-btn"
                    title="Heatmap and overlays"
                    className="icon"
                    src="icons/heatmap_disabled.svg"
                    style={{ marginLeft: '-50px', paddingTop: '3px' }}
                    width="90px"
                    height="40px"
                    alt="Heatmap"
                  />
                  <img
                    id="download-btn"
                    title="Download"
                    className="icon"
                    src="icons/download.svg"
                    style={{ marginLeft: '-50px' }}
                    width="90px"
                    height="40px"
                    alt="Download"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="questions-container" id="questions-container">
          <div className="questions" id="questions">
            <div
              id="questions-ready"
              className="question gaze-element"
              data-element-id="questions-ready">
              <div className="answer-and-next">
                <div className="start-questions">
                  <button
                    className="start-questions-btn gaze-element"
                    data-element-id="start-questions-btn"
                    id="start-questions-btn">
                    Start questions
                  </button>
                </div>
              </div>
            </div>

            <div
              id="questions-over"
              className="question gaze-element"
              data-element-id="questions-over">
              <div
                className="finished gaze-element"
                data-element-id="questions-finished-text">
                Questions finished
              </div>
            </div>
          </div>
        </div>

        <div id="user-configuration" className="user-configuration">
          <div className="row">
            <div className="column-title">
              <span className="title-text-container">User Configuration</span>
            </div>
            <div className="column">
              <div id="user-config-content"></div>
            </div>
          </div>
        </div>

        <div id="gaze-correction" className="gaze-correction">
          <div className="row">
            <div className="column-title">
              <span className="title-text-container">General offset correction</span>
            </div>
            <div className="column">
              <span className="field-text-container">x offset: </span>
            </div>
            <div className="column">
              <input
                className="form-input"
                type="number"
                id="gaze-correction-x-offset-model"
              />
            </div>
            <div className="column">
              <span className="field-text-container">y offset: </span>
            </div>
            <div className="column">
              <input
                className="form-input"
                type="number"
                id="gaze-correction-y-offset-model"
              />
            </div>
            <div className="column"></div>
            <div className="column">
              <button className="btn" id="update-correction-offset">
                Update
              </button>
            </div>
            <div className="column" style={{ width: '200px' }}></div>
            <div className="column">
              <button className="btn-long" id="apply-correction-offset">
                Apply correction to data
              </button>
            </div>
          </div>
        </div>

        <div className="nav-tabs-and-tabs" id="nav-tabs-and-tabs">
          <div id="nav-tabs-container" className="nav-tabs-container">
            <div
              id="to-tab-left"
              className="to-tab-left gaze-element"
              data-element-id="to-tab-left-button">
              &lt;&lt;
            </div>
            <div className="nav-tabs" id="nav-tabs"></div>
            <div
              id="to-tab-right"
              className="to-tab-right gaze-element"
              data-element-id="to-tab-right-button">
              &gt;
            </div>
          </div>

          <div className="tabs" id="tabs">
            <div
              id="explorer"
              className="explorer gaze-element"
              data-element-id="file-explorer-area">
              <ul id="explorer-groups" className="root"></ul>
            </div>
            <div id="tabs-containers" className="tabs-containers">
              <div id="process-hierarchy" className="process-hierarchy">
                <div
                  id="process-hierarchy-content"
                  className="process-hierarchy-content gaze-element"
                  data-element-id="process-hierarchy-content-area"></div>
              </div>
              <div id="index-tab" className="index-tab">
                {/* Could be used for instructions */}
              </div>
            </div>
          </div>
        </div>

        <div id="startET-modal" className="startET-modal">
          <div className="content">
            <span className="close" id="close-startET-modal">
              <img
                className="close-icon"
                id="close-icon"
                src="icons/close.svg"
                alt="Close"
              />
            </span>

            <h2>Data Collection Settings</h2>

            <div>
              <div className="row">
                <div className="column">
                  <span className="text"> X Screen dimension in pixels*: </span>
                </div>
                <div className="column">
                  <input className="form-input" id="x-dim" type="text" />
                </div>
              </div>

              <div className="row">
                <div className="column">
                  <span className="text"> Y Screen dimension in pixels*: </span>
                </div>
                <div className="column">
                  <input className="form-input" id="y-dim" type="text" />
                </div>
              </div>

              <div className="row">
                <div className="column">
                  <span className="text"> Screen distance in centimeters*: </span>
                </div>
                <div className="column">
                  <input
                    className="form-input"
                    id="screen-distance"
                    type="text"
                    value=""
                  />
                </div>
              </div>

              <div className="row">
                <div className="column">
                  <span className="text"> Monitor size in inches*: </span>
                </div>
                <div className="column">
                  <input className="form-input" id="monitor-size" type="text" />
                </div>
              </div>

              <div className="row">
                <div className="column">
                  <span className="text"> Recording ID*: </span>
                </div>
                <div className="column">
                  <input className="form-input" id="recording-id" type="text" />
                </div>
              </div>

              <div className="row">
                <div className="column">
                  <span className="text"> Participant ID: </span>
                </div>
                <div className="column">
                  <input className="form-input" id="participant-id" type="text" />
                </div>
              </div>

              <div className="row">
                <div className="column">
                  <span className="text"> Experiment ID: </span>
                </div>
                <div className="column">
                  <input className="form-input" id="experiment-id" type="text" />
                </div>
              </div>

              <div className="row">
                <div className="column">
                  <span className="text"> Experimenter ID:</span>
                </div>
                <div className="column">
                  <input className="form-input" id="experimenter-id" type="text" />
                </div>
              </div>

              <div className="row">
                <div className="column">
                  <span className="text"> Additional notes: </span>
                </div>
                <div className="column">
                  <textarea
                    className="form-input"
                    id="additional-notes"
                    rows={4}
                    cols={25}></textarea>
                </div>
              </div>

              <div className="row">
                <div style={{ textAlign: 'center' }}>
                  <input
                    type="submit"
                    className="submit-form-button"
                    id="submit-recording-form"
                    value="Start recording"
                  />
                  <input
                    type="submit"
                    className="save-session"
                    id="save-session"
                    value="Save Session"
                  />
                </div>
              </div>

              <div className="row">
                <div style={{ textAlign: 'center' }}>* required fields</div>
              </div>
            </div>
          </div>
        </div>

        <div id="heatmap-settings-modal" className="heatmap-settings-modal">
          <div className="content">
            <span className="close" id="close-heatmap-settings">
              <img
                className="close-icon"
                id="close-icon"
                src="icons/close.svg"
                alt="Close"
              />
            </span>

            <h2>Heatmap Settings</h2>

            <div>
              <div className="row">
                <div className="column">
                  <span className="text">Participant (File) </span>
                </div>
                <div className="column">
                  <select
                    className="form-select-multiple"
                    multiple
                    id="participants-files-heatmap"></select>
                </div>
              </div>

              <div className="row">
                <div className="column">
                  <span className="text">Question ID: </span>
                </div>
                <div className="column">
                  <select className="form-select" id="question">
                    <option value="">Select</option>
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="column">
                  <span className="text">Measure: </span>
                </div>
                <div className="column">
                  <select className="form-select" id="measure">
                    <option value="" data-measure-type="" data-aggregations="">
                      Select
                    </option>
                    <option
                      value="visit_duration"
                      data-measure-type="element_level"
                      data-aggregations="sum-max-min-mean">
                      Visit Duration (From Fixations)
                    </option>
                    <option
                      value="visit_count"
                      data-measure-type="element_level"
                      data-aggregations="count">
                      Visit Count (From Fixations)
                    </option>
                    <option
                      value="visit_duration"
                      data-measure-type="gaze_level"
                      data-aggregations="sum-max-min-mean">
                      Visit Duration (From Gazes)
                    </option>
                    <option
                      value="visit_count"
                      data-measure-type="gaze_level"
                      data-aggregations="count">
                      Visit Count (From Gazes)
                    </option>
                    <option
                      value="Fixation Duration"
                      data-measure-type="fixation_level"
                      data-aggregations="sum-max-min-mean">
                      Fixation Duration
                    </option>
                    <option
                      value="Fixation Count"
                      data-measure-type="fixation_level"
                      data-aggregations="count">
                      Fixation Count
                    </option>
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="column">
                  <span className="text">Aggregation function: </span>
                </div>
                <div className="column">
                  <select className="form-select" id="aggregation">
                    <option id="no-aggr" value="" data-aggregation-type="" className="">
                      Select
                    </option>
                    <option
                      id="sum-aggr"
                      value="sum"
                      data-aggregation-type="time"
                      className="aggr">
                      Sum
                    </option>
                    <option
                      id="max-aggr"
                      value="max"
                      data-aggregation-type="time"
                      className="aggr">
                      Max
                    </option>
                    <option
                      id="min-aggr"
                      value="min"
                      data-aggregation-type="time"
                      className="aggr">
                      Min
                    </option>
                    <option
                      id="mean-aggr"
                      value="mean"
                      data-aggregation-type="time"
                      className="aggr">
                      Mean
                    </option>
                    <option
                      id="count-aggr"
                      value="count"
                      data-aggregation-type="number"
                      className="aggr">
                      Count
                    </option>
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="column">
                  <span className="text">Timestamp unit: </span>
                </div>
                <div className="column">
                  <select className="form-select" id="timestamp-unit">
                    <option value="s">Second</option>
                    <option value="ms" selected>
                      Millisecond
                    </option>
                    <option value="us">Microsecond</option>
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="column">
                  <span className="text">Additionally include pools and lanes:</span>
                </div>
                <div className="column">
                  <input
                    className="form-check-box"
                    type="checkbox"
                    id="inc-pools-lanes"
                  />
                </div>
              </div>

              <div className="row">
                <div className="column">
                  <span className="text">Additionally include groups (border only):</span>
                </div>
                <div className="column">
                  <input className="form-check-box" type="checkbox" id="inc-groups" />
                </div>
              </div>

              <div className="row">
                <div className="column">
                  <span className="text">
                    Additionally include expended sub-processes:
                  </span>
                </div>
                <div className="column">
                  <input
                    className="form-check-box"
                    type="checkbox"
                    id="inc-expended-sub-processes"
                  />
                </div>
              </div>

              <div className="row">
                <div className="column">
                  <span className="text">Additionally include processes:</span>
                </div>
                <div className="column">
                  <input className="form-check-box" type="checkbox" id="inc-processes" />
                </div>
              </div>

              <div className="row">
                <div className="column">
                  <span className="text">Additionally include edges:</span>
                </div>
                <div className="column">
                  <input className="form-check-box" type="checkbox" id="inc-edges" />
                </div>
              </div>

              <div className="row">
                <div style={{ textAlign: 'center' }}>
                  <input
                    type="submit"
                    className="submit-form-button"
                    id="submit-heatmap-form"
                    value="Show heatmap"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="download-modal" className="download-modal">
          <div className="content">
            <span className="close" id="close-download">
              <img
                className="close-icon"
                id="close-icon"
                src="icons/close.svg"
                alt="Close"
              />
            </span>

            <h2>Export Options</h2>

            <div>
              <div className="row">
                <div className="column">
                  <span className="text">File type </span>
                </div>
                <div className="column">
                  <select className="form-select" id="download-file-type">
                    <option value="analysis-data">Analysis File</option>
                    <option value="gaze-data">Gaze Data</option>
                    <option value="fixation-data">Fixation Data</option>
                  </select>
                </div>
              </div>

              <div className="row">
                <div style={{ textAlign: 'center' }}>
                  <input
                    type="submit"
                    id="submit-download-form"
                    className="submit-form-button"
                    value="Download"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="gaze-projection-modal" className="gaze-projection-modal">
          <div className="content">
            <span className="close" id="close-gaze-projection">
              <img
                className="close-icon"
                id="close-icon"
                src="icons/close.svg"
                alt="Close"
              />
            </span>

            <h2>Gaze Projection Settings</h2>

            <div>
              <div className="row">
                <div className="column">
                  <span className="text">Gaze sample Size* </span>
                </div>
                <div className="column">
                  <input
                    className="form-input"
                    id="gaze-sample-size-in-percentage"
                    type="text"
                    defaultValue="20"
                  />{' '}
                  %
                </div>
              </div>

              <div className="row">
                <div className="column">
                  <span className="text">Participant (File) </span>
                </div>
                <div className="column">
                  <select className="form-select" id="participant-file-gaze-projection">
                    <option value="">Select</option>
                  </select>
                </div>
              </div>

              <div className="row">
                <div style={{ textAlign: 'center' }}>
                  <input
                    type="submit"
                    id="submit-gaze-projection-form"
                    className="submit-form-button"
                    value="Generate Gaze Projections"
                  />
                </div>
              </div>

              <div className="row">
                <div id="info-gaze-projections" className="info-gaze-projections">
                  *For better performance, it is recommended to choose a small sample
                  size.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="wait" className="wait">
        <div className="centered-content">
          <div id="wait-title"></div>
          <br />
          <div id="wait-progress"></div>
          <br />
          <img
            className="wait-icon"
            id="wait-icon"
            src="icons/loading.jpg"
            alt="Loading"
          />
        </div>
      </div>

      <div id="finished-processing-gaze-data" className="finished-processing-gaze-data">
        <div className="centered-content">
          <div className="centered-content">
            Processing Finished. <br />
            <br /> Close the app or use Crtl+R to reload it for further data collection or
            analysis.
          </div>
        </div>
      </div>
    </>
  )
}
