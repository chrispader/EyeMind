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


import {registerFileUpload} from './files-setup'
import {projectionInteraction} from './gaze-projections.js'
import {enableHeatmapOption} from './heatmap.js'
import {loadETSettingsView} from './fixation-filter.js'
import {downloadInteraction} from './download'
import {getState} from '../dataModels/state'
import $ from 'jquery';

var REPORT_FREQUENCY = 1000;


/* Analysis */


async function analysisModeInteraction() { 

  // console.log("analysisModeInteraction function",arguments);

  var state = getState();

  // set state mode
  state.mode="analysis"; 

  // set state import mode
  state.importMode = "single";

  // set expected  artifact and extensions 
  state.temp.expectedArtifact = "analysis";
  state.temp.expectedExtensions = ["json"]; 

  /// lunch R server
  if(window.hasOwnProperty("electron")) {
    window.Rserver.startRserver();
   }

  
  /// import 
  document.getElementById("main-view").style.display = "none"; 
  document.getElementById("import-view").style.display = "flex"; 
  document.getElementById("upload-label").innerText = "Drop one BPM Eye Mind gaze file"; 
  registerFileUpload();
  

  // fixation settings 
    // internal comment: async does not have to written here, it already onlick 
  document.getElementById("fixation-filter-btn").onclick = () => { loadETSettingsView(); }
 
  // loaded-content 
  document.getElementById("mode-text").innerText = "Analysis Mode"; 
  document.getElementById("feature-text").innerText = ""; 
  document.getElementById("analysis-icons").style.display = "block";

  // gaze projection and mapping 
  document.getElementById("projections-mapping-btn").onclick = () => projectionInteraction();

  // download
  document.getElementById("download-btn").onclick = () => downloadInteraction();

  //enableHeatmapOption in ui/heatmap.js

  // // hide questions-container
   document.getElementById("questions-container").style.display = "none";
  
  // // adjust layout
  //  document.getElementById("nav-tabs-and-tabs").style.height = "calc(100% - 110px)"; // not neede



  
}










export {analysisModeInteraction}