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



const {DataFrame} =  require("dataframe-js");
const fs = require('fs');
const path = require('path');
const bfj = require('bfj');
const {globalParameters} =  require('../../../../globals.js');
const {getState,setState} = require('../dataModels/state')


 async function stateDownload(fileName,includeTimeStampInFileName,type) {
  
  //console.log("stateDownload function",arguments);

  const state = getState();

  const timestamp = Date.now();
  const fileExtension = (type=='analysis-data'  || type=='collected-data' || type=='session-data' ) ? "json": "csv" 

  fileName = globalParameters.SAVING_PATH+"/"+globalParameters.EXPORT_FILES_PREFIX + type + (includeTimeStampInFileName? fileName+"_"+timestamp : fileName) + "_"+type+"."+fileExtension;
  
  return await downloadFile(state,type,fileName); 

}

 async function downloadFile(state,type,fileName) {

    //console.log("downloadFile function",arguments);


  const res = {};

  if(type=='analysis-data'  || type=='collected-data'  || type=='session-data' ) {

    // create file
    fs.closeSync(fs.openSync(fileName, 'w'));

    // populate json to file using bfj
    try {
      await bfj.write(fileName, state)
      const msg = "File exported to "+fileName;
      res.msg = msg;
      res.sucess = true;
    }
    catch(error) {
      const msg = "An error occured while exporting the data"+error;
      console.error(msg);
      res.msg = msg;
      res.sucess = false;
    }
    

  }
  else if(type=="gaze-data")	{
        
         const dataframe = new DataFrame(state.processedGazeData.gazeData);
         try {
          dataframe.toCSV(true, fileName);
          const msg = "File exported to "+fileName;
          res.msg = msg;
          res.sucess = true;
         }
         catch(error) {
            const msg = "An error occured while exporting the data"+error;
            console.error(msg);
            res.msg = msg;
            res.sucess = false;
         }

  }
  else if(type=="fixation-data")  {
    if(state.processedGazeData.fixationData!=null) {
       const dataframe = new DataFrame(state.processedGazeData.fixationData);
         try {
          dataframe.toCSV(true, fileName);
          const msg = "File exported to "+fileName;
          res.msg = msg;
          res.sucess = true;
         }
         catch(error) {
            const msg = "An error occured while exporting the data"+error;
            console.error(msg);
            res.msg = msg;
            res.sucess = false;
         }
    }
    else {
      const msg = "The analysis does not have fixation data. Please use the fixation filter to generate it";
      console.error(msg);
      res.msg = msg;
      res.sucess = false;
    }

  }
   
  console.log("res",res);
  return res;

}


exports.stateDownload = stateDownload;


