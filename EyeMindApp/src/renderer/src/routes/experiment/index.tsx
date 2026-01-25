import { assignModelsToGroups } from '@renderer/components/FileImport/loadFile'
import { setMainTab, setUnclosableTabs } from '@renderer/actions/tabs'
import { useGlobalStore } from '@renderer/state/global'
import { Link, createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'


const NAV_TABS_SCROLL_DISTANCE = 20

export const Route = createFileRoute('/experiment/')({
  component: EyeTrackingExperimentPage,
})

function EyeTrackingExperimentPage({}): React.ReactElement {
  const globalStore = useGlobalStore()

  const isIndexTabVisible = globalStore.mode == 'data-collection'
  const isExplorerVisible =
    globalStore.linkingSubProcessesMode !== 'newTab' &&
    globalStore.linkingSubProcessesMode !== 'withinTab'

  const toTabLeft = useRef<HTMLDivElement>(null)
  const toTabRight = useRef<HTMLDivElement>(null)
  const navTabs = useRef<HTMLDivElement>(null)
  function handleToTabLeftClick() {
    if (!navTabs.current) return

    navTabs.current.scrollLeft -= NAV_TABS_SCROLL_DISTANCE
  }
  function handleToTabRightClick() {
    if (!navTabs.current) return
    navTabs.current.scrollLeft += NAV_TABS_SCROLL_DISTANCE
  }

  const isSessionLoaded = useRef(false)

  useEffect(() => {
    // set file properties not already defined (that is the case when you load a session)
    if (!isSessionLoaded.current) {
      assignModelsToGroups()
      setMainTab()
      setUnclosableTabs()
    }

    // loaded-content view interaction
    const modeText = document.getElementById('mode-text')
    const featureText = document.getElementById('feature-text')
    const etIcons = document.getElementById('eye-tracking-icons')

    if (modeText) modeText.innerText = 'Eye-tracking Mode'
    if (featureText) featureText.innerText = ''
    if (etIcons) etIcons.style.display = 'block'

    // put in fullscreen
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
                    alt='Record'
                  />
                </Link>
                <img
                  src='icons/stop_disabled.svg'
                  id='stop-btn'
                  style={{ marginTop: '10px', marginRight: '50px' }}
                  width='20px'
                  height='20px'
                  alt='Stop'
                />
              </div>

              <div id='analysis-icons' className='analysis-icons'>
                <img
                  id='fixation-filter-btn'
                  title='Fixation filter'
                  className='icon'
                  src='icons/fixation-filter.svg'
                  width='90px'
                  height='40px'
                  alt='Fixation filter'
                />
                <Link to='/experiment/gaze-projection-settings'>
                  <img
                    id='projections-mapping-btn'
                    title='Gaze projections and corrections'
                    className='icon'
                    style={{ marginLeft: '-50px' }}
                    src='icons/projections-mapping.svg'
                    width='90px'
                    height='40px'
                    alt='Projections mapping'
                  />
                </Link>
                <Link to='/experiment/heatmap-settings'>
                  <img
                    id='heatmap-btn'
                    title='Heatmap and overlays'
                    className='icon'
                    src='icons/heatmap_disabled.svg'
                    style={{ marginLeft: '-50px', paddingTop: '3px' }}
                    width='90px'
                    height='40px'
                    alt='Heatmap'
                  />
                </Link>
                <Link to='/experiment/export-options'>
                  <img
                    id='download-btn'
                    title='Download'
                    className='icon'
                    src='icons/download.svg'
                    style={{ marginLeft: '-50px' }}
                    width='90px'
                    height='40px'
                    alt='Download'
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
                  Start questions
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
              Questions finished
            </div>
          </div>
        </div>
      </div>

      <div id='user-configuration' className='user-configuration'>
        <div className='row'>
          <div className='column-title'>
            <span className='title-text-container'>User Configuration</span>
          </div>
          <div className='column'>
            <div id='user-config-content'></div>
          </div>
        </div>
      </div>

      <div id='gaze-correction' className='gaze-correction'>
        <div className='row'>
          <div className='column-title'>
            <span className='title-text-container'>General offset correction</span>
          </div>
          <div className='column'>
            <span className='field-text-container'>x offset: </span>
          </div>
          <div className='column'>
            <input
              className='form-input'
              type='number'
              id='gaze-correction-x-offset-model'
            />
          </div>
          <div className='column'>
            <span className='field-text-container'>y offset: </span>
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
              Update
            </button>
          </div>
          <div className='column' style={{ width: '200px' }}></div>
          <div className='column'>
            <button className='btn-long' id='apply-correction-offset'>
              Apply correction to data
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

    </div>
  )
}
