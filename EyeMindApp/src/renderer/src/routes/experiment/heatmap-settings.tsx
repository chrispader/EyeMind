import LANG from '@renderer/LANG'
import { createFileRoute } from '@tanstack/react-router'

import { ModalContainer } from '../../components/ModalContainer'
import { CheckboxField, SelectField, SubmitButton } from '../../components/form'

export const Route = createFileRoute('/experiment/heatmap-settings')({
  component: HeatmapSettingsPage,
})

function HeatmapSettingsPage(): React.ReactElement {
  return (
    <ModalContainer
      id='heatmap-settings-modal'
      className='heatmap-settings-modal'
      title={LANG.heatmapSettings}
      closeId='close-heatmap-settings'>
      <SelectField
        label={LANG.participantFile}
        id='participants-files-heatmap'
        multiple
      />

      <SelectField label={LANG.questionId} id='question'>
        <option value=''>{LANG.select}</option>
      </SelectField>

      <SelectField label={LANG.measure} id='measure'>
        <option value='' data-measure-type='' data-aggregations=''>
          {LANG.select}
        </option>
        <option
          value='visit_duration'
          data-measure-type='element_level'
          data-aggregations='sum-max-min-mean'>
          {LANG.visitDurationFixations}
        </option>
        <option
          value='visit_count'
          data-measure-type='element_level'
          data-aggregations='count'>
          {LANG.visitCountFixations}
        </option>
        <option
          value='visit_duration'
          data-measure-type='gaze_level'
          data-aggregations='sum-max-min-mean'>
          {LANG.visitDurationGazes}
        </option>
        <option
          value='visit_count'
          data-measure-type='gaze_level'
          data-aggregations='count'>
          {LANG.visitCountGazes}
        </option>
        <option
          value='Fixation Duration'
          data-measure-type='fixation_level'
          data-aggregations='sum-max-min-mean'>
          {LANG.fixationDuration}
        </option>
        <option
          value='Fixation Count'
          data-measure-type='fixation_level'
          data-aggregations='count'>
          {LANG.fixationCount}
        </option>
      </SelectField>

      <SelectField label={LANG.aggregationFunction} id='aggregation'>
        <option id='no-aggr' value='' data-aggregation-type='' className=''>
          {LANG.select}
        </option>
        <option id='sum-aggr' value='sum' data-aggregation-type='time' className='aggr'>
          {LANG.sum}
        </option>
        <option id='max-aggr' value='max' data-aggregation-type='time' className='aggr'>
          {LANG.max}
        </option>
        <option id='min-aggr' value='min' data-aggregation-type='time' className='aggr'>
          {LANG.min}
        </option>
        <option id='mean-aggr' value='mean' data-aggregation-type='time' className='aggr'>
          {LANG.mean}
        </option>
        <option
          id='count-aggr'
          value='count'
          data-aggregation-type='number'
          className='aggr'>
          {LANG.count}
        </option>
      </SelectField>

      <SelectField label={LANG.timestampUnit} id='timestamp-unit' defaultValue='ms'>
        <option value='s'>{LANG.second}</option>
        <option value='ms'>{LANG.millisecond}</option>
        <option value='us'>{LANG.microsecond}</option>
      </SelectField>

      <CheckboxField label={LANG.includePoolsLanes} id='inc-pools-lanes' />
      <CheckboxField label={LANG.includeGroups} id='inc-groups' />
      <CheckboxField
        label={LANG.includeExpandedSubProcesses}
        id='inc-expended-sub-processes'
      />
      <CheckboxField label={LANG.includeProcesses} id='inc-processes' />
      <CheckboxField label={LANG.includeEdges} id='inc-edges' />

      <SubmitButton id='submit-heatmap-form' value={LANG.showHeatmap} />
    </ModalContainer>
  )
}
