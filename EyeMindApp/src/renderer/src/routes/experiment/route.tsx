import LANG, { translate } from '@renderer/LANG'
import { setMainTab, setUnclosableTabs } from '@renderer/actions/tabs'
import { assignModelsToGroups } from '@renderer/components/FileImport/loadFile'
import { RecordButton } from '@renderer/components/RecordButton'
import { StopButton } from '@renderer/components/StopButton'
import { useGlobalStore } from '@renderer/state/global'
import { Outlet, createFileRoute } from '@tanstack/react-router'
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

    // window.electron.putFullScreen()
  }, [])

  return (
    <div id='loaded-content-view' className='relative flex h-full w-full flex-col'>
      {/* Top bar: mode/feature labels left, record/stop icons right */}
      <div className='flex h-12 shrink-0 items-center bg-page-bg px-0 py-0'>
        <div className='flex w-1/2 items-center'>
          <div className='ml-tab mt-[15px] min-w-[250px] text-xl font-bold'>
            {translate('eyeTrackingMode')}
          </div>
          <div className='ml-tab mt-[15px] min-w-[700px] text-lg font-bold text-error' />
        </div>
        <div className='flex flex-1 items-center justify-end gap-4'>
          <RecordButton isRecording={false} />
          <StopButton isRecording={false} />
          <div id='analysis-icons'>
            {/* <img id='fixation-filter-btn' ... /> */}
            {/* <Link to='/experiment/gaze-projection-settings'>...</Link> */}
            {/* <Link to='/experiment/heatmap-settings'>...</Link> */}
            {/* <Link to='/experiment/export-options'>...</Link> */}
          </div>
        </div>
      </div>

      <div id='questions-container' className='w-full bg-page-bg'>
        <div
          id='questions'
          className='mx-auto h-[105px] max-h-[105px] max-w-[1000px] overflow-auto border border-border bg-white'>
          <div
            id='questions-ready'
            className='h-full w-full'
            data-element-id='questions-ready'>
            <div className='flex w-full flex-col'>
              <div className='flex h-full w-full items-center justify-center pt-[35px]'>
                <button
                  className='h-8 w-[300px] cursor-pointer rounded-sm border-none bg-success text-white'
                  data-element-id='start-questions-btn'
                  id='start-questions-btn'>
                  {LANG.startQuestions}
                </button>
              </div>
            </div>
          </div>

          <div
            id='questions-over'
            className='h-full w-full'
            data-element-id='questions-over'>
            <div
              className='mx-auto w-[200px] pt-2.5 text-lg'
              data-element-id='questions-finished-text'>
              {LANG.questionsFinished}
            </div>
          </div>
        </div>
      </div>

      {/* <div id='user-configuration' className='user-configuration'>
        <div className='row'>
          <div className='column-title'>
            <span className='title-text-container'>{LANG.userConfiguration}</span>
          </div>
          <div className='column'>
            <div id='user-config-content'></div>
          </div>
        </div>
      </div> */}

      {/* <div id='gaze-correction' className='gaze-correction'>
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
      </div> */}

      <div
        id='nav-tabs-and-tabs'
        className='relative flex min-h-0 flex-1 flex-col bg-page-bg pt-5'>
        <div className='flex border border-border border-t-0 border-l-0 border-r-0'>
          <div
            ref={toTabLeft}
            id='to-tab-left'
            onClick={handleToTabLeftClick}
            className='w-[25px] shrink-0 cursor-pointer text-xl text-text-muted'
            data-element-id='to-tab-left-button'>
            &lt;
          </div>
          <div
            ref={navTabs}
            id='nav-tabs'
            className='m-0 flex min-w-0 max-h-[35px] flex-1 list-none overflow-x-auto overflow-y-hidden leading-[35px] [&::-webkit-scrollbar]:hidden'
          />
          <div
            ref={toTabRight}
            id='to-tab-right'
            onClick={handleToTabRightClick}
            className='w-[25px] shrink-0 cursor-pointer text-xl text-text-muted'
            data-element-id='to-tab-right-button'>
            &gt;
          </div>
        </div>

        <div className='flex min-h-0 flex-1 flex-row bg-white' id='tabs'>
          {isExplorerVisible && (
            <div
              id='explorer'
              className='h-full min-w-[300px] w-[300px] overflow-auto border border-b-0 border-l-0 border-t-0 border-border'
              data-element-id='file-explorer-area'>
              <ul id='explorer-groups' className='ml-0 border-l-0 pl-0' />
            </div>
          )}
          <div className='flex min-h-0 flex-1 flex-col' id='tabs-containers'>
            <div id='process-hierarchy' className='z-10 h-[45px] pt-5 pl-5'>
              <div
                id='process-hierarchy-content'
                className='w-fit p-2.5'
                data-element-id='process-hierarchy-content-area'
              />
            </div>
            {isIndexTabVisible && (
              <div id='index-tab' className='font-quicksand z-3 text-center font-medium'>
                {/* Could be used for instructions */}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal overlay: child routes (e.g. recording-settings) render on top */}
      <div
        aria-hidden='true'
        className='pointer-events-none fixed inset-0 z-0 *:pointer-events-auto'>
        <Outlet />
      </div>
    </div>
  )
}
