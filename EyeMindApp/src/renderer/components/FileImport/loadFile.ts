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
import { CONST } from '@/CONST'
import { FileImportConfig } from '@/renderer/components/FileImport/types'
import OdmModeler from '@/renderer/extra/object-diagram-modeler/lib/Modeler'
import OdmNavigatedViewer from '@/renderer/extra/object-diagram-modeler/lib/NavigatedViewer'
import { Model, getModelIdFromFileName } from '@/renderer/model/models'
import {
  cancelDefault,
  errorAlert,
  readFileContent,
} from '@/renderer/modules/utils/utils'
import { addModel } from '@/renderer/state/generalModelsRegistry'
import { useGlobalStore } from '@/renderer/state/global'
import { sendClickEvent } from '../../modules/ui/click-stream'
import { takesnapshot } from '../../modules/ui/data-collection'
import { prepareDataCollectionContent } from '../../modules/ui/data-collection'
import {
  hideGeneralWaitingScreen,
  showGeneralWaitingScreen,
} from '../../modules/ui/progress'
import { loadQuestions } from '../../modules/ui/questions'
import {
  addToTabHeader,
  changeTab,
  openInTab,
  openWithinTab,
} from '../../modules/ui/tabs'
import { useSessionStore } from '../../state/session'

declare global {
  interface File {
    id: string
    isForTestingPurpose: boolean
    localFilePath: string
  }
}

// types of modeler objects supported by the tool
const modelers = {
  BpmnModeler: BpmnModeler,
  BpmnNavigatedViewer: BpmnNavigatedViewer,
  OdmModeler: OdmModeler,
  OdmNavigatedViewer: OdmNavigatedViewer,
}

export async function loadFiles(files: File[], config: FileImportConfig) {
  for (const file of files) {
    // apply a different processing to the file depending on whether it is a model for data collection or a json file for the analysis
    // data-collection mode
    if (config.mode == 'data-collection') {
      return await new Promise<void>((resolve, reject) => {
        try {
          // readFileContent then traverseDataCollectionFile and traverseMoreItems
          readFileContent(file, async (content: string) => {
            await loadDataCollectionFile(file, content, config)
            resolve()
          })
        } catch (error) {
          reject(error)
        }
      })
    }

    // traverseAnalysisFile (traverseMoreItems is in the callback in window.utils.onStateRead (or in traverseAnalysisFile() if the file already exists))
    return await loadAnalysisFile(file, config)
  }
}

async function loadAnalysisFile(file: File, config: FileImportConfig) {
  const { setState: _setState, ...state } = useGlobalStore.getState()

  const fileName = file.name
  const fileExtension = fileName.split('.').pop() ?? ''

  let filePath = file.path

  // move to next file if the file state already exists
  if (await window.state.doesStateExist(filePath)) {
    const msg = 'analysis file already exists'
    errorAlert(msg)
    console.error(msg)
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
    config.expectedExtensions?.includes(fileExtension) &&
    config.expectedArtifact == 'analysis'
  ) {
    await showGeneralWaitingScreen(
      'Loading ' +
        fileName +
        '... <br><br> This step can take several minutes depending on the size of the file',
    )

    window.utils.readState(file, fileName, filePath, state, config)

    await stateReadListener()
    return
  }

  const msg = 'unkown analysis file'
  errorAlert(msg)
}

export function getFileExtension(file: File) {
  return file.name.split('.').pop() ?? ''
}

export function isSessionFile(file: File, config: FileImportConfig) {
  const fileExtension = getFileExtension(file)

  return (
    config.expectedExtensions?.includes(fileExtension) &&
    config.expectedArtifact == 'session'
  )
}

export function isModelsFile(file: File, config: FileImportConfig) {
  const fileExtension = getFileExtension(file)

  return (
    config.expectedExtensions?.includes(fileExtension) &&
    config.expectedArtifact == 'models'
  )
}

export function isQuestionsFile(file: File, config: FileImportConfig) {
  const fileExtension = getFileExtension(file)

  return (
    config.expectedExtensions?.includes(fileExtension) &&
    config.expectedArtifact == 'questions'
  )
}
async function loadDataCollectionFile(
  file: File,
  content: string,
  config: FileImportConfig,
) {
  if (isSessionFile(file, config)) {
    await loadSessionFile(file, config)
    return
  }

  if (isModelsFile(file, config)) {
    loadModelFile(file, content)
    return
  }

  if (isQuestionsFile(file, config)) {
    if (await loadQuestions(file)) {
      const filePropertiesDefined = false
      prepareDataCollectionContent(filePropertiesDefined)
    }
    return
  }

  const msg = 'File type or content not expected'
  errorAlert(msg)
  console.error(msg)
}

