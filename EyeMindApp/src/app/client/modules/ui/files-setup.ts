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

/*  Files setup   */

import BpmnModeler from 'bpmn-js/lib/Modeler'
import BpmnNavigatedViewer from 'bpmn-js/lib/NavigatedViewer'

import OdmModeler from '@root/extra/object-diagram-modeler/lib/Modeler'
import OdmNavigatedViewer from '@root/extra/object-diagram-modeler/lib/NavigatedViewer'

import { takesnapshot } from './data-collection'
import {
  cancelDefault,
  readFileContent,
  errorAlert,
  filePathToFileUri,
} from '@/app/client/modules/utils/utils'

import { prepareDataCollectionContent } from './data-collection'
import { addToTabHeader, changeTab, openInTab, openWithinTab } from './tabs'
import { loadQuestions } from './questions'

import { sendClickEvent } from './click-stream'

import { showGeneralWaitingScreen, hideGeneralWaitingScreen } from './progress'

import { hideElement } from '@/app/client/modules/utils/dom'

import { addModel } from '@/app/client/modules/dataModels/generalModelsRegistry'
import { setState, getState } from '@/app/client/modules/dataModels/state'
import { setFiles, shiftFile, nFiles } from '@/app/client/modules/dataModels/filesBuffer'

// types of modeler objects supported by the tool
const modelers = {
  BpmnModeler,
  BpmnNavigatedViewer,
  OdmModeler,
  OdmNavigatedViewer,
  // We're now handling PNGs directly without modelers
}

/**
 * Title: register file upload
 *
 * Description: file upload listeners handling the drag and drop interactions to the upload-zone
 *
 * Control-flow summary: set container to document.getElementById("upload-zone") and add event listeners for dragover and drop events
 *
 * @param {void} . .
 *
 * Returns {void}
 *
 *
 * Additional notes: none
 *
 */
function registerFileUpload() {
  console.log('registerFileUpload', arguments)

  const container = document.getElementById('upload-zone')

  /// drag and drop event listeners
  container.addEventListener('dragover', handleDragOver, false)
  container.addEventListener(
    'drop',
    function (e) {
      handleDroppedFiles(e)
    },
    false,
  )
}

/**
 * Title: handle drag over
 *
 * Description: handling of drag over event
 *
 * Control-flow summary: cancel default interaction, set e.dataTransfer.dropEffect to copy
 *
 * @param {void} . .
 *
 * Returns {void}
 *
 *
 * Additional notes: none
 *
 */
function handleDragOver(e) {
  console.log('handleDragOver function', arguments)

  cancelDefault(e)

  e.dataTransfer.dropEffect = 'copy'
}

/**
 * Title: handle dropped files
 *
 * Description: handle files when they are dropped
 *
 * Control-flow summary: cancel default interaction, get list of dropped items, differ execution denpending on the state.importMode (i.e., multiple or single), call traverseItem
 *
 * @param {object} event
 *
 * Returns {void}
 *
 *
 * Additional notes: none
 *
 */
