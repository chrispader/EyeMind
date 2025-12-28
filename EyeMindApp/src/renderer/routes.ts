import type { RouteConfig } from '@react-router/dev/routes'
import { route } from '@react-router/dev/routes'
import { DownloadModal } from './components/DownloadModal'
import { FixationSettingsModal } from './components/FixationSettingsModal'
import { GazeProjectionModal } from './components/GazeProjectionModal'
import { HeatmapSettingsModal } from './components/HeatmapSettingsModal'
import { AnalysisPage } from './pages/AnalysisPage'
import { HomePage } from './pages/HomePage'
import { EyeTrackingPage } from './pages/config/EyeTrackingPage'
import { EyeTrackingLoadModelsPage } from './pages/config/eye-tracking/config/EyeTrackingLoadModelsPage'
import { EyeTrackingLoadQuestionsPage } from './pages/config/eye-tracking/config/EyeTrackingLoadQuestionsPage'
import { EyeTrackingLoadSessionPage } from './pages/config/eye-tracking/config/EyeTrackingLoadSessionPage'
import { EyeTrackingNewSessionPage } from './pages/config/eye-tracking/config/EyeTrackingNewSessionPage'
import { EyeTrackingExperimentPage } from './pages/config/eye-tracking/experiment/EyeTrackingExperimentPage'

export const ROUTES_NAMES = {
  HOME: '/',

  EYE_TRACKING: '/eye-tracking',
  EYE_TRACKING_NEW_SESSION: '/eye-tracking/new-session',
  EYE_TRACKING_NEW_LOAD_MODELS: '/eye-tracking/load-models',
  EYE_TRACKING_LOAD_SESSION: '/eye-tracking/load-session',
  EYE_TRACKING_LOAD_QUESTIONS: '/eye-tracking/load-questions',
  EYE_TRACKING_EXPERIMENT: '/eye-tracking/experiment',

  ANALYSIS: '/analysis',
  FIXATION_SETTINGS: '/fixation-settings',
  HEATMAP_SETTINGS: '/heatmap-settings',
  DOWNLOAD: '/download',
  GAZE_PROJECTION: '/gaze-projection',
}

export default [
  route(ROUTES_NAMES.HOME, HomePage),
  route(ROUTES_NAMES.EYE_TRACKING, EyeTrackingPage),
  route(ROUTES_NAMES.EYE_TRACKING_NEW_SESSION, EyeTrackingNewSessionPage),
  route(ROUTES_NAMES.EYE_TRACKING_NEW_LOAD_MODELS, EyeTrackingLoadModelsPage),
  route(ROUTES_NAMES.EYE_TRACKING_LOAD_SESSION, EyeTrackingLoadSessionPage),
  route(ROUTES_NAMES.EYE_TRACKING_LOAD_QUESTIONS, EyeTrackingLoadQuestionsPage),
  route(ROUTES_NAMES.EYE_TRACKING_EXPERIMENT, EyeTrackingExperimentPage),
  route(ROUTES_NAMES.ANALYSIS, AnalysisPage),
  route(ROUTES_NAMES.FIXATION_SETTINGS, FixationSettingsModal),
  route(ROUTES_NAMES.HEATMAP_SETTINGS, HeatmapSettingsModal),
  route(ROUTES_NAMES.DOWNLOAD, DownloadModal),
  route(ROUTES_NAMES.GAZE_PROJECTION, GazeProjectionModal),
] satisfies RouteConfig
