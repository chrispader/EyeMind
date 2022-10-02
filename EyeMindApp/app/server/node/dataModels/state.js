


/* inits */
var state = {
    snapshotsCounter: 0,
    activeTab: null,
    processedGazeData: {},
    isEtOn: false,
    models: {},
    mode: null,
    temp: {},
    linkingSubProcessesMode: null,
    questions: null
    }


function getState() {
	return state;
}

function setState(newState) {
	state = newState;
}

function getSnapshots() {
    return state.snapshots;
}

function getQuestions() {
    return state.questions;
}

function getScreenInfo() {
	return {
		xScreenDim: state.processedGazeData.xScreenDim,
		yScreenDim: state.processedGazeData.yScreenDim,
		screenDistance: state.processedGazeData.screenDistance,
		monitorSize: state.processedGazeData.monitorSize
	}
}




function setheatmapActive(val) {
	state["heatmapActive"] = val;
}

function SetProjectionAndMappingActive(val) {
    state["projectionAndMappingActive"] = val;
}

function isHeatmapActive() {
    return state.heatmapActive;
}

function clearState() {
	state = {
    snapshotsCounter: 0,
    activeTab: null,
    processedGazeData: {},
    isEtOn: false,
    models: {},
    mode: null,
    temp: {},
    linkingSubProcessesMode: null,
    questions: null
}

}

function getStyleParameters() {
    return state.getStyleParameters;
}

function setAreGazesCorrected(val) {
    state["processedGazeData"]["areGazesCorrected"] = val;
}


function areProjectionAndMappingActive() {
    return state.projectionAndMappingActive;
}

exports.getState = getState;
exports.setState = setState;
exports.getScreenInfo = getScreenInfo;
exports.setheatmapActive = setheatmapActive;
exports.clearState = clearState;
exports.getSnapshots = getSnapshots;
exports.SetProjectionAndMappingActive = SetProjectionAndMappingActive;
exports.getStyleParameters = getStyleParameters;
exports.setAreGazesCorrected = setAreGazesCorrected;
exports.isHeatmapActive = isHeatmapActive;
exports.areProjectionAndMappingActive = areProjectionAndMappingActive;
exports.getQuestions = getQuestions;