async function handleDroppedFiles(event) {
  console.log('handleDroppedFiles', arguments)

  //////////////////////////////////////////////////////
  // a hack to support the testing of a single file upload using the drag/drop feature as the testing library playwright have an issue with webkitGetAsEntry returning always null
  if (event.dataTransfer.isForTestingPurpose) {
    traverseItem(event.dataTransfer.files[0])
    return
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const state = getState()

  cancelDefault(event)

  // get dropped files
  const files = event.dataTransfer.files

  setFiles(files)

  //  differ execution denpending on the state.importMode
  if (state.importMode == 'multiple') {
    console.log('multiple files import mode')
    console.log('files', files)

    // traverse first file item
    await traverseItem(shiftFile())
  }
  // state.importMode=="single"
  else if (state.importMode == 'single') {
    console.log('single file import mode')

    // ensure that you have only one single item
    if (nFiles() == 1) {
      // traverse the file item
      await traverseItem(shiftFile())
    }
    // not a single item
    else {
      const msg = 'only a single file can be imported' // check third argument
      console.error(msg)
      errorAlert(msg)
    }
  }
}

/**
 * Title: traverse item
 *
 * Description: differ the execution depending on whether the item refers to a data-collection file or an analysis file
 *
 * Control-flow summary: get state, apply a different processing depending on whether the item refers to a data-collection file or an analysis file
 *
 * @param {object} file file
 *
 * Returns {void}
 *
 *
 * Additional notes: none
 *
 */
async function traverseItem(file) {
  console.log('traverseItem', arguments)

  const state = getState()

  // apply a different processing to the file depending on whether it is a model for data collection or a json file for the analysis
  // data-collection mode
  if (state.mode == 'data-collection') {
    // readFileContent then traverseDataCollectionFile and traverseMoreItems
    readFileContent(file, async (content) => {
      await traverseDataCollectionFile(file, content)
      await traverseMoreItems()
    })
  }
  // analysis mode
  else if (state.mode == 'analysis') {
    // traverseAnalysisFile (traverseMoreItems is in the callback in window.utils.onStateRead (or in traverseAnalysisFile() if the file already exists))
    await traverseAnalysisFile(file)
  }
}

/**
 * Title: traverse more items
 *
 * Description: traverse more item files if they exist
 *
 * @param {void} .
 *
 * Returns {void}
 *
 *
 * Additional notes: none
 *
 */
async function traverseMoreItems() {
  if (nFiles() > 0) {
    // traverse first file
    await traverseItem(shiftFile())
  } else {
    await hideGeneralWaitingScreen('all-content', 'wait')
  }
}

/**
 * Title: traverse analysis file
 *
 * Description: differ the execution depending on whether the item refers to a data-collection file or an analysis file
 *
 * Control-flow summary: get state, get file extentsion, check if the file has the expected extension and artifact for the analysis mode, if so, call window.utils.readState(file.path,state) to read the state within the file in the server side,
                      then call stateReadListener() to listen to an event incoming from the server side when the models are read
 *
 * @param {object} file file
 *
 * Returns {void}
 *
*
 * Additional notes: none
 *
 */
async function traverseAnalysisFile(file) {
  console.log('traverseAnalysisFile', arguments)

  const state = getState()

  const fileName = file.name
  const fileExtension = fileName.split('.').pop()

  let filePath = file.path

  // move to next file if the file state already exists
  if (await window.state.doesStateExist(filePath)) {
    const msg = 'analysis file already exists'
    errorAlert(msg)
    console.error(msg)
    await traverseMoreItems()
    return
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////// might need updates
  // a hack to support the testing of a single file upload using the drag/drop feature
  if (file.isForTestingPurpose) {
    filePath = file.localFilePath
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////

  // check if the file has the expected extension and artifact for the analysis mode
  if (
    state.temp.expectedExtensions.includes(fileExtension) &&
    state.temp.expectedArtifact == 'analysis'
  ) {
    await showGeneralWaitingScreen(
      'Loading ' +
        fileName +
        '... <br><br> This step can take several minutes depending on the size of the file',
      'wait',
      'all-content',
    )

    window.utils.readState(file, fileName, filePath, state)

    stateReadListener()
  } else {
    const msg = 'unkown analysis file'
    errorAlert(msg)
  }
}

/**
 * Title: traverse data collection file
 *
 * Description: differ the execution depending on whether the item refers to a data-collection file or an analysis file
 *
 * Control-flow summary: get state, get file extension, apply different processing depending on the file extension and expected artifact
 *
 * @param {object} file file
 *
 * Returns {void}
 *
 *
 * Additional notes: none
 *
 */
async function traverseDataCollectionFile(file, content) {
  console.log('traverseDataCollectionFile function', arguments)

  const state = getState()

  const fileName = file.name
  const fileExtension = fileName.split('.').pop()

  console.log('fileExtension', fileExtension)

  await showGeneralWaitingScreen('Loading ' + fileName + '...', 'wait', 'all-content')

  /// apply different processing depending on the file extension and expected artifact
  if (
    state.temp.expectedExtensions.includes(fileExtension) &&
    state.temp.expectedArtifact == 'session'
  ) {
    // traverseSessionFile
    await traverseSessionFile(file)
  } else if (
    state.temp.expectedExtensions.includes(fileExtension) &&
    state.temp.expectedArtifact == 'models'
  ) {
    // traverseModelsFile
    await traverseModelsFile(fileName, content)
  } else if (
    state.temp.expectedExtensions.includes(fileExtension) &&
    state.temp.expectedArtifact == 'questions'
  ) {
    // traverseQuestionsFile
    await traverseQuestionsFile(file)
  } else {
    const msg = 'File type or content not expected'
    errorAlert(msg)
    console.error(msg)
  }
}

/**
 * Title: traverse session file
 *
 * Description: read the session file in the server side and then call sessionReadListener() to listen to an event incoming from the server side when the session is read
 *
 * Control-flow summary: get state, get file extension, read the session file in the server side and then call sessionReadListener() to listen to an event incoming from the server side when the session is read
 *
 * @param {object} file file
 *
 * Returns {void}
 *
 *
 * Additional notes: none
 *
 */
async function traverseSessionFile(file, callback) {
  console.log('traverseSessionFile', arguments)

  const state = getState()

  let filePath = file.path
  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  // a hack to support the testing of a single file upload using the drag/drop feature
  if (file.isForTestingPurpose) {
    filePath = file.localFilePath
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////

  await window.utils.readState(file, file.name, filePath, state, callback)
  sessionReadListener()
}

/**
 * Title: traverse questions file
 *
 * Description: load the questions from the file and call prepareDataCollectionContent()
 *
 * Control-flow summary: if questions are loaded, then call prepareDataCollectionContent()

 * @param {object} file file
 *
 * Returns {void}
 *
*
 * Additional notes: prepareDataCollectionContent is called assuming that traversing the questions is the last step of the important process
 *
 */
async function traverseQuestionsFile(file) {
  console.log('traverseQuestionsFile', arguments)

  if (await loadQuestions(file) /* load questions file */) {
    // last step of file import
    const filePropertiesDefined = false
    prepareDataCollectionContent(filePropertiesDefined)
  }
}

/**
 * Title: traverse models file
 *
 * Description:
 *
 * Control-flow summary:

 * @param {string} fileName  name of the file
 * @param {string} content file content
 * @param {string} path (optional) file path within a directory
 *
 * Returns {void}
 *
*
 * Additional notes: none
 *
 */
async function traverseModelsFile(fileName, content, path = '') {
  console.log('traverseModelsFile', arguments)

  const state = getState()

  // Special handling for PNG files to ensure DOM-safe IDs
  let fileId = ''
  if (fileName.endsWith('png')) {
    // For PNG files, create a safe ID by removing invalid characters
    // Keep only alphanumeric chars, underscores, and hyphens
    fileId = `img_${fileName.replace(/[^a-zA-Z0-9_-]/g, '_')}`

    // If path is provided, use it to make the ID more specific but still safe
    if (path) {
      // Extract last directory from path as a prefix
      const pathParts = path.split('/').filter(Boolean)
      if (pathParts.length > 0) {
        const lastDir = pathParts[pathParts.length - 1].replace(/[^a-zA-Z0-9_-]/g, '_')
        fileId = lastDir + '_' + fileId
      }
    }
  } else {
    // Standard handling for non-PNG files
    fileId = fileName.replace(
      new RegExp(window.globalParameters.MODELS_ID_REGEX, 'g'),
      '',
    )
  }

  // if the file has not been already added to the processing buffer
  if (!state.models.hasOwnProperty(fileId)) {
    // create file object
    const file = { id: fileId, fileName, path, content }

    /// add a new model to the state object
    state.models[fileId] = file

    try {
      processModel(file)
    } catch (error) {
      // something wrong happened with the opening of the diagram
      removeModelFile(file)
      console.error(file.fileName + ' is invalid')
      errorAlert(file.fileName + ' is invalid')
    }
  }
  // if not give an alert and log error
  else {
    const msg = fileName + ' (id: ' + fileId + ') is already added'
    errorAlert(msg)
    console.error(msg)
  }
}

/**
 * Title: create model file info block
 *
 * Description: creating a file info block with information and setting options about the imported model file
 *
 * Control-flow summary: create fileInfo block about the imported model,  hide upload label, fill in the file info block with filename, a radio-box allowing to set the file as a main model and a checkbox allowing to set the tab refering to the model as unclosabled. Then, allow to remove the file

 * @param {object} file file with the following attributes {"id", "fileName" ,"path", "xml"}
 *
 * Returns {void}
 *
*
 * Additional notes: none
 *
 */
function createModelFileInfoBlock(file) {
  console.log('createModelFileInfoBlock', arguments)

  const state = getState()

  /// create fileInfo block about the imported model
  const fileInfo = document.createElement('div')
  fileInfo.setAttribute('id', 'fileinfo-' + file.id)
  fileInfo.setAttribute('class', 'row')

  // hide upload label
  hideElement('upload-label')

  // fill in the file info block
  const defaultChecked = state.models[file.id].isMain ? 'checked' : ''
  fileInfo.innerHTML =
    // file name
    '<div class="column file-info">' +
    file.fileName +
    '</div>' +
    // add a check (i.e., set-as-main-'+file.id+') and select it if the file refers to the main model
    '<div class="column"><input type="checkbox" class="set-as-main" id="set-as-main-' +
    file.id +
    '" name="set-as-main" modelId="' +
    file.id +
    '" ' +
    defaultChecked +
    '/>Set as main</div>' +
    // add a checkbox (i.e., unclosable-tab-'+file.id+') and check it if the file refers to the main model
    '<div class="column"><input class="unclosable-tab" id="unclosable-tab-' +
    file.id +
    '" modelId="' +
    file.id +
    '" type="checkbox" ' +
    defaultChecked +
    '/>Unclosable Tab</div>' +
    // add textfield to group models belonging to the same process
    '<div class="column">Group: <input class="group-assignement" modelId="' +
    file.id +
    '" type="text" size="2" name="group-assignement-for-file-' +
    file.id +
    '" id="group-assignement-for-file-' +
    file.id +
    '" value="1"></div>' +
    // add a button allowing to remove the file
    '<div class="column"><button class="remove-btn" id="remove-' +
    file.id +
    '"">Remove</button></div>'
  /// add a click event listener call the function to remove the file

  /// add the file info block to the file-list
  document.getElementById('file-list').appendChild(fileInfo)

  document.getElementById('remove-' + file.id).onclick = () => removeFile(file)
}

/**
 * Title: create analysis file info block
 *
 * Description: creating a file info block with information and setting options about the imported analysis file
 *
 * @param {object} file file with the following attributes {"name", "path"}
 *
 * Returns {void}
 *
 *
 * Additional notes: none
 *
 */
function createAnalysisFileInfoBlock(file) {
  console.log('createAnalysisFileInfoBlock', arguments)

  const state = getState()

  /// create fileInfo block about the imported model
  const fileInfo = document.createElement('div')
  fileInfo.setAttribute('id', 'fileinfo-' + file.path)
  fileInfo.setAttribute('class', 'row')

  // hide upload label
  hideElement('upload-label')

  // fill in the file info block
  fileInfo.innerHTML =
    // file name
    '<div class="column file-info">' + file.name + '</div>'
  // add a button allowing to remove the file
  // '<div class="column"><button class="remove-btn" id="remove-'+file.path+'"">Remove</button></div>'; -- not fully working -> the loaded models and questions should be deleted as well and not only the state in the server
  /// add a click event listener call the function to remove the file

  /// add the file info block to the file-list
  document.getElementById('file-list').appendChild(fileInfo)

  // document.getElementById("remove-"+file.path).onclick = () => removeAnalysisFile(file);
}

/**
 * Title: remove model file
 *
 * Description: procedure to remove an imported model file
 *
 * Control-flow summary: get state, remove the file attribute from state.models and remove the DOM elements related to the file

 * @param {object} file file with the following attributes {"id", "fileName" ,"path", "xml"}
 *
 * Returns {void}
 *
*
 * Additional notes: none
 *
 */
function removeModelFile(file) {
  console.log('removeModelFile', arguments)

  const state = getState()
  delete state.models[file.id]
  if (document.getElementById('fileinfo-' + file.id) != null)
    document.getElementById('fileinfo-' + file.id).remove()
  document.getElementById('model' + file.id + '-container').remove()
  document.getElementById('model' + file.id + '-explorerItem').remove()
}

/**
 * Title: remove analysis file
 *
 * Description: procedure to remove an imported analysis file
 *
 * @param {object} file file with the following attributes {"name", "path"}
 *
 * Returns {void}
 *
 *
 * Additional notes: none
 *
 */
async function removeAnalysisFile(file) {
  console.log('removeAnalysisFile', arguments)
  if (document.getElementById('fileinfo-' + file.path) != null) {
    await window.state.removeState(file.path)
    document.getElementById('fileinfo-' + file.path).remove()
  }
}

/**
 * Title: models read listener
 *
 * Description: a listener that enacts when a new state is read in the server side
 *
 * @param {void} . .
 *
 * Returns {void}
 *
 *
 * Additional notes: none
 *
 */

function stateReadListener() {
  console.log('stateReadListener', arguments)

  window.utils.onStateRead(async function (args) {
    console.log('onStateRead', arguments)

    const res = args[0]

    const file = { name: args[1], path: args[2] }

    createAnalysisFileInfoBlock(file)

    await stateRead(res)

    await traverseMoreItems()
  })
}

/**
 * Title: state read
 *
 * Description: update client state with new models read from the server side
 *
 * @param {object} res an object coming from the server side with the following attributes: success (boolean), msg (string) and data (object with the models and the questions)
 *
 * Returns {void}
 *
 *
 * Additional notes: none
 *
 */
async function stateRead(res) {
  console.log('stateRead', arguments)

  // get client state
  const state = getState()

  // if the server res.success coming from the server is true
  if (res.success) {
    //process the models within the loaded state
    for (const [key, value] of Object.entries(res.data.models)) {
      // add the new models to (client) state.models
      if (!state.models.hasOwnProperty(key)) {
        console.log('new model ', res.data.models[key])
        state.models[key] = res.data.models[key]

        // Check if the file is a PNG
        if (value.fileName && value.fileName.endsWith('png')) {
          await processPngModel(
            state.models[key].content,
            state.models[key].id,
            state.models[key].fileName,
            state.models[key].path,
          )
        } else {
          await processBpmnModel(
            state.models[key].content,
            state.models[key].id,
            state.models[key].fileName,
            state.models[key].path,
          )
        }
      }
    }

    //process the questions within the loaded state
    if (state.questions == null) {
      state.questions = []
    }

    res.data.questions.forEach(function (question) {
      // add the new questions to (client) state.quetions
      if (
        state.questions.find((existingQuestion) => existingQuestion.id == question.id) ==
        null
      ) {
        console.log('new question ', question)
        state.questions.push(question)
      } else {
        console.log('existng question', question)
      }
    })
  } else {
    console.error(res.msg)
    errorAlert(res.msg)
  }

  await hideGeneralWaitingScreen('all-content', 'wait')
}

/**
 * Title: session read listener
 *
 * Description: a listener that enacts when a session is read in the server side
 *
 * Control-flow summary: call sessionRead()

 * @param {void} . .
 *
 * Returns {void}
 *
*
 * Additional notes: none
 *
 */

function sessionReadListener() {
  console.log('sessionReadListener', arguments)

  window.utils.onSessionRead(async function (args) {
    console.log('onSessionRead', arguments)
    const res = args[0]
    await sessionRead(res)
  })
}

/**
 * Title: session read
 *
 * Description: update client state with the state read in the server side (i.e., refering to the loaded session)
 *
 * Control-flow summary: update client state with the state read in the server side (i.e., refering to the loaded session) and call the methods nessary to prepare the data collection view (i.e., processModel(),  prepareDataCollectionContent() )

 * @param {object} res an object coming from the server side with the following attributes: success (boolean), msg (string) and data (state)
 *
 * Returns {void}
 *
*
 * Additional notes: none
 *
 */
async function sessionRead(res) {
  console.log('sessionRead', arguments)

  const success = res.success
  const msg = res.msg
  const data = res.data

  if (success) {
    setState(data)

    const state = getState()
    console.log('state', state)

    //process the open the models within the loaded state
    for (const [key, value] of Object.entries(state.models)) {
      // Check if it's a PNG file
      if (value && value.fileName && value.fileName.endsWith('png')) {
        await processPngModel(
          state.models[key].content,
          state.models[key].id,
          state.models[key].fileName,
          state.models[key].path,
        )
      } else {
        await processBpmnModel(
          state.models[key].content,
          state.models[key].id,
          state.models[key].fileName,
          state.models[key].path,
        )
      }
    }

    // last step of file import
    const filePropertiesDefined = true
    prepareDataCollectionContent(filePropertiesDefined)

    //infoAlert(msg);
  } else {
    console.error(res.msg)
    errorAlert(msg)
  }
}

async function processModel(file) {
  if (file.fileName.endsWith('bpmn')) {
    // process model
    await processBpmnModel(file.content, file.id, file.fileName, file.path)
    // create file info menu
    createModelFileInfoBlock(file)
  } else if (file.fileName.endsWith('svg')) {
    // process model
    await processSvgModel(file.content, file.id, file.fileName, file.path)
    // create file info menu
    createModelFileInfoBlock(file)
  } else if (file.fileName.endsWith('png')) {
    // Process PNG model
    await processPngModel(file.content, file.id, file.fileName, file.path)
    // Create file info menu
    createModelFileInfoBlock(file)
  } else {
    console.error('Unknown file format:', file.fileName)
  }
}

/**
 * Title: process model
 *
 * Description: prcessing a model file
 *
 * Control-flow summary:  get state, construct/update the directory explorer, reate tab container, create model,  differ the execution depending on the state.mode (data-collection or analysis), if state.mode=="data-collection" then mark the main model, otherwise if state.mode=="analysis" then add the attributes needed to show the heatmaps
 *
 * @param {string} xml  xml refering to the model content
 * @param {string} id  file id
 * @param {string} fileName  file name
 * @param {string} filePath  file path
 *
 * Returns {void}
 *
 *
 * Additional notes: none
 *
 */
async function processBpmnModel(content, id, fileName, filePath) {
  console.log('processBpmnModel', arguments)

  // get state
  const state = getState()

  /// construct/update the directory explorer
  constructDirectoryExplorer(filePath, fileName, id)

  // create tab container
  createTabContainer(id, fileName)

  // create model
  console.log('creating model')
  const modeler = await createModel(fileName, id, content)
  console.log('model created')

  // differ the execution depending on the state.mode
  if (state.mode == 'data-collection') {
    // state.models[id].isMain if the model is the main model of the process (cf. isMain())
    state.models[id].isMain = isMain(modeler)
  }
  if (state.mode == 'analysis') {
    // add attributes needed to show the heatmaps
    const generalModelRegistry = {}
    generalModelRegistry.elementRegistry = modeler.get('elementRegistry')
    if (modeler.language == 'Bpmn')
      generalModelRegistry.commandStack = modeler.get('commandStack') /// odm do not have a commandStack
    generalModelRegistry.overlays = modeler.get('overlays')
    generalModelRegistry.language = modeler.language
    // add model to the generalModelsRegistry
    addModel(id, generalModelRegistry)
  }

  console.log(fileName, 'is valid')
}

async function processSvgModel(xml, id, fileName, filePath) {
  console.log('processSvgModel', arguments)

  // get state
  const state = getState()

  /// construct/update the directory explorer
  constructDirectoryExplorer(filePath, fileName, id)

  // create tab container
  createTabContainer(id, fileName)

  // create model
  console.log('creating model')
  // var modeler = await createModel(fileName, id, content)
  console.log('model created')

  // differ the execution depending on the state.mode
  // if (state.mode == 'data-collection') {
  //   // state.models[id].isMain if the model is the main model of the process (cf. isMain())
  //   state.models[id].isMain = isMain(modeler)
  // }
  if (state.mode == 'analysis') {
    // add attributes needed to show the heatmaps
    const generalModelRegistry = {}
    generalModelRegistry.elementRegistry = modeler.get('elementRegistry')
    if (modeler.language == 'Bpmn')
      generalModelRegistry.commandStack = modeler.get('commandStack') /// odm do not have a commandStack
    generalModelRegistry.overlays = modeler.get('overlays')
    generalModelRegistry.language = modeler.language
    // add model to the generalModelsRegistry
    addModel(id, generalModelRegistry)
  }

  console.log(fileName, 'is valid')
}

async function processPngModel(content, id, fileName, filePath) {
  console.log('processPngModel', arguments)

  // get state
  const state = getState()

  /// construct/update the directory explorer
  constructDirectoryExplorer(filePath, fileName, id)

  // create tab container
  createTabContainer(id, fileName)

  // Get the model container
  const containerSelector = `#model${id}-content`
  const container = document.querySelector(containerSelector)

  if (container == null) {
    console.error('Container not found:', containerSelector)
    return null
  }

  // Create the PNG viewer container
  const pngViewerContainer = document.createElement('div')
  pngViewerContainer.setAttribute('id', `model${id}-content-model${id}-object`)
  pngViewerContainer.setAttribute('hierarchy', 'main-model')
  pngViewerContainer.setAttribute('class', 'canvas main-model png-viewer')
  pngViewerContainer.setAttribute('FileName', fileName)

  // Add the PNG image
  const img = document.createElement('img')
  img.className = 'image-viewer-content'
  img.style.maxWidth = '100%'
  img.style.maxHeight = '100%'
  img.style.objectFit = 'contain'

  // Add error event listener to debug loading issues
  img.onerror = (error) => {
    console.error('Image load error:', error)
    console.log('Failed to load image with src:', img.src)
    handleInvalidImage()
  }

  // Add load event listener to confirm successful loading
  img.onload = () => {
    console.log('Image loaded successfully:', img.src)
    img.style.display = 'block' // Ensure the image is visible
  }

  // First try to use file URI if we have filePath information
  let imageSrcSet = false

  if (filePath) {
    try {
      // Use the utility function to create a file:// URI
      const fileUri = filePathToFileUri(filePath, fileName)
      img.src = fileUri
      imageSrcSet = true
      console.log('Using file URI:', fileUri)

      // If we're in Electron environment, we can also try to read the file directly
      if (window.hasOwnProperty('electron') && !img.complete) {
        console.log(
          'In Electron environment, trying direct file read for:',
          filePath + '/' + fileName,
        )
        window.electron.readPngFile(filePath + '/' + fileName, (base64Data) => {
          if (base64Data) {
            img.src = 'data:image/png;base64,' + base64Data
            imageSrcSet = true
            console.log('Using electron direct file read')
          } else {
            console.error('Electron file read failed')
          }
        })
      }
    } catch (e) {
      console.error('Error creating file URI:', e)
      // We'll fall back to other methods
    }
  }

  // If we couldn't set using file URI, try other methods
  if (!imageSrcSet) {
    if (typeof content === 'string') {
      // If content is already a data URL (starts with data:image)
      if (content.startsWith('data:image')) {
        img.src = content
        console.log('Using existing data URL')
      } else {
        // Try to convert content to a data URL
        try {
          img.src = 'data:image/png;base64,' + btoa(content)
          console.log('Using base64 encoded content')
        } catch (e) {
          console.error('Error creating data URL:', e)

          // Try a more direct approach as fallback
          if (filePath) {
            // Try a relative path approach without file:// protocol
            // This might work in Electron environments
            img.src = filePath + '/' + fileName
            console.log('Trying relative path as fallback:', img.src)
          } else {
            handleInvalidImage()
          }
        }
      }
    } else if (content instanceof Blob || content instanceof File) {
      // If we have a Blob or File object, create an object URL
      try {
        img.src = URL.createObjectURL(content)
        console.log('Using object URL for Blob/File')
      } catch (e) {
        console.error('Error creating object URL:', e)
        handleInvalidImage()
      }
    } else {
      console.error('Image content is not valid:', typeof content)
      handleInvalidImage()
    }
  }

  // Helper function to handle invalid image content
  function handleInvalidImage() {
    img.alt = 'Error loading image'
    img.style.display = 'none'

    const errorMsg = document.createElement('div')
    errorMsg.className = 'png-load-error'
    errorMsg.textContent = 'Error loading image'
    errorMsg.style.color = 'red'
    errorMsg.style.padding = '20px'
    errorMsg.style.fontSize = '16px'
    errorMsg.style.textAlign = 'center'
    errorMsg.style.border = '1px solid #ccc'
    errorMsg.style.borderRadius = '5px'
    errorMsg.style.margin = '20px'
    errorMsg.style.backgroundColor = '#f8f8f8'
    pngViewerContainer.appendChild(errorMsg)

    console.warn('Image display failed - error message shown')
  }

  // Add the image to the container
  pngViewerContainer.appendChild(img)

  // Add the PNG viewer to the model container
  container.appendChild(pngViewerContainer)

  // Setup interactions like zooming and panning
  setupPngInteractions(container)

  // Return an object that matches the expected interface
  const pngViewer = {
    id,
    language: 'Png',
    container: containerSelector,
    // Minimal element registry for compatibility
    get: (name) => {
      if (name === 'elementRegistry') return { getAll: () => [] }
      if (name === 'overlays') return { add: () => {}, remove: () => {}, get: () => [] }
      return {}
    },
  }

  // differ the execution depending on the state.mode
  if (state.mode == 'data-collection') {
    // state.models[id].isMain if the model is the main model of the process (cf. isMain())
    state.models[id].isMain = isMain(pngViewer)
  }

  if (state.mode == 'analysis') {
    // add attributes needed to show the heatmaps
    const generalModelRegistry = {
      ...pngViewer,
      fileName,
      filePath,
    }
    // add model to the generalModelsRegistry
    addModel(id, generalModelRegistry)
  }

  console.log(fileName, 'is valid')
  return pngViewer
}

/**
 * Setup zoom and pan interactions for PNG images
 * @param {HTMLElement} container - The container element
 */
function setupPngInteractions(container) {
  // Check if container is valid
  if (!container) {
    console.error('Container is null or undefined')
    return
  }

  // Find the image element in the container
  const img = container.querySelector('.image-viewer-content')
  if (!img) {
    console.error('Image element not found in container')
    return
  }

  // Variables for zoom and pan
  let zoom = 1
  let offsetX = 0
  let offsetY = 0
  let isDragging = false
  let lastX = 0
  let lastY = 0

  // Reset transform when double-clicked
  img.addEventListener('dblclick', () => {
    zoom = 1
    offsetX = 0
    offsetY = 0
    updateTransform()
  })

  // Zoom with mouse wheel
  container.addEventListener('wheel', (e) => {
    e.preventDefault()

    // Get mouse position relative to image
    const rect = img.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    // Calculate delta for smoother zoom
    const delta = -e.deltaY * 0.01

    // Calculate new zoom level with limits
    const oldZoom = zoom
    zoom = Math.max(0.1, Math.min(3, zoom + delta))

    // Adjust offset to zoom toward mouse position
    if (zoom !== oldZoom) {
      const scaleChange = zoom / oldZoom
      offsetX = (offsetX - mouseX / oldZoom) * scaleChange + mouseX / oldZoom
      offsetY = (offsetY - mouseY / oldZoom) * scaleChange + mouseY / oldZoom
    }

    updateTransform()
  })

  // Pan with mouse drag
  img.addEventListener('mousedown', (e) => {
    isDragging = true
    lastX = e.clientX
    lastY = e.clientY
    img.style.cursor = 'grabbing'
  })

  container.addEventListener('mousemove', (e) => {
    if (!isDragging) return

    const dx = e.clientX - lastX
    const dy = e.clientY - lastY

    lastX = e.clientX
    lastY = e.clientY

    offsetX += dx / zoom
    offsetY += dy / zoom

    updateTransform()
  })

  container.addEventListener('mouseup', () => {
    isDragging = false
    img.style.cursor = 'grab'
  })

  container.addEventListener('mouseleave', () => {
    isDragging = false
    img.style.cursor = 'grab'
  })

  function updateTransform() {
    img.style.transform = `scale(${zoom}) translate(${offsetX}px, ${offsetY}px)`
  }

  // Initialize transform
  updateTransform()
}

/**
 * Title: is main
 *
 * Description: is the model a main model
 *
 * Control-flow summary: get the process id and if modeler.language=="Bpmn" and processId.toLowerCase()=="main", then it is a main model
 *
 * @param {object} modeler  a modeler object
 *
 * Returns {boolean} is the model a main model
 *
 *
 * Additional notes: none
 *
 */
function isMain(modeler) {
  if (modeler.language === 'Png') {
    return true
  }

  console.log('isMain', arguments)
  // get the process id
  const processId = modeler.get('canvas').getRootElement().id
  console.log('processId', processId)

  /// we consider only BPMN files for now and we assume that the main process id should be "main"
  if (modeler.language == 'Bpmn' && processId.toLowerCase() == 'main') return true

  return false
}

/**
 * Title: construct directory explorer
 *
 * Description: construct the directory explorer
 *
 * Control-flow summary: iterate over the folders and files within the path and populate the directory explorer
 *
 * @param {string} filePath  the path of the file
 * @param {string} fileName  the name of the file
 * @param {string} id  the id of the file
 *
 * Returns {void}
 *
 *
 * Additional notes: none
 *
 */
function constructDirectoryExplorer(filePath, fileName, id) {
  console.log('constructDirectoryExplorer', arguments)

  // get state
  const state = getState()

  /// remove last "/" from the filePath
  filePath = filePath.slice(0, -1)

  /// create/extend the explorer hierarchy
  const dirs = filePath.split('/')
  const path = []

  // iterate over the folders within the path
  for (let i = 0; i < dirs.length; i++) {
    // for each folder wthin the path

    // push it to path array
    path.push(dirs[i])

    // if the sub-path (actual path array) does not exist yet
    if (document.getElementById('explorer-group-' + path.join('/')) == null) {
      if (dirs[i] != '') {
        // create li and underlying ul with new the sub-path
        const li = document.createElement('li')
        li.setAttribute('class', 'folder gaze-element')
        li.setAttribute('data-element-id', 'file-explorer-folder_' + dirs[i])

        li.innerHTML = dirs[i]
        const ul = document.createElement('ul')
        ul.setAttribute('id', 'explorer-group-' + path.join('/'))
        li.appendChild(ul)

        /// if the sub-path has only one folder append it to explorer-groups otherwise append it to its parent
        if (path.length == 1) {
          document.getElementById('explorer-groups').appendChild(li)
        } else {
          const parent = path.slice(0, -1)
          document.getElementById('explorer-group-' + parent.join('/')).appendChild(li)
        }
      }
    }
  }

  // populate the explorer
  const explorerItem = document.createElement('li')
  explorerItem.setAttribute('id', 'model' + id + '-explorerItem')
  explorerItem.setAttribute('class', 'file gaze-element')
  explorerItem.setAttribute('data-element-id', 'file-explorer-file_' + fileName)
  if (state.mode == 'data-collection') explorerItem.style.display = 'none'
  explorerItem.setAttribute('fileName', fileName)
  explorerItem.innerHTML = fileName
  explorerItem.onclick = function (e) {
    sendClickEvent(Date.now(), explorerItem.getAttribute('data-element-id'))
    addToTabHeader(id)
    changeTab(id, false, true)
  }

  // if filePath!="" then append the explorerItem to the corresponding "explorer-group-"+filePath ul otherwise append directly to explorer-groups (root)
  if (filePath != '') {
    document.getElementById('explorer-group-' + filePath).appendChild(explorerItem)
  } else {
    document.getElementById('explorer-groups').appendChild(explorerItem)
  }
}

/**
 * Title: create tab container
 *
 * Description: create a container where the tab containing the model will be located
 *
 * Control-flow summary: create tab container, create tab content holder, create tab content and append to tab container holder
 *
 * @param {string} id  the id of the file
 * @param {string} filename  the name of the file
 *
 * Returns {void}
 *
 *
 * Additional notes: none
 *
 */
function createTabContainer(id, fileName) {
  console.log('createTabContainer', arguments)

  // create tab container
  const tabContainer = document.createElement('div')
  tabContainer.setAttribute('id', 'model' + id + '-container')
  tabContainer.setAttribute('class', 'tab-container')
  document.getElementById('tabs-containers').appendChild(tabContainer)

  // create tab content holder
  const tabContentHolder = document.createElement('div')
  tabContentHolder.setAttribute('id', 'model' + id + '-content-holder')
  tabContentHolder.setAttribute('class', 'model-content-holder')
  tabContainer.appendChild(tabContentHolder)

  // create tab content and append to tab container holder
  const tabContent = document.createElement('div')
  tabContent.setAttribute('id', 'model' + id + '-content')
  tabContent.setAttribute('fileName', fileName)
  tabContent.setAttribute('class', 'model-content')
  tabContentHolder.appendChild(tabContent)
}

/**
 * Title: create model
 *
 * Description: create a model
 *
 * Control-flow summary: create a model container and append it to its parent container, create a model in the model container, add an event listener on canvas.viewbox.changed to take snapshots when the canvas viewbox is changed, remove BPMN.io logo, to avoid unwanted interactions during the data collection, make hierarchy links between the loaded BPMN models
 *
 * @param {string} filename  the name of the file
 * @param {string} id  the id of the file
 * @param {string} content  xml refering the content of the model
 * @param {string} currentTabContainerId  the container of the model
 *
 * Returns {object} modeler modeler object
 *
 *
 * Additional notes: none
 *
 */
async function createModel(fileName, id, content, currentTabContainerId) {
  console.log('createModel function', arguments)

  const state = getState()

  // depending of the argument, either set as a process, or a nested sub-process
  currentTabContainerId = currentTabContainerId || 'model' + id + '-content'

  // create a model container
  const modelContainer = document.createElement('div')
  modelContainer.setAttribute('id', currentTabContainerId + '-model' + id + '-object')
  modelContainer.setAttribute('hierarchy', 'main-model')
  modelContainer.setAttribute('class', 'canvas main-model')
  modelContainer.setAttribute('FileName', fileName)

  // append the model container to its parent (i.e., dom element with id=currentTabContainerId)
  document.getElementById(currentTabContainerId).append(modelContainer)
  /// choice based on type of file (bpmn or odm) and whether it is for data-collection (NavigatedViewer) or for anaylsis (Modeler) (i.e., Modeler is used to allow coloring the activities, which is required for the heatmaps)
  let language = null
  // support for bpmn and odm file
  if (fileName.endsWith('bpmn')) language = 'Bpmn'
  else if (fileName.endsWith('odm')) language = 'Odm'
  else if (fileName.endsWith('svg')) language = 'Svg'
  else if (fileName.endsWith('png')) language = 'Png'
  else throw 'Unknown file format'

  if (fileName.endsWith('bpmn') || fileName.endsWith('odm')) {
    return createActualModel(id, content, currentTabContainerId, state, language)
  }

  return createImageModel(id, content, currentTabContainerId, state, language)
}

async function createActualModel(id, content, currentTabContainerId, state, language) {
  let view = null
  if (state.mode == 'data-collection') view = 'NavigatedViewer'
  else if (state.mode == 'analysis') view = 'Modeler'
  else throw 'Unknown state'

  // create modeler, set language and import xml file
  const modeler = await setUpModelerObject(
    language,
    view,
    currentTabContainerId,
    id,
    content,
  )

  // listen to changes in the canvas.viewbox i.e., scrolling, zooming and take a snapshot
  modeler.on('canvas.viewbox.changed', (context) => {
    // console.log("canvas.viewbox.changed on tab ", state.activeTab);
    // take snapshot on canvas.viewbox.changed
    takesnapshot(Date.now(), document.body.innerHTML, window.screenX, window.screenY)
  })

  /// remove BPMN.io logo, to avoid unwanted interactions during the data collection
  removeBPMNioLogo(currentTabContainerId + '-model' + id + '-object')

  /// make hierarchy links between the loaded BPMN models
  const processId = modeler.get('canvas').getRootElement().id
  linkSubProcesses(modeler, id, processId, currentTabContainerId)

  return modeler
}

async function createImageModel(id, content, currentTabContainerId, state, language) {
  // For PNG files, we now handle the rendering directly in processPngModel
  if (language === 'Png') {
    // Return a simple placeholder object for compatibility
    return {
      id,
      content,
      language,
      container: '#' + currentTabContainerId + '-model' + id + '-object',
    }
  }

  // Handle SVG or other image formats (existing code)
  return {
    id,
    content,
    language,
    view: state.mode === 'data-collection' ? 'NavigatedViewer' : 'Modeler',
    currentTabContainerId,
    container: '#' + currentTabContainerId + '-model' + id + '-object',
  }
}

/**
 * Title: setup modeler object
 *
 * Description: create the modeler object
 *
 * Control-flow: create the modeler object, import the XML file and put the model to its specific container
 *
 * @param {string} language e.g., Bpmn, ODM
 * @param {string} view  NavigatedViewer or Modeler
 * @param {string} currentTabContainerId  the container of the model
 * @param {string} id  the id of the file
 * @param {string} content  xml refering the content of the model

 *
 * Returns {object} modeler modeler object
 *
*
 * Additional notes: none
 *
 */
async function setUpModelerObject(language, view, currentTabContainerId, id, content) {
  const modeler = new modelers[language + view]({
    container: '#' + currentTabContainerId + '-model' + id + '-object',
  })
  modeler.language = language

  if (language === 'Png') {
    modeler.importImage(content)
  } else {
    await modeler.importXML(content)
  }
  return modeler
}

/**
 * Title: remove bpmn io logo
 *
 * Description: remove the bpmn io logo in the model
 *
 * Control-flow summary: remove the element with classname .bjs-powered-by
 *
 * @param {string} container container id
 *
 * Returns {void}
 *
 *
 * Additional notes: none
 *
 */
function removeBPMNioLogo(container) {
  console.log('removeBPMNioLogo function', arguments)

  document.getElementById(container).querySelector('.bjs-powered-by').remove()
}

/**
 * Title: link subprocesses
 *
 * Description: link subprocesses to provide support for sub-process interactions
 *
 * Control-flow summary: iterate the elements of mainModel, then for each element, if the element is a collasped sub-process, get information about the sub-process, locate the svg element refering to a collasped subprocess, add event listeners to etablish the linking of sub-processes and allow the navigation between them (depending on the linkingSubProcessesMode)
 *
 * @param {object} mainModel  a modeler object refering to the main model
 * @param {string} mainModelId  the id of the main model
 * @param {string} mainModelprocessId  the id of the process in the main model
 * @param {string} currentTabContainerId  the id of the current tab container
 *
 * Returns {void}
 *
 *
 * Additional notes: none
 *
 */
function linkSubProcesses(
  mainModel,
  mainModelId,
  mainModelprocessId,
  currentTabContainerId,
) {
  console.log('linkSubProcesses', arguments)

  // get state
  const state = getState()

  const mainModelElements = mainModel.get('elementRegistry')._elements

  /// iterate the elements of mainModel
  Object.keys(mainModelElements).forEach((key) => {
    //console.log("loop visit",mainModelElements[key] );

    // if the element is a collasped sub-process
    if (
      mainModelElements[key].element.type == 'bpmn:SubProcess' &&
      mainModelElements[key].element.collapsed == true
    ) {
      // console.log("is a collapsed subprocess", mainModelElements[key]);

      // get information about the sub-process
      const subProcessFileName = mainModelElements[key].element.id
      const subProcessId = subProcessFileName.replace(
        new RegExp(window.globalParameters.MODELS_ID_REGEX, 'g'),
        '',
      )
      const subProcessActivityLabelInMainModel =
        mainModelElements[key].element.businessObject.name

      // locate the svg element refering to a collasped subprocess
      const subProcessActivitySVGObjectInMainModel = document
        .getElementById(currentTabContainerId)
        .querySelector('[data-element-id="' + subProcessFileName + '"]')

      if (state.linkingSubProcessesMode == 'newTab') {
        subProcessActivitySVGObjectInMainModel.addEventListener('click', function (e) {
          // prevent the implemented bpmn-io interaction assosciated with sub-processes
          cancelDefault(e)
          // send click event
          sendClickEvent(
            Date.now(),
            subProcessActivitySVGObjectInMainModel.getAttribute('data-element-id'),
          )
          // open the sub-process in tab if isFileLoaded
          if (isFileLoaded(subProcessFileName, subProcessId)) {
            openInTab(subProcessId)
          }
        })
        // change the cursor
        subProcessActivitySVGObjectInMainModel.style.cursor = 'pointer'
      } else if (state.linkingSubProcessesMode == 'withinTab') {
        //subProcessActivitySVGObjectInMainModel.classList.add("click-record");

        subProcessActivitySVGObjectInMainModel.addEventListener('click', function (e) {
          // prevent the implemented bpmn-io interaction assosciated with sub-processes
          cancelDefault(e)
          // send click event
          sendClickEvent(
            Date.now(),
            subProcessActivitySVGObjectInMainModel.getAttribute('data-element-id'),
          )

          // open the sub-process within tab if isFileLoaded
          if (isFileLoaded(subProcessFileName, subProcessId)) {
            openWithinTab(
              mainModelId,
              mainModelprocessId,
              subProcessId,
              subProcessActivityLabelInMainModel,
            )
          }
        })
        // change the cursor
        subProcessActivitySVGObjectInMainModel.style.cursor = 'pointer'
      } else {
        subProcessActivitySVGObjectInMainModel.addEventListener('click', function (e) {
          // prevent the implemented bpmn-io interaction assosciated with sub-processes
          cancelDefault(e)
          // do nothing more!
        })
      }
    }
  })
}

/**
 * Title: is file loaded
 *
 * Description: check if the file was already loaded
 *
 * Control-flow summary: if state.models.hasOwnProperty(fileId) is true, then the file is already loaded
 *
 * @param {string} fileName  the name of the file
 * @param {string} fileId  the id of the file
 *
 * Returns {boolean} whether the file was already loaded
 *
 *
 * Additional notes: none
 *
 */
function isFileLoaded(fileName, fileId) {
  console.log('isFileLoaded', arguments)

  const state = getState()

  /// return null if subProcessFileName was not loaded
  if (!state.models.hasOwnProperty(fileId)) {
    console.log(fileName, '(id: ' + fileId + ') was not loaded')
    return false
  }

  return true
}

/**
 * Title: assinging models to groups
 *
 * Description: assign models to groups
 *
 *
 * @param {void} .  .
 *
 * Returns {void}
 *
 *
 * Additional notes: none
 *
 */
function assignModelsToGroups() {
  console.log('assignModelsToGroups', arguments)

  const state = getState()

  const groupAssignementList = document.getElementsByClassName('group-assignement')

  for (let i = 0; i < groupAssignementList.length; i++) {
    state.models[groupAssignementList[i].getAttribute('modelId')].groupId =
      groupAssignementList[i].value
  }
}

/**
 * Title: check if the models are correctly grouped
 *
 * Description: check if the imported models are correctly grouped
 *
 *
 * @param {void} .  .
 *
 * Returns {object} res object with boolean and string, refering to whether the models are correctly grouped and if no, the string contains the error message
 *
 *
 * Additional notes: none
 *
 */
function areModelsCorrectlyGrouped() {
  console.log('areModelsCorrectlyGrouped', arguments)

  const res = { msg: '', success: true }

  // check that all models have a group id
  if (!areAllModelsAssignedToGroupId()) {
    res.msg = 'Some models are missing a group Id.'
    res.success = false
    return res
  }

  // check that each group has only one main model
  if (!doEachGroupHasOnlyOneMainModel()) {
    res.msg += 'Each group should have one main model.'
    res.success = false
    return res
  }

  return res
}

/**
 * Title: are all models assigned to a group id
 *
 * Description: check that all models have a group id
 *
 *
 * @param {void} .  .
 *
 * Returns {boolean} whether or not all models have a group id
 *
 *
 * Additional notes: none
 *
 */
function areAllModelsAssignedToGroupId() {
  console.log('areAllModelsAssignedToGroupId', arguments)

  const groupAssignementList = document.getElementsByClassName('group-assignement')

  for (let i = 0; i < groupAssignementList.length; i++) {
    if (groupAssignementList[i].value == '') {
      return false
    }
  }

  return true
}

/**
 * Title: check that each group has only one main model
 *
 * Description: check that each group has only one main model
 *
 *
 * @param {void} .  .
 *
 * Returns {boolean} whether or not check that each group has only one main model
 *
 *
 * Additional notes: none
 *
 */
function doEachGroupHasOnlyOneMainModel() {
  console.log('doEachGroupHasOnlyOneMainModel', arguments)

  // will contain group ids and number of main models
  const groupsAndMains = {}

  const groupAssignementList = document.getElementsByClassName('group-assignement')

  for (let i = 0; i < groupAssignementList.length; i++) {
    // model id
    const modelId = groupAssignementList[i].getAttribute('modelId')

    // if groupId is not already in groupsAndMains then add it and set the number of main models to 0
    const groupId = groupAssignementList[i].value
    if (!groupsAndMains.hasOwnProperty(groupId)) {
      groupsAndMains[groupId] = 0
    }

    // is model checked as main
    const idModelCheckedAsMain = document.getElementById('set-as-main-' + modelId).checked

    // if model is checked as main then increment the count of main models in groupsAndMains
    if (idModelCheckedAsMain) {
      groupsAndMains[groupId] = groupsAndMains[groupId] + 1
    }
  }

  /// iterate over groupsAndMains values (i.e., nMainModels), if a value is larger is different then 1 return false
  for (const nMainModels of Object.values(groupsAndMains)) {
    if (nMainModels != 1) {
      return false
    }
  }

  // all is good return true
  return true
}

/**
 * Title: traverse item tree
 *
 * Description: iterate over items and differ the execution depending on whether the item is a file or a directory.
 *
 * Control-flow summary: iterate over items and differ the execution depending on whether the item is a file or a directory. If the item is a file then call traverseItem() if the item is a directory then recurseively call traverseItemTree() for the directory
 *
 * @param {object} item item
 * @param {string} path item path
 *
 * Returns {void}
 *
 *
 * Additional notes: the function calls either traverseItem or traverseItemTree
 *
 */
/*async function traverseItemTree(item, path) {

  console.log("traverseItemTree", arguments);

  path = path || "";

  /// apply a different processing depending on whether the item is a file or a directory
  // item.isFile
  if (item.isFile) {
    console.log("item.isFile", item);
    // get file
    item.file(async function(file) {
      await traverseItem(file, path);
    });
  // item.isDirectory
  } else if (item.isDirectory) {
    console.log("item.isDirectory", item);
/*    // get folder contents
    var dirReader = item.createReader();
    dirReader.readEntries(async function(entries) {
      // iterate through the directory entries
      for (var i=0; i<entries.length; i++) {
        // recursively call traverseItemTree()
        await traverseItemTree(entries[i], path + item.name + "/");
      }

    });

    errorAlert("Folders are not supported")
  }
}*/

export {
  registerFileUpload,
  createModel,
  assignModelsToGroups,
  areModelsCorrectlyGrouped,
}
