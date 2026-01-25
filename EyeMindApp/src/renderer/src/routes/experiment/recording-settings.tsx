import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/experiment/recording-settings')({
  component: RecordingSettingsPage,
})

function RecordingSettingsPage(): React.ReactElement {
  return (
    <div id='startET-modal' className='startET-modal' style={{ display: 'flex' }}>
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
              <input className='form-input' id='screen-distance' type='text' defaultValue='' />
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
  )
}
