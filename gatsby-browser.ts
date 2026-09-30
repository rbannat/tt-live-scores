import type { GatsbyBrowser } from 'gatsby'
import './src/global.scss'

let loadedBuildTime: string | undefined

const fetchBuildTime = async (): Promise<string | undefined> => {
  try {
    // Query param keeps the request out of the service worker's *.json cache
    const res = await fetch(`/build-info.json?t=${Date.now()}`, {
      cache: 'no-store',
    })
    if (!res.ok) return undefined
    const { buildTime } = await res.json()
    return buildTime
  } catch {
    return undefined
  }
}

const checkForNewBuild = async () => {
  navigator.serviceWorker
    ?.getRegistration()
    .then(registration => registration?.update())
    .catch(() => {})

  const buildTime = await fetchBuildTime()
  if (!buildTime) return

  if (!loadedBuildTime) {
    loadedBuildTime = buildTime
  } else if (buildTime !== loadedBuildTime) {
    window.location.reload()
  }
}

// iOS keeps standalone PWAs alive in the background, so check on resume
export const onClientEntry: GatsbyBrowser['onClientEntry'] = () => {
  checkForNewBuild()
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      checkForNewBuild()
    }
  })
}

export const onServiceWorkerUpdateReady: GatsbyBrowser['onServiceWorkerUpdateReady'] =
  () => {
    window.location.reload()
  }
