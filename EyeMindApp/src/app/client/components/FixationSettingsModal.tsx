import React from 'react'

export function FixationSettingsModal(): React.ReactElement {
  return (
    <div className='fixation-settings-view' id='fixation-settings-view'>
      <div className='fixation-settings-box' id='fixation-settings-box'>
        <span className='close' id='close-fixation-settings-projection'>
          <img className='close-icon' id='close-icon' src='icons/close.svg' alt='Close' />
        </span>

        <h2>Fixation Detection Settings</h2>
        <h3 style={{ paddingBottom: '30px', color: 'grey' }}>
          Using the Velocity-Threshold Identification (I-VT) fixation classification
          algorithm
        </h3>

        <div className='section'>
          <div className='title'>
            Interpolation: <input type='checkbox' id='is-interpolation' defaultChecked />
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
  )
}
