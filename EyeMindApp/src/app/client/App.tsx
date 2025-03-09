import React, { useEffect } from 'react'
import {
  handleWindowRefresh,
  takeSnapshotOnWindowResize,
  takeSnapshotOnWindowMovement,
  testListeners,
  DisableCriticalKeys,
} from './modules/ui/window-events'
import {
  modeSelectionListeners,
  closeModalOutsideClickInteraction,
} from './modules/ui/shared-interactions'
import { loadServerStateIntoClient } from './modules/dataModels/state'

// Import CSS
import './css/app.css'

const App: React.FC = () => {
  // Initialize application on mount
  useEffect(() => {
    // Load HTML content from the existing index.html
    fetch('./index.html')
      .then((response) => response.text())
      .then((html) => {
        // Extract the body content from the HTML
        const parser = new DOMParser()
        const doc = parser.parseFromString(html, 'text/html')
        const bodyContent = doc.querySelector('.all-content')

        if (bodyContent != null) {
          // Insert the existing HTML content into our app div
          const appDiv = document.getElementById('all-content')
          if (appDiv != null) {
            appDiv.innerHTML = bodyContent.innerHTML

            // Initialize the app after content is loaded
            initializeApp()
          }
        }
      })
      .catch((error) => {
        console.error('Error loading HTML content:', error)
      })
  }, [])

  // Function to initialize the app (from original app.ts)
  const initializeApp = async () => {
    try {
      // Load server state
      await loadServerStateIntoClient()

      // Call window event listeners
      DisableCriticalKeys()
      handleWindowRefresh()
      takeSnapshotOnWindowResize()
      takeSnapshotOnWindowMovement()

      // Mode selection listeners
      modeSelectionListeners()

      // Test listener
      testListeners()

      // Event listener for clicks outside the modal area
      window.onclick = closeModalOutsideClickInteraction
    } catch (error) {
      console.error('Error initializing app:', error)
    }
  }

  return (
    <div className="all-content" id="all-content">
      {/* The HTML content will be loaded here */}
    </div>
  )
}

export default App
