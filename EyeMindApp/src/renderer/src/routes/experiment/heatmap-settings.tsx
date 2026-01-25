import { createFileRoute } from '@tanstack/react-router'
import { ModalContainer } from '../../components/ModalContainer'
import { SelectField, CheckboxField, SubmitButton } from '../../components/form'

export const Route = createFileRoute('/experiment/heatmap-settings')({
  component: HeatmapSettingsPage,
})

function HeatmapSettingsPage(): React.ReactElement {
  return (
    <ModalContainer
      id="heatmap-settings-modal"
      className="heatmap-settings-modal"
      title="Heatmap Settings"
      closeId="close-heatmap-settings">
      <SelectField label="Participant (File) " id="participants-files-heatmap" multiple />

      <SelectField label="Question ID: " id="question">
        <option value="">Select</option>
      </SelectField>

      <SelectField label="Measure: " id="measure">
        <option value="" data-measure-type="" data-aggregations="">
          Select
        </option>
        <option
          value="visit_duration"
          data-measure-type="element_level"
          data-aggregations="sum-max-min-mean">
          Visit Duration (From Fixations)
        </option>
        <option value="visit_count" data-measure-type="element_level" data-aggregations="count">
          Visit Count (From Fixations)
        </option>
        <option
          value="visit_duration"
          data-measure-type="gaze_level"
          data-aggregations="sum-max-min-mean">
          Visit Duration (From Gazes)
        </option>
        <option value="visit_count" data-measure-type="gaze_level" data-aggregations="count">
          Visit Count (From Gazes)
        </option>
        <option
          value="Fixation Duration"
          data-measure-type="fixation_level"
          data-aggregations="sum-max-min-mean">
          Fixation Duration
        </option>
        <option value="Fixation Count" data-measure-type="fixation_level" data-aggregations="count">
          Fixation Count
        </option>
      </SelectField>

      <SelectField label="Aggregation function: " id="aggregation">
        <option id="no-aggr" value="" data-aggregation-type="" className="">
          Select
        </option>
        <option id="sum-aggr" value="sum" data-aggregation-type="time" className="aggr">
          Sum
        </option>
        <option id="max-aggr" value="max" data-aggregation-type="time" className="aggr">
          Max
        </option>
        <option id="min-aggr" value="min" data-aggregation-type="time" className="aggr">
          Min
        </option>
        <option id="mean-aggr" value="mean" data-aggregation-type="time" className="aggr">
          Mean
        </option>
        <option id="count-aggr" value="count" data-aggregation-type="number" className="aggr">
          Count
        </option>
      </SelectField>

      <SelectField label="Timestamp unit: " id="timestamp-unit" defaultValue="ms">
        <option value="s">Second</option>
        <option value="ms">Millisecond</option>
        <option value="us">Microsecond</option>
      </SelectField>

      <CheckboxField label="Additionally include pools and lanes:" id="inc-pools-lanes" />
      <CheckboxField label="Additionally include groups (border only):" id="inc-groups" />
      <CheckboxField label="Additionally include expended sub-processes:" id="inc-expended-sub-processes" />
      <CheckboxField label="Additionally include processes:" id="inc-processes" />
      <CheckboxField label="Additionally include edges:" id="inc-edges" />

      <SubmitButton id="submit-heatmap-form" value="Show heatmap" />
    </ModalContainer>
  )
}
