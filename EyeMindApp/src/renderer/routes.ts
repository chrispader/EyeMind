import type { RouteConfig } from '@react-router/dev/routes'
import { flatRoutes } from '@react-router/fs-routes'

export default flatRoutes() satisfies RouteConfig

// export default [
//   index('./pages/HomePage'),
//   route(ROUTES_NAMES.EYE_TRACKING, './pages/config/EyeTrackingPage'),
//   route(
//     ROUTES_NAMES.EYE_TRACKING_NEW_SESSION,
//     './pages/config/eye-tracking/config/EyeTrackingNewSessionPage',
//   ),
//   route(
//     ROUTES_NAMES.EYE_TRACKING_NEW_LOAD_MODELS,
//     './pages/config/eye-tracking/config/EyeTrackingLoadModelsPage',
//   ),
//   route(
//     ROUTES_NAMES.EYE_TRACKING_LOAD_SESSION,
//     './pages/config/eye-tracking/config/EyeTrackingLoadSessionPage',
//   ),
//   route(
//     ROUTES_NAMES.EYE_TRACKING_LOAD_QUESTIONS,
//     './pages/config/eye-tracking/config/EyeTrackingLoadQuestionsPage',
//   ),
//   route(
//     ROUTES_NAMES.EYE_TRACKING_EXPERIMENT,
//     './pages/config/eye-tracking/experiment/EyeTrackingExperimentPage',
//   ),
//   route(ROUTES_NAMES.ANALYSIS, './pages/AnalysisPage'),
//   route(ROUTES_NAMES.FIXATION_SETTINGS, './components/FixationSettingsModal'),
//   route(ROUTES_NAMES.HEATMAP_SETTINGS, './components/HeatmapSettingsModal'),
//   route(ROUTES_NAMES.DOWNLOAD, './components/DownloadModal'),
//   route(ROUTES_NAMES.GAZE_PROJECTION, './components/GazeProjectionModal'),
// ] satisfies RouteConfig
