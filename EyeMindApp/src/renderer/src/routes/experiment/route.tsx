import LANG from '@renderer/LANG'
import { setMainTab, setUnclosableTabs } from '@renderer/actions/tabs'
import { assignModelsToGroups } from '@renderer/components/FileImport/loadFile'
import { useGlobalStore } from '@renderer/state/global'
import { Link, Outlet, createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'

const NAV_TABS_SCROLL_DISTANCE = 20

export const Route = createFileRoute('/experiment')({
  component: ExperimentLayout,
})

/**
 * Layout for the experiment section. Always shows the experiment screen;
 * child routes (e.g. recording-settings) render in the overlay outlet on top.
 */
function ExperimentLayout(): React.ReactElement {
  const globalStore = useGlobalStore()

  const isIndexTabVisible = globalStore.mode == 'data-collection'
  const isExplorerVisible =
    globalStore.linkingSubProcessesMode !== 'newTab' &&
    globalStore.linkingSubProcessesMode !== 'withinTab'

  const toTabLeft = useRef<HTMLDivElement>(null)
  const toTabRight = useRef<HTMLDivElement>(null)
  const navTabs = useRef<HTMLDivElement>(null)

  function handleToTabLeftClick() {
    if (navTabs.current == null) return
    navTabs.current.scrollLeft -= NAV_TABS_SCROLL_DISTANCE
  }

  function handleToTabRightClick() {
    if (navTabs.current == null) return
    navTabs.current.scrollLeft += NAV_TABS_SCROLL_DISTANCE
  }

  const isSessionLoaded = useRef(false)

  useEffect(() => {
    if (!isSessionLoaded.current) {
      assignModelsToGroups()
      setMainTab()
      setUnclosableTabs()
    }

    const modeText = document.getElementById('mode-text')
    const featureText = document.getElementById('feature-text')
    const etIcons = document.getElementById('eye-tracking-icons')

    if (modeText != null) modeText.innerText = LANG.eyeTrackingMode
    if (featureText != null) featureText.innerText = ''
    if (etIcons != null) etIcons.style.display = 'block'

    if (window.hasOwnProperty('electron')) {
      window.electron.putFullScreen()
    }
  }, [])

  return (
    <div className='loaded-content-view' id='loaded-content-view'>
      <div className='top-menu'>
        <div className='row'>
          <div className='column'>
            <div className='row'>
              <div className='column'>
                <div id='mode-text' className='mode-text'></div>
              </div>
              <div className='column'>
                <div id='feature-text' className='feature-text'></div>
              </div>
            </div>
          </div>
          <div className='column'>
            <div className='icons-container'>
              <div id='eye-tracking-icons' className='eye-tracking-icons'>
                <Link to='/experiment/recording-settings'>
                  <img
                    id='record-btn'
                    className='icon'
                    src='icons/record_enabled.svg'
                    width='20px'
                    height='20px'
                    alt={LANG.iconRecord}
                  />
                </Link>
                <img
                  src='icons/stop_disabled.svg'
                  id='stop-btn'
                  style={{ marginTop: '10px', marginRight: '50px' }}
                  width='20px'
                  height='20px'
                  alt={LANG.iconStop}
                />
              </div>

              <div id='analysis-icons' className='analysis-icons'>
                <img
                  id='fixation-filter-btn'
                  title={LANG.iconFixationFilter}
                  className='icon'
                  src='icons/fixation-filter.svg'
                  width='90px'
                  height='40px'
                  alt={LANG.iconFixationFilter}
                />
                <Link to='/experiment/gaze-projection-settings'>
                  <img
                    id='projections-mapping-btn'
                    title={LANG.titleGazeProjections}
                    className='icon'
                    style={{ marginLeft: '-50px' }}
                    src='icons/projections-mapping.svg'
                    width='90px'
                    height='40px'
                    alt={LANG.iconProjectionsMapping}
                  />
                </Link>
                <Link to='/experiment/heatmap-settings'>
                  <img
                    id='heatmap-btn'
                    title={LANG.titleHeatmapOverlays}
                    className='icon'
                    src='icons/heatmap_disabled.svg'
                    style={{ marginLeft: '-50px', paddingTop: '3px' }}
                    width='90px'
                    height='40px'
                    alt={LANG.iconHeatmap}
                  />
                </Link>
                <Link to='/experiment/export-options'>
                  <img
                    id='download-btn'
                    title={LANG.download}
                    className='icon'
                    src='icons/download.svg'
                    style={{ marginLeft: '-50px' }}
                    width='90px'
                    height='40px'
                    alt={LANG.iconDownload}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='questions-container' id='questions-container'>
        <div className='questions' id='questions'>
          <div
            id='questions-ready'
            className='question gaze-element'
            data-element-id='questions-ready'>
            <div className='answer-and-next'>
              <div className='start-questions'>
                <button
                  className='start-questions-btn gaze-element'
                  data-element-id='start-questions-btn'
                  id='start-questions-btn'>
                  {LANG.startQuestions}
                </button>
              </div>
            </div>
          </div>

          <div
            id='questions-over'
            className='question gaze-element'
            data-element-id='questions-over'>
            <div
              className='finished gaze-element'
              data-element-id='questions-finished-text'>
              {LANG.questionsFinished}
            </div>
          </div>
        </div>
      </div>

      <div id='user-configuration' className='user-configuration'>
        <div className='row'>
          <div className='column-title'>
            <span className='title-text-container'>{LANG.userConfiguration}</span>
          </div>
          <div className='column'>
            <div id='user-config-content'></div>
          </div>
        </div>
      </div>

      <div id='gaze-correction' className='gaze-correction'>
        <div className='row'>
          <div className='column-title'>
            <span className='title-text-container'>{LANG.generalOffsetCorrection}</span>
          </div>
          <div className='column'>
            <span className='field-text-container'>{LANG.xOffset}</span>
          </div>
          <div className='column'>
            <input
              className='form-input'
              type='number'
              id='gaze-correction-x-offset-model'
            />
          </div>
          <div className='column'>
            <span className='field-text-container'>{LANG.yOffset}</span>
          </div>
          <div className='column'>
            <input
              className='form-input'
              type='number'
              id='gaze-correction-y-offset-model'
            />
          </div>
          <div className='column'></div>
          <div className='column'>
            <button className='btn' id='update-correction-offset'>
              {LANG.update}
            </button>
          </div>
          <div className='column' style={{ width: '200px' }}></div>
          <div className='column'>
            <button className='btn-long' id='apply-correction-offset'>
              {LANG.applyCorrectionToData}
            </button>
          </div>
        </div>
      </div>

      <div className='nav-tabs-and-tabs' id='nav-tabs-and-tabs'>
        <div id='nav-tabs-container' className='nav-tabs-container'>
          <div
            ref={toTabLeft}
            id='to-tab-left'
            onClick={handleToTabLeftClick}
            className='to-tab-left gaze-element'
            data-element-id='to-tab-left-button'>
            &lt;&lt;
          </div>
          <div ref={navTabs} className='nav-tabs' id='nav-tabs'></div>
          <div
            ref={toTabRight}
            id='to-tab-right'
            onClick={handleToTabRightClick}
            className='to-tab-right gaze-element'
            data-element-id='to-tab-right-button'>
            &gt;
          </div>
        </div>

        <div className='tabs' id='tabs'>
          {isExplorerVisible && (
            <div
              id='explorer'
              className='explorer gaze-element'
              data-element-id='file-explorer-area'>
              <ul id='explorer-groups' className='root'></ul>
            </div>
          )}
          <div id='tabs-containers' className='tabs-containers'>
            <div id='process-hierarchy' className='process-hierarchy'>
              <div
                id='process-hierarchy-content'
                className='process-hierarchy-content gaze-element'
                data-element-id='process-hierarchy-content-area'></div>
            </div>
            {isIndexTabVisible && (
              <div id='index-tab' className='index-tab'>
                {/* Could be used for instructions */}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal overlay: child routes (e.g. recording-settings) render on top of the experiment screen */}
      <div className='experiment-route-modal-outlet' aria-hidden='true'>
        <Outlet />
      </div>
    </div>
  )
}
