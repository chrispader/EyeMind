


const {ipcMain} = require('electron')
const {getState, getScreenInfo,setheatmapActive,clearState,getSnapshots,SetProjectionAndMappingActive,getStyleParameters,setAreGazesCorrected,isHeatmapActive,areProjectionAndMappingActive,getQuestions} = require('../app/server/node/dataModels/state')

// check the return 
function stateListeners() {
	

	ipcMain.handle('getState', async function() {
		return  await getState();
	});


	ipcMain.handle('getScreenInfo', async function(e, args) {
		return  await getScreenInfo(...args);
	});


	ipcMain.handle('setheatmapActive', async function(e, args) {
		return  await setheatmapActive(...args);
	});


	ipcMain.handle('clearState', async function(e, args) {
		return  await clearState();
	});

	ipcMain.handle('getSnapshots', async function() {
		return  await getSnapshots();
	});

	ipcMain.handle('SetProjectionAndMappingActive', async function(e, args) {
		return  await SetProjectionAndMappingActive(...args);
	});

	ipcMain.handle('getStyleParameters', async function() {
		return  await getStyleParameters();
	});

	ipcMain.handle('setAreGazesCorrected', async function(e, args) {
		return  await setAreGazesCorrected(...args);
	});


	ipcMain.handle('isHeatmapActive', async function() {
		return  await isHeatmapActive();
	});

	ipcMain.handle('areProjectionAndMappingActive', async function() {
		return  await areProjectionAndMappingActive();
	});

	ipcMain.handle('getQuestions', async function() {
		return  await getQuestions();
	});

	

}




exports.stateListeners = stateListeners;
