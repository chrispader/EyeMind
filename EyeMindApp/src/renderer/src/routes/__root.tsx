import { LoadingScreen } from '@renderer/components/LoadingScreen'
import '@renderer/css/app.css'
import '@renderer/css/main.css'
import '@renderer/css/new.css'
import '@renderer/extra/object-diagram-modeler/starter/app/css/app.css'
import { closeModalOutsideClickInteraction } from '@renderer/modules/ui/shared-interactions'
import {
  DisableCriticalKeys,
  handleWindowRefresh,
  takeSnapshotOnWindowMovement,
  takeSnapshotOnWindowResize,
  testListeners,
} from '@renderer/modules/ui/window-events'
import { loadServerStateIntoClient, useGlobalStore } from '@renderer/state/global'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'
import 'bpmn-js/dist/assets/bpmn-js.css'
import 'bpmn-js/dist/assets/diagram-js.css'
import { useEffect } from 'react'

import { HeaderBar } from '../components/HeaderBar'

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

      <TanStackRouterDevtools />
    </>
  )
}

function ErrorBoundary({ error }: { error: Error }) {
  let message = 'Oops!'
  let details = 'An unexpected error occurred.'
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

    // Test listener
    testListeners()

    // Event listener for clicks outside the modal area
    window.onclick = closeModalOutsideClickInteraction
  } catch (error) {
    console.error('Error initializing app:', error)
  }
}
