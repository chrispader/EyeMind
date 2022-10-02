const {app, ipcMain} = require('electron')
const path = require('path')
const child = require('child_process');
const request = require('request-promise');
const {globalParameters} = require('../globals')

const {fixationFilter} = require('../app/server/node/connectors/fixation-filter')


function fixationFilterListeners(mainWindow) {
	//console.log("fixationFilterListener function",arguments);

	ipcMain.once('startRserver', async function() {

	   /* lunch R server */
	   console.log("start R server");

	   // in case the server is on, it will shutdown to start a new instance
	   //await shutdownFixationFilterServer();
	   // taskkill /IM "RScript.exe" /F


	  var mainRPath = path.join(app.getAppPath(), "app", "server", "R", "fixationDetection", "main.R" ).replace(/\\/g, "\\\\");
	  var execPath = path.join(app.getAppPath(), "environments", "R", "bin", "RScript.exe" )

	  const childProcess = child.spawn(execPath, ["-e", "library(plumber); pr('"+mainRPath+"') %>% pr_run(port="+globalParameters.R_PORT+");"])
	  childProcess.stdout.on('data', (data) => {
	    console.log(`stdout -:${data}`)
	  })
	  childProcess.stderr.on('data', (data) => {
	    console.log(`stderr -:${data}`)
	  })
	});


	ipcMain.handle('fixationFilter', function(e, args) {
		args.push(mainWindow)
		return  fixationFilter(...args);
	});


}


async function shutdownFixationFilterServer() {
	 console.log("shutdownFixationFilterServer function",arguments);

	 await request({method: globalParameters.COMMUNICATION_METHOD_TO_R_SERVER, uri: globalParameters.COMMUNICATION_HOST_TO_R_SERVER+":"+globalParameters.R_PORT+"/quit", body:""})
}


exports.fixationFilterListeners = fixationFilterListeners;
exports.shutdownFixationFilterServer = shutdownFixationFilterServer;