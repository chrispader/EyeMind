import { RouterProvider, createRouter } from '@tanstack/react-router'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { routeTree } from './routeTree.gen'

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('root')!

createRoot(rootElement).render(
  <StrictMode>
    <div className='fixed top-0 left-0 w-full h-full bg-black text-white z-50 flex items-center justify-center'>
      <p>Hello World!</p>
    </div>
    <RouterProvider router={router} />
  </StrictMode>,
)
