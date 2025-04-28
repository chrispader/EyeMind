declare global {
  interface Window {
    electron: {
      putFullScreen: () => void
      message: (type: string, text: string) => void
      removeFullScreen: () => void
      onBrowserMovement: (callback: (args: unknown[]) => void) => void
      onBrowserResize: (callback: (args: unknown[]) => void) => void
    }

    serverTests: {
      getServerState: () => Promise<unknown>
    }

    globalParameters: Record<string, unknown>

    analysis: {
      summerizedFixationLog: (
        data: unknown,
        mode: string,
        areGazesCorrected: boolean,
      ) => Promise<unknown>
      generateHeatMap: (
        filePaths: string[],
        elementRegistryTypes: string[],
        measure: string,
        measureType: string,
        aggregation: string,
        additionalElementsToIclude: string[],
        questionID: string,
      ) => Promise<unknown>
      shouldEnableHeatmap: () => Promise<boolean>
      getRandomGazeSet: (samplingRatio: number, stateFile: string) => Promise<unknown>
      applyCorrectionOffset: (
        externalMappingWindow: unknown,
        stateFile: string,
        snapshotId: string,
        xOffset: number,
        yOffset: number,
      ) => Promise<unknown>
      onApplyCorrectionOnGazeFragment: (callback: (args: unknown[]) => void) => void
      gazeDataFragmentMapped: (
        stateFile: string,
        gazeDataFragment: unknown,
        start: number,
        gazeDataSize: number,
        externalMappingWindow: unknown,
        snapshotId: string,
        xOffset: number,
        yOffset: number,
      ) => Promise<unknown>
      onCompleteCorrectionListener: (callback: (args: unknown[]) => void) => void
      getStatesInfo: () => Promise<unknown>
    }

    utils: {
      stateDownload: (
        fileName: string,
        includeTimeStampInFileName: boolean,
        customDownload: unknown,
      ) => Promise<unknown>
      readState: (
        file: File,
        fileName: string,
        filePath: string | undefined,
        state: ClientState,
        config: LoadFileConfig,
      ) => Promise<unknown>
      onStateRead: (callback: (args: unknown[]) => void) => void
      saveSession: (state: unknown) => Promise<unknown>
      recoverSession: (
        gazeDataFilename: string,
        snapshotsContentDataFilename: string,
      ) => Promise<unknown>
      onSessionRead: (callback: (args: unknown[]) => void) => void
    }

    eyeTracker: {
      setupTracking: (xScreenDim: number, yScreenDim: number) => Promise<unknown>
      sendSnapshotID: (snapshot: unknown) => Promise<unknown>
      sendFullSnapshot: (snapshot: unknown) => Promise<unknown>
      sendQuestionEvent: (
        questionTimestamp: number,
        questionEventType: string,
        questionPosition: string,
        questionText: string,
        questionAnswer: string,
        questionID: string,
      ) => Promise<unknown>
      processGazeData: (
        state: unknown,
        externalProgressWindow: unknown,
      ) => Promise<unknown>
      onMapGazestoElementsFromPageSnapshot: (callback: (args: unknown[]) => void) => void
      dataMapped: (
        dataMapped: unknown,
        start: number,
        gazeDataSize: number,
        externalProgressWindow: unknown,
      ) => Promise<unknown>
      onCompleteProcessingListener: (callback: (args: unknown[]) => void) => void
      sendClickEvent: (clickTimestamp: number, clickedElement: string) => Promise<unknown>
    }

    Rserver: {
      startRserver: () => void
      fixationFilter: (fixationFilterSettings: unknown) => Promise<unknown>
      onCompleteFixationFilterListener: (callback: (args: unknown[]) => void) => void
    }

    state: {
      getState: () => Promise<ClientState>
      clearState: () => Promise<unknown>
      getStyleParametersOfState: (filePath: string) => Promise<unknown>
      setAreGazesCorrectedOfState: (filePath: string, val: boolean) => Promise<unknown>
      getQuestions: () => Promise<unknown>
      getStates: () => Promise<unknown>
      clearStates: () => Promise<unknown>
      removeState: (filePath: string) => Promise<unknown>
      doesStateExist: (filePath: string) => Promise<boolean>
      getSnapshotsOfState: (filePath: string) => Promise<unknown>
      areAreGazesCorrectedOfState: (filePath: string) => Promise<boolean>
    }

    progress: {
      onUpdateProcessingMessage: (callback: (args: unknown[]) => void) => void
    }
  }
}
export {}
