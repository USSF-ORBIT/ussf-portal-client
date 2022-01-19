import { useEffect } from 'react'
import { useRouter } from 'next/router'

// inspired by https://github.com/SocialGouv/matomo-next

type AnalyticsSettings = {
  url?: string
  siteId?: string
  jsTrackerFile?: string
  phpTrackerFile?: string
  debug?: boolean
}

type PushArgs = (number[] | string[] | number | string | boolean)[]

type WindowWithAnalytics = typeof Window & {
  _paq?: PushArgs[]
}

type PushFn = (args: PushArgs) => void

const useAnalytics = ({
  url,
  siteId,
  jsTrackerFile = 'matomo.js',
  phpTrackerFile = 'matomo.php',
  debug = false,
}: AnalyticsSettings): {
  push?: PushFn
} => {
  const router = useRouter()
  let previousPath = ''

  const push: PushFn = (args): void => {
    if (!window) {
      console.warn('ANALYTICS: Cannot call push from server side code')
      return
    }

    const windowWithAnalytics = window as unknown as WindowWithAnalytics

    if (!windowWithAnalytics._paq) {
      windowWithAnalytics._paq = []
    }

    if (debug === true) {
      console.log(`ANALYTICS:`, ...args)
    }

    windowWithAnalytics._paq.push(args)
  }

  const handleRouteChange = (url: string) => {
    if (previousPath) push(['setReferrerUrl', previousPath])

    push(['setCustomUrl', url])
    push(['setDocumentTitle', document.title])

    push(['trackPageView'])

    push(['enableLinkTracking'])
    previousPath = url
  }

  useEffect(() => {
    // Initialization - this happens once per page load
    if (!url) {
      // Error: No Matomo URL
      console.warn('ANALYTICS: No Matomo URL provided')
      return
    }

    if (!siteId) {
      // Error: No Site ID
      console.warn('ANALYTICS: No Site ID provided')
      return
    }

    previousPath = location.href

    push(['setDocumentTitle', document.domain + '/' + document.title])
    push(['setDoNotTrack', true])
    push(['trackPageView'])
    push(['enableLinkTracking'])

    push(['setTrackerUrl', `${url}/${phpTrackerFile}`])
    push(['setSiteId', siteId])

    // Init script tag
    const scriptEl = document.createElement('script')
    const refElement = document.getElementsByTagName('script')[0]
    scriptEl.type = 'text/javascript'
    scriptEl.async = true
    scriptEl.defer = true
    scriptEl.src = `${url}/${jsTrackerFile}`
    if (refElement.parentNode) {
      refElement.parentNode.insertBefore(scriptEl, refElement)
    }

    previousPath = location.pathname

    // Listen to NextJS router events
    router.events.on('routeChangeStart', handleRouteChange)
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [])

  return {
    push,
  }
}

export default useAnalytics
