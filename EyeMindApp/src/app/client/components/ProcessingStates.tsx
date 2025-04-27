import React from 'react'

export function ProcessingStates(): React.ReactElement {
  return (
    <>
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
