import LANG from '@renderer/LANG'
import { resetModel, resetNavTabsAndTabs } from '@renderer/actions/canvas'
import { openMainTab } from '@renderer/actions/tab-management'
import {
  DisableCriticalKeys,
  handleWindowRefresh,
  takeSnapshotOnWindowMovement,
  takeSnapshotOnWindowResize,
} from '@renderer/actions/window-events'
import { LoadingScreen } from '@renderer/components/LoadingScreen'
import '@renderer/css/app.css'
import '@renderer/css/main.css'
import '@renderer/css/new.css'
import '@renderer/extra/object-diagram-modeler/starter/app/css/app.css'
import { loadServerStateIntoClient, useGlobalStore } from '@renderer/state/global'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Toaster } from 'react-hot-toast'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'
import 'bpmn-js/dist/assets/bpmn-js.css'
import 'bpmn-js/dist/assets/diagram-js.css'
import { useEffect } from 'react'

import { HeaderBar } from '../components/HeaderBar'

/** Close modal when clicking outside modal content area (legacy pattern for imperative modals) */
function closeModalOutsideClickInteraction(event: MouseEvent) {
  const target = event.target as HTMLElement
  if (
    target === document.getElementById('startET-modal') ||
    target === document.getElementById('heatmap-settings-modal') ||
    target === document.getElementById('download-modal')
  ) {
    target.style.display = 'none'
  }
}

export const Route = createRootRoute({
  component: RootComponent,
  errorComponent: ErrorBoundary,
})

function RootComponent(): React.ReactElement {
  const { isLoading, loadingMessage } = useGlobalStore()

  useEffect(() => {
    initializeApp()
  }, [])

  return (
    <>
      <HeaderBar title='EyeMind' />
      <Outlet />

      {/* <FixationSettingsModal /> */}

      {/* <ProcessingStates /> */}

      <LoadingScreen message={loadingMessage ?? ''} visible={isLoading ?? false} />

      <Toaster
        position='top-center'
        containerStyle={{ zIndex: 9999 }}
        containerClassName='app-toaster'
        toastOptions={{ duration: 3000 }}
      />

      <TanStackRouterDevtools />
    </>
  )
}

function ErrorBoundary({ error }: { error: Error }) {
  const message: string = LANG.errorOops
  let details: string = LANG.errorUnexpected
  let stack: string | undefined

  if (error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <main className='pt-16 p-4 container mx-auto'>
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className='w-full p-4 overflow-x-auto'>
          <code>{stack}</code>
        </pre>
      )}
    </main>
  )
}

async function initializeApp(): Promise<void> {
  try {
    // Load server state
    await loadServerStateIntoClient()

    // Call window event listeners
    DisableCriticalKeys()
    handleWindowRefresh()
    takeSnapshotOnWindowResize()
    takeSnapshotOnWindowMovement()

    // Expose test utilities to window.clientTests
    window.clientTests = {
      getClientState: () => useGlobalStore.getState(),
      openMainTabInWithinTabLinks: (modelsGroupId: string) =>
        openMainTab(true, false, modelsGroupId),
      resetModel: (fileId: string) => resetModel(fileId),
      resetNavTabsAndTabs: (modelsGroupId: string) => resetNavTabsAndTabs(modelsGroupId),
    }

    // Event listener for clicks outside the modal area
    window.onclick = closeModalOutsideClickInteraction
  } catch (error) {
    console.error('Error initializing app:', error)
  }
}
