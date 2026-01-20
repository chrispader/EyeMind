import React from 'react'

export function DownloadModal(): React.ReactElement {
  return (
    <div id="download-modal" className="download-modal">
      <div className="content">
        <span className="close" id="close-download">
          <img className="close-icon" id="close-icon" src="icons/close.svg" alt="Close" />
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
  )
}
