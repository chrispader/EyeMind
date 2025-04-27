import React from 'react'

export function HeatmapSettingsModal(): React.ReactElement {
  return (
    <div id="heatmap-settings-modal" className="heatmap-settings-modal">
      <div className="content">
        <span className="close" id="close-heatmap-settings">
          <img className="close-icon" id="close-icon" src="icons/close.svg" alt="Close" />
        </span>

        <h2>Heatmap Settings</h2>

        <div>
          <div className="row">
            <div className="column">
              <span className="text">Participant (File) </span>
            </div>
            <div className="column">
              <select
                className="form-select-multiple"
                multiple
                id="participants-files-heatmap"></select>
            </div>
          </div>

          <div className="row">
            <div className="column">
              <span className="text">Question ID: </span>
            </div>
            <div className="column">
              <select className="form-select" id="question">
                <option value="">Select</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="column">
              <span className="text">Measure: </span>
            </div>
            <div className="column">
              <select className="form-select" id="measure">
                <option value="" data-measure-type="" data-aggregations="">
                  Select
                </option>
                <option
                  value="visit_duration"
                  data-measure-type="element_level"
                  data-aggregations="sum-max-min-mean">
                  Visit Duration (From Fixations)
                </option>
                <option
                  value="visit_count"
                  data-measure-type="element_level"
                  data-aggregations="count">
                  Visit Count (From Fixations)
                </option>
                <option
                  value="visit_duration"
                  data-measure-type="gaze_level"
                  data-aggregations="sum-max-min-mean">
                  Visit Duration (From Gazes)
                </option>
                <option
                  value="visit_count"
                  data-measure-type="gaze_level"
                  data-aggregations="count">
                  Visit Count (From Gazes)
                </option>
                <option
                  value="Fixation Duration"
                  data-measure-type="fixation_level"
                  data-aggregations="sum-max-min-mean">
                  Fixation Duration
                </option>
                <option
                  value="Fixation Count"
                  data-measure-type="fixation_level"
                  data-aggregations="count">
                  Fixation Count
                </option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="column">
              <span className="text">Aggregation function: </span>
            </div>
            <div className="column">
              <select className="form-select" id="aggregation">
                <option id="no-aggr" value="" data-aggregation-type="" className="">
                  Select
                </option>
                <option
                  id="sum-aggr"
                  value="sum"
                  data-aggregation-type="time"
                  className="aggr">
                  Sum
                </option>
                <option
                  id="max-aggr"
                  value="max"
                  data-aggregation-type="time"
                  className="aggr">
                  Max
                </option>
                <option
                  id="min-aggr"
                  value="min"
                  data-aggregation-type="time"
                  className="aggr">
                  Min
                </option>
                <option
                  id="mean-aggr"
                  value="mean"
                  data-aggregation-type="time"
                  className="aggr">
                  Mean
                </option>
                <option
                  id="count-aggr"
                  value="count"
                  data-aggregation-type="number"
                  className="aggr">
                  Count
                </option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="column">
              <span className="text">Timestamp unit: </span>
            </div>
            <div className="column">
              <select className="form-select" id="timestamp-unit">
                <option value="s">Second</option>
                <option value="ms" selected>
                  Millisecond
                </option>
                <option value="us">Microsecond</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="column">
              <span className="text">Additionally include pools and lanes:</span>
            </div>
            <div className="column">
              <input className="form-check-box" type="checkbox" id="inc-pools-lanes" />
            </div>
          </div>

          <div className="row">
            <div className="column">
              <span className="text">Additionally include groups (border only):</span>
            </div>
            <div className="column">
              <input className="form-check-box" type="checkbox" id="inc-groups" />
            </div>
          </div>

          <div className="row">
            <div className="column">
              <span className="text">Additionally include expended sub-processes:</span>
            </div>
            <div className="column">
              <input
                className="form-check-box"
                type="checkbox"
                id="inc-expended-sub-processes"
              />
            </div>
          </div>

          <div className="row">
            <div className="column">
              <span className="text">Additionally include processes:</span>
            </div>
            <div className="column">
              <input className="form-check-box" type="checkbox" id="inc-processes" />
            </div>
          </div>

          <div className="row">
            <div className="column">
              <span className="text">Additionally include edges:</span>
            </div>
            <div className="column">
              <input className="form-check-box" type="checkbox" id="inc-edges" />
            </div>
          </div>

          <div className="row">
            <div style={{ textAlign: 'center' }}>
              <input
                type="submit"
                className="submit-form-button"
                id="submit-heatmap-form"
                value="Show heatmap"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
