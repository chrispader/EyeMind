const {getState,setState} = require('../dataModels/state')
const {stateDownload} = require('../utils/download');

async function saveSession(state) {

 setState(state);

 const downloadOutput = await stateDownload("EyeMind",true,"session-data");

 return downloadOutput;      
}

exports.saveSession = saveSession;