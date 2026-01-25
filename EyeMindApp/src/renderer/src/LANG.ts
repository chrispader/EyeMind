/**
 * Language strings for the EyeMind application.
 * All user-facing strings should be defined here for maintainability and i18n readiness.
 */
const LANG = {
  // Common
  select: 'Select',
  remove: 'Remove',
  dismiss: 'Dismiss',
  update: 'Update',
  proceed: 'Proceed',
  continue: 'Continue',
  skip: 'Skip',
  download: 'Download',
  close: 'Close',
  loading: 'Loading',
  goBack: 'Go back',
  backToHome: 'Back to Home',
  group: 'Group:',

  // File Import
  setAsMain: 'Set as main',
  unclosableTab: 'Unclosable Tab',
  loadFiles: 'Load files',
  dropFiles: 'Drop files',
  dropModelsFiles: 'Drop models files',
  dropQuestionsFile: 'Drop a questions csv file',
  dropSessionFile: 'Drop a session file',
  dropImageFiles: 'Drop image files here (PNG, JPEG, GIF, WebP)',

  // Home Page
  eyeTracking: 'Eye-tracking',
  analysis: 'Analysis',

  // Eye-tracking Config
  newSession: 'New session',
  loadSession: 'Load session',
  advancedSettings: 'Advanced settings',
  linkingSubProcesses: 'Linking of sub-processes*:',
  linkingSubProcessesInfo:
    '*If linking is supported, then ids of the activities refering to collapsed sub-processes should be the same as the names of the corresponding BPMN files.',

  // Experiment Page
  eyeTrackingMode: 'Eye-tracking Mode',
  userConfiguration: 'User Configuration',
  generalOffsetCorrection: 'General offset correction',
  xOffset: 'x offset: ',
  yOffset: 'y offset: ',
  applyCorrectionToData: 'Apply correction to data',
  startQuestions: 'Start questions',
  questionsFinished: 'Questions finished',

  // Icon Alt Text
  iconRecord: 'Record',
  iconStop: 'Stop',
  iconFixationFilter: 'Fixation filter',
  iconProjectionsMapping: 'Projections mapping',
  iconHeatmap: 'Heatmap',
  iconDownload: 'Download',
  titleGazeProjections: 'Gaze projections and corrections',
  titleHeatmapOverlays: 'Heatmap and overlays',

  // Recording Settings Modal
  dataCollectionSettings: 'Data Collection Settings',
  xScreenDimension: ' X Screen dimension in pixels*: ',
  yScreenDimension: ' Y Screen dimension in pixels*: ',
  screenDistance: ' Screen distance in centimeters*: ',
  monitorSize: ' Monitor size in inches*: ',
  recordingId: ' Recording ID*: ',
  participantId: ' Participant ID: ',
  experimentId: ' Experiment ID: ',
  experimenterId: ' Experimenter ID:',
  additionalNotes: ' Additional notes: ',
  startRecording: 'Start recording',
  saveSession: 'Save Session',
  requiredFields: '* required fields',

  // Heatmap Settings Modal
  heatmapSettings: 'Heatmap Settings',
  participantFile: 'Participant (File) ',
  questionId: 'Question ID: ',
  measure: 'Measure: ',
  aggregationFunction: 'Aggregation function: ',
  timestampUnit: 'Timestamp unit: ',
  includePoolsLanes: 'Additionally include pools and lanes:',
  includeGroups: 'Additionally include groups (border only):',
  includeExpandedSubProcesses: 'Additionally include expended sub-processes:',
  includeProcesses: 'Additionally include processes:',
  includeEdges: 'Additionally include edges:',
  showHeatmap: 'Show heatmap',

  // Heatmap Measure Options
  visitDurationFixations: 'Visit Duration (From Fixations)',
  visitCountFixations: 'Visit Count (From Fixations)',
  visitDurationGazes: 'Visit Duration (From Gazes)',
  visitCountGazes: 'Visit Count (From Gazes)',
  fixationDuration: 'Fixation Duration',
  fixationCount: 'Fixation Count',

  // Aggregation Options
  sum: 'Sum',
  max: 'Max',
  min: 'Min',
  mean: 'Mean',
  count: 'Count',

  // Timestamp Unit Options
  second: 'Second',
  millisecond: 'Millisecond',
  microsecond: 'Microsecond',

  // Export Options Modal
  exportOptions: 'Export Options',
  fileType: 'File type ',
  analysisFile: 'Analysis File',
  gazeData: 'Gaze Data',
  fixationData: 'Fixation Data',

  // Gaze Projection Settings Modal
  gazeProjectionSettings: 'Gaze Projection Settings',
  gazeSampleSize: 'Gaze sample Size* ',
  generateGazeProjections: 'Generate Gaze Projections',
  gazeProjectionsInfo: '*For better performance, it is recommended to choose a small sample size.',

  // Error Messages
  errorsHeader: 'Errors:',
  errorOops: 'Oops!',
  errorUnexpected: 'An unexpected error occurred.',
  errorNoQuestionsFiles: 'No questions files to load. Please drop a questions file first.',
  errorValidatingQuestions: 'An error occured while validating the questions file',
  errorNotValidQuestionsFile: 'is not a valid questions file',
  errorAlreadyAdded: 'is already added',
  errorSingleFileOnly: 'Only a single file can be imported',
  errorExactlyOneMain: 'There must be exactly one model set as main',
  errorAllModelsNeedGroup: 'All models must be assigned to a group',
  errorNoModelsToLoad: 'No models to load',
  errorNotSupportedImageFormat: 'is not a supported image format',
  errorFailedToRead: 'Failed to read',
} as const

export type LangKey = keyof typeof LANG

export const translate = (key: LangKey): string => LANG[key]

export default LANG
