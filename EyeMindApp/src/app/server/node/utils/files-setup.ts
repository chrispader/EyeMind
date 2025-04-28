import json from 'big-json'
import { BrowserWindow } from 'electron'
import fs from 'fs'
import { LoadFileConfig } from '@/app/client/components/FileImport/types'
import { ClientState } from '@/app/client/state/state'
import { addState } from '@/app/server/node/dataModels/state'

export function readState(
  _file: File,
  fileName: string,
  filePath: string | undefined,
  state: ClientState,
  config: LoadFileConfig,
  mainWindow: BrowserWindow,
) {
  // read JSON and Save state
  const readStream = fs.createReadStream(filePath)
  const parseStream = json.createParseStream()

  parseStream.on('data', function (data) {
    if (config.expectedArtifact == 'analysis') {
      const res = {
        msg: 'File ' + filePath + ' read',
        data: { models: data.models, questions: data.questions },
        success: true,
      }
      mainWindow.webContents.send('stateRead', res, fileName, filePath)

      // populate state for the server with the data obtained from the file
      state = populateState(
        {
          ...state,
          temp: {
            expectedArtifact: config.expectedArtifact,
            expectedExtensions: config.expectedExtensions ?? [],
          },
        },
        data,
      )

      console.log(filePath)

      // add state to states
      addState(filePath, state)
    } else if (config.expectedArtifact == 'session') {
      const res = readSession(data)
      mainWindow.webContents.send('sessionRead', res)
    } else {
      const msg = 'Unknown expectedArtifact'
      console.error(msg)
      /// eror reported only on the sever side
    }
  })

  parseStream.on('error', function (error) {
    console.error(error)
    const res = { msg: 'An error occured while reading the file', success: false }

    if (config.expectedArtifact == 'analysis') {
      mainWindow.webContents.send('stateRead', res)
    } else if (config.expectedArtifact == 'session') {
      mainWindow.webContents.send('sessionRead', res)
    }
  })

  readStream.pipe(parseStream)
}

export function readSession(loadedState: ClientState) {
  if (loadedState.processedGazeData?.hasOwnProperty('gazeData')) {
    return {
      data: null,
      msg: 'Could not load the session file because it contains gaze data already',
      success: false,
    }
  }

  return {
    data: loadedState,
    msg: 'State Loaded',
    success: true,
  }
}

export function populateState(state: ClientState, loadedState: ClientState) {
  state.snapshots = loadedState.snapshots
  state.snapshotsCounter = loadedState.snapshotsCounter
  state.processedGazeData = loadedState.processedGazeData

  state.models = loadedState.models
  state.questions = loadedState.questions
  state.styleParameters = loadedState.styleParameters

  state.isEtOn = loadedState.isEtOn
  state.linkingSubProcessesMode = loadedState.linkingSubProcessesMode

  // control flow depending on whether the file comes directly from a data-collection or an analysis has been already applied
  if (loadedState.mode == 'data-collection') {
    console.log('The file comes directly from a data-collection')

    // initiate or use existing value of state.processedGazeData.areGazesCorrected
    state.processedGazeData.areGazesCorrected = false
  } else if (loadedState.mode == 'analysis') {
    console.log('Exisiting analysis')
    if (loadedState.processedGazeData.fixationData != null) {
      // parse fixation data (which enable heatmap options)
      //state.processedGazeData.fixationData = new DataFrame(JSON.parse(loadedState.processedGazeData.fixationData));
      state.processedGazeData.fixationData = loadedState.processedGazeData.fixationData
    }
  }

  // initiate or use existing value of state.processedGazeData.areGazesCorrected
  state.processedGazeData.areGazesCorrected =
    state.processedGazeData.areGazesCorrected == null
      ? false
      : state.processedGazeData.areGazesCorrected

  return state
}
