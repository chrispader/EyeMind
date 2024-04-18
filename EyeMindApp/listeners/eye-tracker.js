const {ipcMain} = require('electron')
const {setupTracking, sendSnapshotID, sendFullSnapshot, sendQuestionEvent, processGazeData, dataMapped, sendClickEvent, sendSimulationEvent} = require('../app/server/node/connectors/eye-tracker')


function eyeTrackerListeners(mainWindow) {

	ipcMain.handle('setupTracking', function(e, args) {
		return  setupTracking(...args);
	});

	ipcMain.handle('sendSnapshotID', function(e, args) {
		return  sendSnapshotID(...args);
	});

	ipcMain.handle('sendFullSnapshot', function(e, args) {
		return  sendFullSnapshot(...args);
	});

	ipcMain.handle('sendQuestionEvent', function(e, args) {
		return  sendQuestionEvent(...args);
	});

	ipcMain.handle('processGazeData', function(e, args) {
		args.push(mainWindow)
		return  processGazeData(...args);
	});

	ipcMain.handle('dataMapped', function(e, args) {
		args.push(mainWindow)
		return  dataMapped(...args);
	});

	ipcMain.handle('sendClickEvent', function(e, args) {
		return  sendClickEvent(...args);
	});

		ipcMain.handle('sendSimulationEvent', function(e, args) {
    		return  sendSimulationEvent(...args);
    	});

	
}



exports.eyeTrackerListeners = eyeTrackerListeners;
