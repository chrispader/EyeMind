declare module 'bpmn-js/lib/Modeler' {
  export default class BpmnModeler {
    constructor(options: any)
    importXML(xml: string): Promise<any>
    get(name: string): any
    on(event: string, callback: (context: any) => void): void
  }
}

declare module 'bpmn-js/lib/NavigatedViewer' {
  export default class BpmnNavigatedViewer {
    constructor(options: any)
    importXML(xml: string): Promise<any>
    get(name: string): any
    on(event: string, callback: (context: any) => void): void
  }
}

// Define interfaces for global objects
interface GlobalParameters {
  MODELS_ID_REGEX: string
  [key: string]: unknown
}

interface StateManager {
  doesStateExist(path: string): Promise<boolean>
  removeState(path: string): Promise<void>
  [key: string]: unknown
}

interface UtilsManager {
  readState(
    file: unknown,
    fileName: string,
    filePath: string,
    state: unknown,
    callback?: unknown,
  ): void
  onStateRead(callback: (args: unknown[]) => void): void
  onSessionRead(callback: (args: unknown[]) => void): void
  [key: string]: unknown
}

// Add to global Window interface
interface Window {
  globalParameters: GlobalParameters
  state: StateManager
  utils: UtilsManager
}
