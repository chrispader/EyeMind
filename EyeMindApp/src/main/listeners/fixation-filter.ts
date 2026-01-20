import { fixationFilter } from '@renderer/server/node/connectors/fixation-filter'
import { getLocalRpid, setLocalRpid } from '@renderer/server/node/dataModels/processes'
import child from 'child_process'
import detect from 'detect-port'
import { app, ipcMain } from 'electron'
import { BrowserWindow } from 'electron'
import fs from 'fs'
import path from 'path'
import kill from 'tree-kill'

import { CONST } from '@/CONST'
import { IpcListenerParameters } from '@/main/listeners/types'
import { IpcNamespace } from '@/main/listeners/types'

type PastConfig = {
  childRProcessID: number
}

type FixationFilterListenerParameters<
  FunctionName extends keyof IpcNamespace<'Rserver'>,
> = IpcListenerParameters<'Rserver', FunctionName>

export function fixationFilterListeners(mainWindow: BrowserWindow) {
  //console.log("fixationFilterListener function",arguments);

  ipcMain.once('startRserver', async function () {
    /* lunch R server */
    console.log('start R server')

    const suggestedPort = await detect(CONST.R_PORT)

    if (suggestedPort != CONST.R_PORT) {
      console.log('killing old running R instance')
      const config = JSON.parse(
        fs.readFileSync(path.join(app.getAppPath(), CONST.LAST_CONFIG_FILE_PATH), {
          encoding: 'utf-8',
        }),
      ) as PastConfig
      const childRProcessID = config['childRProcessID']
      kill(childRProcessID)
    }

    const mainRPath = path
      .join(app.getAppPath(), 'app', 'server', 'R', 'fixationDetection', 'main.R')
      .replace(/\\/g, '\\\\')
    const execPath = path.join(
      app.getAppPath(),
      'environments',
      'R',
      'bin',
      'RScript.exe',
    )

    const childRProcess = child.spawn(execPath, [
      '-e',
      "library(plumber); pr('" + mainRPath + "') %>% pr_run(port=" + CONST.R_PORT + ');',
    ])
    childRProcess.stdout.on('data', (data: string) => {
      console.log(`stdout -:${data}`)

      // log RserverPid
      if (CONST.R_SERVER_PID_PRINT_PATTERN.test(data)) {
        logRserverPid(
          parseInt(CONST.R_SERVER_PID_PRINT_PATTERN.exec(data.toString())?.[1] ?? '-1'),
        )
      }
    })
    childRProcess.stderr.on('data', (data) => {
      console.log(`stderr -:${data}`)
    })
  })

  ipcMain.handle(
    'fixationFilter',
    function (_e, args: FixationFilterListenerParameters<'fixationFilter'>) {
      return fixationFilter(...args, mainWindow)
    },
  )
}

export function logRserverPid(childRProcessID: number | undefined) {
  console.log('logRserverPid', childRProcessID)
  // setLocalRpid
  setLocalRpid(childRProcessID)
  // save the childRProcessID into a file to termine the process if found already running when re-starting the app
  const objectToSave = { childRProcessID: childRProcessID }
  fs.writeFileSync(
    path.join(app.getAppPath(), CONST.LAST_CONFIG_FILE_PATH),
    JSON.stringify(objectToSave),
  )
}

export async function shutdownFixationFilterServer() {
  console.log('shutdownFixationFilterServer function')

  const childRProcessID = getLocalRpid()

  if (childRProcessID != -1) {
    kill(childRProcessID)
  }

  //await request({method: globalParameters.COMMUNICATION_METHOD_TO_R_SERVER, uri: globalParameters.COMMUNICATION_HOST_TO_R_SERVER+":"+globalParameters.R_PORT+"/quit", body:""})
}
