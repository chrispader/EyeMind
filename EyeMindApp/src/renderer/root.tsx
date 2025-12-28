import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'
import 'bpmn-js/dist/assets/bpmn-js.css'
import 'bpmn-js/dist/assets/diagram-js.css'
import { useEffect } from 'react'
import { StrictMode } from 'react'
import { Outlet, isRouteErrorResponse } from 'react-router'
import { LoadingScreen } from '@/renderer/components/LoadingScreen'
import { ProcessingStates } from '@/renderer/components/ProcessingStates'
import '@/renderer/css/app.css'
import '@/renderer/css/main.css'
import '@/renderer/css/new.css'
import '@/renderer/extra/object-diagram-modeler/starter/app/css/app.css'
import type { Route } from './+types/root'
import { FixationSettingsModal } from './components/FixationSettingsModal'
import { closeModalOutsideClickInteraction } from './modules/ui/shared-interactions'
import {
  DisableCriticalKeys,
  handleWindowRefresh,
  takeSnapshotOnWindowMovement,
  takeSnapshotOnWindowResize,
  testListeners,
} from './modules/ui/window-events'
import { loadServerStateIntoClient, useGlobalStore } from './state/global'

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

export default function App(): React.ReactElement {
  const { isLoading, loadingMessage } = useGlobalStore()

  useEffect(() => {
    initializeApp()
  }, [])

  return (
    <StrictMode>
      <Outlet />

      <FixationSettingsModal />

      <ProcessingStates />

      <LoadingScreen message={loadingMessage ?? ''} visible={isLoading ?? false} />
    </StrictMode>
  )
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!'
  let details = 'An unexpected error occurred.'
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error'
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
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
