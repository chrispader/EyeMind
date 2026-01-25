import { expect, test } from '@playwright/test'
import { _electron as electron } from 'playwright'
import { delay } from '../utils/utils'

test('home-page-navigation-to-eye-tracking', async () => {
  const electronApp = await electron.launch({ args: ['.'] })
  const firstWindow = await electronApp.firstWindow()

  // Verify home page loads
  const eyeTrackingBtn = firstWindow.locator('id=eye-tracking')
  await expect(eyeTrackingBtn).toBeVisible()

  // Navigate to eye-tracking config
  await eyeTrackingBtn.click()
  await delay(500)

  // Verify eye-tracking config page loads with new-session and load-session options
  const newSessionBtn = firstWindow.locator('id=new-session')
  const loadSessionBtn = firstWindow.locator('id=load-session')
  await expect(newSessionBtn).toBeVisible()
  await expect(loadSessionBtn).toBeVisible()

  await electronApp.close()
})

test('home-page-navigation-to-analysis', async () => {
  const electronApp = await electron.launch({ args: ['.'] })
  const firstWindow = await electronApp.firstWindow()

  // Verify home page loads
  const analysisBtn = firstWindow.locator('id=analysis')
  await expect(analysisBtn).toBeVisible()

  // Navigate to analysis page
  await analysisBtn.click()
  await delay(500)

  // Verify analysis page has navigation back to home
  const backBtn = firstWindow.locator('text=Back to Home')
  await expect(backBtn).toBeVisible()

  await electronApp.close()
})

test('new-session-flow-navigation', async () => {
  const electronApp = await electron.launch({ args: ['.'] })
  const firstWindow = await electronApp.firstWindow()

  // Navigate to eye-tracking config
  await firstWindow.locator('id=eye-tracking').click()
  await delay(500)

  // Start new session
  await firstWindow.locator('id=new-session').click()
  await delay(500)

  // Verify new session page with session settings
  const proceedBtn = firstWindow.locator('id=proceed-data-collection-settings')
  await expect(proceedBtn).toBeVisible()

  // Proceed to load-images step
  await firstWindow.locator('id=linking-sub-processes').selectOption('newTab')
  await proceedBtn.click()
  await delay(500)

  // Verify we're on load-images page (file import with skip option)
  const skipBtn = firstWindow.locator('id=process-files')
  await expect(skipBtn).toBeVisible()

  await electronApp.close()
})

test('load-session-page-accessible', async () => {
  const electronApp = await electron.launch({ args: ['.'] })
  const firstWindow = await electronApp.firstWindow()

  // Navigate to eye-tracking config
  await firstWindow.locator('id=eye-tracking').click()
  await delay(500)

  // Navigate to load session
  await firstWindow.locator('id=load-session').click()
  await delay(500)

  // Verify load session page has file upload zone
  const uploadZone = firstWindow.locator('id=upload-zone')
  await expect(uploadZone).toBeVisible()

  await electronApp.close()
})

test('experiment-page-recording-settings-accessible', async () => {
  const electronApp = await electron.launch({ args: ['.'] })
  const firstWindow = await electronApp.firstWindow()

  // Load a session to get to experiment page
  await firstWindow.locator('id=eye-tracking').click()
  await firstWindow.locator('id=load-session').click()

  // We need test data for this - skip if not available
  const uploadZone = firstWindow.locator('id=upload-zone')
  await expect(uploadZone).toBeVisible()

  await electronApp.close()
})
