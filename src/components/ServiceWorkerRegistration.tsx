'use client'

import { useEffect } from 'react'

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      window.workbox !== undefined
    ) {
      const wb = window.workbox

      // Add event listeners to handle any of the generated workbox events
      // https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-window.Workbox#events
      wb.addEventListener('installed', (event: any) => {
        console.log(`Event ${event.type} is triggered.`)
        console.log(event)
      })

      wb.addEventListener('controlling', (event: any) => {
        console.log(`Event ${event.type} is triggered.`)
        console.log(event)
      })

      wb.addEventListener('activated', (event: any) => {
        console.log(`Event ${event.type} is triggered.`)
        console.log(event)
      })

      wb.addEventListener('waiting', (event: any) => {
        console.log(`Event ${event.type} is triggered.`)
        console.log(event)

        // Show update available notification
        if (confirm('A new version is available! Click OK to update.')) {
          wb.addEventListener('controlling', () => {
            window.location.reload()
          })

          // Send a message to the waiting service worker, instructing it to activate
          wb.messageSkipWaiting()
        }
      })

      wb.addEventListener('redundant', (event: any) => {
        console.log(`Event ${event.type} is triggered.`)
        console.log(event)
      })

      wb.addEventListener('externalinstalled', (event: any) => {
        console.log(`Event ${event.type} is triggered.`)
        console.log(event)
      })

      wb.addEventListener('externalactivated', (event: any) => {
        console.log(`Event ${event.type} is triggered.`)
        console.log(event)
      })

      // Register service worker
      wb.register()
        .then((registration: any) => {
          console.log('Service Worker registered successfully:', registration)
        })
        .catch((error: any) => {
          console.error('Service Worker registration failed:', error)
        })

      // Check for updates periodically
      setInterval(() => {
        wb.update()
      }, 60000) // Check every minute
    }
  }, [])

  return null
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    workbox: any
  }
}
