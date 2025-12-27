export function EyeTrackingExperimentPage(): React.ReactElement {
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
                <img
                  id='record-btn'
                  className='icon'
                  src='icons/record_enabled.svg'
                  width='20px'
                  height='20px'
                  alt='Record'
                />
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
            id='to-tab-left'
            className='to-tab-left gaze-element'
            data-element-id='to-tab-left-button'>
            &lt;&lt;
          </div>
          <div className='nav-tabs' id='nav-tabs'></div>
          <div
            id='to-tab-right'
            className='to-tab-right gaze-element'
            data-element-id='to-tab-right-button'>
            &gt;
          </div>
        </div>

        <div className='tabs' id='tabs'>
          <div
            id='explorer'
            className='explorer gaze-element'
            data-element-id='file-explorer-area'>
            <ul id='explorer-groups' className='root'></ul>
          </div>
          <div id='tabs-containers' className='tabs-containers'>
            <div id='process-hierarchy' className='process-hierarchy'>
              <div
                id='process-hierarchy-content'
                className='process-hierarchy-content gaze-element'
                data-element-id='process-hierarchy-content-area'></div>
            </div>
            <div id='index-tab' className='index-tab'>
              {/* Could be used for instructions */}
            </div>
          </div>
        </div>
      </div>

      <div id='startET-modal' className='startET-modal'>
        <div className='content'>
          <span className='close' id='close-startET-modal'>
            <img
              className='close-icon'
              id='close-icon'
              src='icons/close.svg'
              alt='Close'
            />
          </span>

          <h2>Data Collection Settings</h2>

          <div>
            <div className='row'>
              <div className='column'>
                <span className='text'> X Screen dimension in pixels*: </span>
              </div>
              <div className='column'>
                <input className='form-input' id='x-dim' type='text' />
              </div>
            </div>

            <div className='row'>
              <div className='column'>
                <span className='text'> Y Screen dimension in pixels*: </span>
              </div>
              <div className='column'>
                <input className='form-input' id='y-dim' type='text' />
              </div>
            </div>

            <div className='row'>
              <div className='column'>
                <span className='text'> Screen distance in centimeters*: </span>
              </div>
              <div className='column'>
                <input className='form-input' id='screen-distance' type='text' value='' />
              </div>
            </div>

            <div className='row'>
              <div className='column'>
                <span className='text'> Monitor size in inches*: </span>
              </div>
              <div className='column'>
                <input className='form-input' id='monitor-size' type='text' />
              </div>
            </div>

            <div className='row'>
              <div className='column'>
                <span className='text'> Recording ID*: </span>
              </div>
              <div className='column'>
                <input className='form-input' id='recording-id' type='text' />
              </div>
            </div>

            <div className='row'>
              <div className='column'>
                <span className='text'> Participant ID: </span>
              </div>
              <div className='column'>
                <input className='form-input' id='participant-id' type='text' />
              </div>
            </div>

            <div className='row'>
              <div className='column'>
                <span className='text'> Experiment ID: </span>
              </div>
              <div className='column'>
                <input className='form-input' id='experiment-id' type='text' />
              </div>
            </div>

            <div className='row'>
              <div className='column'>
                <span className='text'> Experimenter ID:</span>
              </div>
              <div className='column'>
                <input className='form-input' id='experimenter-id' type='text' />
              </div>
            </div>

            <div className='row'>
              <div className='column'>
                <span className='text'> Additional notes: </span>
              </div>
              <div className='column'>
                <textarea
                  className='form-input'
                  id='additional-notes'
                  rows={4}
                  cols={25}></textarea>
              </div>
            </div>

            <div className='row'>
              <div style={{ textAlign: 'center' }}>
                <input
                  type='submit'
                  className='submit-form-button'
                  id='submit-recording-form'
                  value='Start recording'
                />
                <input
                  type='submit'
                  className='save-session'
                  id='save-session'
                  value='Save Session'
                />
              </div>
            </div>

            <div className='row'>
              <div style={{ textAlign: 'center' }}>* required fields</div>
            </div>
          </div>
        </div>
      </div>

      <div id='heatmap-settings-modal' className='heatmap-settings-modal'>
        <div className='content'>
          <span className='close' id='close-heatmap-settings'>
            <img
              className='close-icon'
              id='close-icon'
              src='icons/close.svg'
              alt='Close'
            />
          </span>

          <h2>Heatmap Settings</h2>

          <div>
            <div className='row'>
              <div className='column'>
                <span className='text'>Participant (File) </span>
              </div>
              <div className='column'>
                <select
                  className='form-select-multiple'
                  multiple
                  id='participants-files-heatmap'></select>
              </div>
            </div>

            <div className='row'>
              <div className='column'>
                <span className='text'>Question ID: </span>
              </div>
              <div className='column'>
                <select className='form-select' id='question'>
                  <option value=''>Select</option>
                </select>
              </div>
            </div>

            <div className='row'>
              <div className='column'>
                <span className='text'>Measure: </span>
              </div>
              <div className='column'>
                <select className='form-select' id='measure'>
                  <option value='' data-measure-type='' data-aggregations=''>
                    Select
                  </option>
                  <option
                    value='visit_duration'
                    data-measure-type='element_level'
                    data-aggregations='sum-max-min-mean'>
                    Visit Duration (From Fixations)
                  </option>
                  <option
                    value='visit_count'
                    data-measure-type='element_level'
                    data-aggregations='count'>
                    Visit Count (From Fixations)
                  </option>
                  <option
                    value='visit_duration'
                    data-measure-type='gaze_level'
                    data-aggregations='sum-max-min-mean'>
                    Visit Duration (From Gazes)
                  </option>
                  <option
                    value='visit_count'
                    data-measure-type='gaze_level'
                    data-aggregations='count'>
                    Visit Count (From Gazes)
                  </option>
                  <option
                    value='Fixation Duration'
                    data-measure-type='fixation_level'
                    data-aggregations='sum-max-min-mean'>
                    Fixation Duration
                  </option>
                  <option
                    value='Fixation Count'
                    data-measure-type='fixation_level'
                    data-aggregations='count'>
                    Fixation Count
                  </option>
                </select>
              </div>
            </div>

            <div className='row'>
              <div className='column'>
                <span className='text'>Aggregation function: </span>
              </div>
              <div className='column'>
                <select className='form-select' id='aggregation'>
                  <option id='no-aggr' value='' data-aggregation-type='' className=''>
                    Select
                  </option>
                  <option
                    id='sum-aggr'
                    value='sum'
                    data-aggregation-type='time'
                    className='aggr'>
                    Sum
                  </option>
                  <option
                    id='max-aggr'
                    value='max'
                    data-aggregation-type='time'
                    className='aggr'>
                    Max
                  </option>
                  <option
                    id='min-aggr'
                    value='min'
                    data-aggregation-type='time'
                    className='aggr'>
                    Min
                  </option>
                  <option
                    id='mean-aggr'
                    value='mean'
                    data-aggregation-type='time'
                    className='aggr'>
                    Mean
                  </option>
                  <option
                    id='count-aggr'
                    value='count'
                    data-aggregation-type='number'
                    className='aggr'>
                    Count
                  </option>
                </select>
              </div>
            </div>

            <div className='row'>
              <div className='column'>
                <span className='text'>Timestamp unit: </span>
              </div>
              <div className='column'>
                <select className='form-select' id='timestamp-unit' defaultValue='ms'>
                  <option value='s'>Second</option>
                  <option value='ms'>Millisecond</option>
                  <option value='us'>Microsecond</option>
                </select>
              </div>
            </div>

            <div className='row'>
              <div className='column'>
                <span className='text'>Additionally include pools and lanes:</span>
              </div>
              <div className='column'>
                <input className='form-check-box' type='checkbox' id='inc-pools-lanes' />
              </div>
            </div>

            <div className='row'>
              <div className='column'>
                <span className='text'>Additionally include groups (border only):</span>
              </div>
              <div className='column'>
                <input className='form-check-box' type='checkbox' id='inc-groups' />
              </div>
            </div>

            <div className='row'>
              <div className='column'>
                <span className='text'>Additionally include expended sub-processes:</span>
              </div>
              <div className='column'>
                <input
                  className='form-check-box'
                  type='checkbox'
                  id='inc-expended-sub-processes'
                />
              </div>
            </div>

            <div className='row'>
              <div className='column'>
                <span className='text'>Additionally include processes:</span>
              </div>
              <div className='column'>
                <input className='form-check-box' type='checkbox' id='inc-processes' />
              </div>
            </div>

            <div className='row'>
              <div className='column'>
                <span className='text'>Additionally include edges:</span>
              </div>
              <div className='column'>
                <input className='form-check-box' type='checkbox' id='inc-edges' />
              </div>
            </div>

            <div className='row'>
              <div style={{ textAlign: 'center' }}>
                <input
                  type='submit'
                  className='submit-form-button'
                  id='submit-heatmap-form'
                  value='Show heatmap'
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id='download-modal' className='download-modal'>
        <div className='content'>
          <span className='close' id='close-download'>
            <img
              className='close-icon'
              id='close-icon'
              src='icons/close.svg'
              alt='Close'
            />
          </span>

          <h2>Export Options</h2>

          <div>
            <div className='row'>
              <div className='column'>
                <span className='text'>File type </span>
              </div>
              <div className='column'>
                <select className='form-select' id='download-file-type'>
                  <option value='analysis-data'>Analysis File</option>
                  <option value='gaze-data'>Gaze Data</option>
                  <option value='fixation-data'>Fixation Data</option>
                </select>
              </div>
            </div>

            <div className='row'>
              <div style={{ textAlign: 'center' }}>
                <input
                  type='submit'
                  id='submit-download-form'
                  className='submit-form-button'
                  value='Download'
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id='gaze-projection-modal' className='gaze-projection-modal'>
        <div className='content'>
          <span className='close' id='close-gaze-projection'>
            <img
              className='close-icon'
              id='close-icon'
              src='icons/close.svg'
              alt='Close'
            />
          </span>

          <h2>Gaze Projection Settings</h2>

          <div>
            <div className='row'>
              <div className='column'>
                <span className='text'>Gaze sample Size* </span>
              </div>
              <div className='column'>
                <input
                  className='form-input'
                  id='gaze-sample-size-in-percentage'
                  type='text'
                  defaultValue='20'
                />
                %
              </div>
            </div>

            <div className='row'>
              <div className='column'>
                <span className='text'>Participant (File) </span>
              </div>
              <div className='column'>
                <select className='form-select' id='participant-file-gaze-projection'>
                  <option value=''>Select</option>
                </select>
              </div>
            </div>

            <div className='row'>
              <div style={{ textAlign: 'center' }}>
                <input
                  type='submit'
                  id='submit-gaze-projection-form'
                  className='submit-form-button'
                  value='Generate Gaze Projections'
                />
              </div>
            </div>

            <div className='row'>
              <div id='info-gaze-projections' className='info-gaze-projections'>
                *For better performance, it is recommended to choose a small sample size.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