async function loadSessionFile(file: File, config: FileImportConfig) {
  const { setState: _setState, ...state } = useGlobalStore.getState()

  let filePath = file.path

  // a hack to support the testing of a single file upload using the drag/drop feature
  if (file.isForTestingPurpose) {
    filePath = file.localFilePath
  }

  await window.utils.readState(file, file.name, filePath, state, config)
  sessionReadListener()
}

function loadModelFile(file: File, content: string, path = file.path) {
  const models = useSessionStore.getState().models
  const updateModel = useSessionStore.getState().modelActions.updateModel

  const modelId = getModelIdFromFileName(file.name)

  // if the file has not been already added to the processing buffer
  if (models?.[modelId] == null) {
    const existsMainModel = Object.values(models ?? {}).some(
      (model) => model?.isMain === true,
    )

    // create file object
    const model: Model = {
      id: modelId,
      fileName: file.name,
      path: path,
      xml: content,
      groupId: CONST.DEFAULT_MODEL_GROUP_ID,
      isMain: !existsMainModel,
      file: file,
    }

    updateModel(modelId, model)

    hideGeneralWaitingScreen()

    return

    // try {
    //   // process model
    //   // await processModel(config, file.xml, file.id, file.fileName, file.path)
    //   // create file info menu
    //   // createModelFileInfoBlock(file)
    // } catch (error) {
    //   // something wrong happened with the opening of the diagram
    //   removeModelFile(file)
    //   console.error(file.fileName + ' is invalid')
    //   errorAlert(file.fileName + ' is invalid')
    // }
  }

  const msg = file.name + ' (id: ' + modelId + ') is already added'
  errorAlert(msg)
  console.error(msg)
}

function createAnalysisFileInfoBlock(file: File) {
  /// create fileInfo block about the imported model
  const fileInfo = document.createElement('div')
  fileInfo.setAttribute('id', 'fileinfo-' + file.path)
  fileInfo.setAttribute('class', 'row')

  // hide upload label
  // hideElement('upload-label')

  // fill in the file info block
  fileInfo.innerHTML =
    // file name
    '<div class="column file-info">' + file.name + '</div>'
  // add a button allowing to remove the file
  // '<div class="column"><button class="remove-btn" id="remove-'+file.path+'"">Remove</button></div>'; -- not fully working -> the loaded models and questions should be deleted as well and not only the state in the server
  /// add a click event listener call the function to remove the file

  /// add the file info block to the file-list
  document.getElementById('file-list')?.appendChild(fileInfo)

  // document.getElementById("remove-"+file.path).onclick = () => removeAnalysisFile(file);
}

