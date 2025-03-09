import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
  // Create a div for React to render into
  const rootElement = document.createElement('div')
  rootElement.id = 'react-root'
  document.body.appendChild(rootElement)

  // Initialize React
  const root = createRoot(rootElement)
  root.render(<App />)
})
