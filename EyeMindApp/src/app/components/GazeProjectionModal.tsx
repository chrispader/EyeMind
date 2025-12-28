import React from 'react'

export function GazeProjectionModal(): React.ReactElement {
  return (
    <div id='gaze-projection-modal' className='gaze-projection-modal'>
      <div className='content'>
        <span className='close' id='close-gaze-projection'>
          <img className='close-icon' id='close-icon' src='icons/close.svg' alt='Close' />
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
  )
}