// async function removeAnalysisFile(file) {
//   if (document.getElementById('fileinfo-' + file.path) != null) {
//     await window.state.removeState(file.path)
//     document.getElementById('fileinfo-' + file.path).remove()
//   }
// }

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
  return new Promise<void>(async (resolve) => {
    window.utils.onStateRead(async function (args) {
      const res = args[0]
      const file = { name: args[1], path: args[2] }
      createAnalysisFileInfoBlock(file)

      await stateRead(res)
      resolve()
    })
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
  const { setState, ...state } = useGlobalStore.getState()

  // if the server res.success coming from the server is true
  if (res.success) {
    //process the models within the loaded state
    for (const key of Object.keys(res.data.models)) {
      // add the new models to (client) state.models
      if (!state.models?.hasOwnProperty(key)) {
        console.log('new model ', res.data.models[key])

        const newModel = res.data.models[key]

        setState({
          models: {
            ...state.models,
            [key]: newModel,
          },
        })

        await processModel(newModel.xml, newModel.id, newModel.fileName, newModel.path)
      }
    }

    //process the questions within the loaded state
    if (state.questions === undefined) {
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

  await hideGeneralWaitingScreen()
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
  const { setState } = useGlobalStore.getState()

  const success = res.success
  const msg = res.msg
  const data = res.data

  if (success) {
    setState(data)

    const state = useGlobalStore.getState()
    console.log('state', state)

    if (Object.keys(state.models ?? {}).length === 0) {
      return
    }

    //process the open the models within the loaded state
    for (const model of Object.values(state.models)) {
      await processModel(model.xml, model.id, model.fileName, model.path)
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
async function processModel(
  config: FileImportConfig,
  xml: string,
  id: string,
  fileName: string,
  filePath: string,
) {
  // get state
  const { setState, ...state } = useGlobalStore.getState()

  /// construct/update the directory explorer
  constructDirectoryExplorer(filePath, fileName, id)

  // create tab container
  createTabContainer(id, fileName)

  // create model
  console.log('creating model')
  const modeler = await createModel(fileName, id, xml)
  console.log('model created')

  // differ the execution depending on the state.mode
  if (config.mode == 'data-collection') {
    const previousModel = state.models === undefined ? undefined : state.models[id]
    const newModel = { ...previousModel, isMain: isMain(modeler) }

    // state.models[id].isMain if the model is the main model of the process (cf. isMain())
    setState({
      models: {
        ...state.models,
        [id]: newModel,
      },
    })
  }
  if (config.mode == 'analysis') {
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
function constructDirectoryExplorer(filePath: string, fileName: string, id: string) {
  const state = useGlobalStore.getState()

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
  explorerItem.onclick = function () {
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
 * @param {string} xml  xml refering the content of the model
 * @param {string} currentTabContainerId  the container of the model
 *
 * Returns {object} modeler modeler object
 *
 *
 * Additional notes: none
 *
 */
async function createModel(
  fileName: string,
  id: string,
  xml: string,
  currentTabContainerId: string | undefined,
) {
  const state = useGlobalStore.getState()

  // depending of the argument, either set as a process, or a nested sub-process
  currentTabContainerId = currentTabContainerId ?? 'model' + id + '-content'

  // create a model container
  const modelContainer = document.createElement('div')
  modelContainer.setAttribute('id', currentTabContainerId + '-model' + id + '-object')
  modelContainer.setAttribute('hierarchy', 'main-model')
  modelContainer.setAttribute('class', 'canvas main-model')
  modelContainer.setAttribute('FileName', fileName)

  // append the model container to its parent (i.e., dom element with id=currentTabContainerId)
  document.getElementById(currentTabContainerId).append(modelContainer)

  /// choice based on type of file (bpmn or odm) and whether it is for data-collection (NavigatedViewer) or for anaylsis (Modeler) (i.e., Modeler is used to allow coloring the activities, which is required for the heatmaps)
  let view = null
  let language = null
  // support for bpmn and odm file
  if (fileName.endsWith('bpmn')) language = 'Bpmn'
  else if (fileName.endsWith('odm')) language = 'Odm'
  else throw 'Unknown file format'
  if (state.mode == 'data-collection') view = 'NavigatedViewer'
  else if (state.mode == 'analysis') view = 'Modeler'
  else throw 'Unknown state'

  // create modeler, set language and import xml file
  const modeler = await setUpModelerObject(language, view, currentTabContainerId, id, xml)

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
 * @param {string} xml  xml refering the content of the model

 *
 * Returns {object} modeler modeler object
 *
*
 * Additional notes: none
 *
 */
async function setUpModelerObject(language, view, currentTabContainerId, id, xml) {
  const modeler = new modelers[language + view]({
    container: '#' + currentTabContainerId + '-model' + id + '-object',
  })
  modeler.language = language

  await modeler.importXML(xml)

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
  const state = useGlobalStore.getState()

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
function isFileLoaded(fileName: string, fileId: string) {
  console.log('isFileLoaded', arguments)

  const state = useGlobalStore.getState()

  /// return null if subProcessFileName was not loaded
  if (!state.models?.hasOwnProperty(fileId)) {
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
  const updateModel = useSessionStore.getState().modelActions.updateModel

  const groupAssignementList = document.getElementsByClassName(
    'group-assignement',
  ) as HTMLCollectionOf<HTMLInputElement>

  for (let i = 0; i < groupAssignementList.length; i++) {
    const modelId = groupAssignementList[i]?.getAttribute('modelId') ?? ''
    const groupId = groupAssignementList[i]?.value

    updateModel(modelId, {
      groupId,
    })
  }
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

export { createModel, assignModelsToGroups }
