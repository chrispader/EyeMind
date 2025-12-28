import React from 'react'

export function ProcessingStates(): React.ReactElement {
  return (
    <div id="finished-processing-gaze-data" className="finished-processing-gaze-data">
      <div className="centered-content">
        <div className="centered-content">
          Processing Finished. <br />
          <br /> Close the app or use Crtl+R to reload it for further data collection or
          analysis.
        </div>
      </div>
    </div>
  )
}
