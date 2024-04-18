/*MIT License

Copyright (c) 2022 Eye-Mind Tool (Author: Amine Abbad-Andaloussi)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.*/
import {getState} from '../dataModels/state'


/**
 * Title: send simulation event to the ET server through the server side
 #
 # Description: send simulation event to the ET server through the server side
 #
 # @param {string} simulationEventTimestamp timestamp when the event occured
 # @param {string} fileName name of the model file simulated
 # @param {string} simulationID id of the simulation
  # @param {string} simulationEvent simulation event
 * 
 * Returns {void}
 *
 *
 *
 */
async function sendSimulationEvent(simulationEventTimestamp,fileName,simulationID,simulationEvent) {

	console.log("sendSimulationEvent",arguments)

	var state = getState();

	if(state.isEtOn) {

		const res = await window.eyeTracker.sendSimulationEvent(simulationEventTimestamp,fileName,simulationID,simulationEvent);
		 if(!res.sucess){
				console.error(res.msg);
		 }

	}
}




export{sendSimulationEvent}

