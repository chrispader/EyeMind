const {ipcMain} = require('electron')
const {saveSession} = require('../app/server/node/utils/session')



// check the return 
function sessionListeners() {
	

	ipcMain.handle('saveSession', function(e, args) {
		return  saveSession(...args);
	});


}




exports.sessionListeners = sessionListeners;