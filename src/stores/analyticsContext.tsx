import React, { createContext, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'

type PushArgs = (number[] | string[] | number | string | boolean)[]

export type WindowWithAnalytics = typeof Window & {
  _paq?: PushArgs[]
}

type PushFn = (args: PushArgs) => void

type TrackFn = (
  category: string,
  action: string,
  name?: string | undefined,
  value?: number | string | undefined
) => void

export type AnalyticsContextType = {
  push: PushFn
  setUserIdFn: (userId: string) => void
  unsetUserIdFn: () => void
  trackEvent: TrackFn
  trackBaseLocation: (baseLocation: string) => void
  trackRank: (rank: string) => void
}

export const AnalyticsContext = createContext<AnalyticsContextType>({
  push: /* istanbul ignore next */ () => {
    return
  },
  setUserIdFn: /* istanbul ignore next */ () => {
    return
  },
  unsetUserIdFn: /* istanbul ignore next */ () => {
    return
  },
  trackEvent: /* istanbul ignore next */ () => {
    return
  },
  trackBaseLocation: /* istanbul ignore next */ () => {
    return
  },
  trackRank: /* istanbul ignore next */ () => {
    return
  },
})

export const AnalyticsProvider = ({
  children,
  debug = process.env.NODE_ENV === 'development',
}: {
  children: React.ReactNode
  debug?: boolean
}) => {
  const router = useRouter()
  const jsTrackerFile = 'matomo.js'
  const phpTrackerFile = 'matomo.php'

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
      console.debug(`ANALYTICS:`, ...args)
    }

    windowWithAnalytics._paq.push(args)
  }

  const setUserIdFn = (userId: string): void => {
    if (debug === true) {
      console.debug(`ANALYTICS(setUserId):`, userId)
    }

    push(['setUserId', userId])
  }

  const unsetUserIdFn = (): void => {
    if (debug === true) {
      console.debug(`ANALYTICS(unsetUserId)`)
    }

    push(['resetUserId'])

    // we also force a new visit to be created for the pageviews after logout
    push(['appendToTrackingUrl', 'new_visit=1'])
    push(['trackPageView'])

    // we finally make sure to not again create a new visit afterwards (important for Single Page Applications)
    push(['appendToTrackingUrl', ''])
  }

  // Shortcut for push(['trackEvent', ...])
  const trackEvent = (
    category: string,
    action: string,
    name?: string,
    value?: number | string
  ): void => {
    const pushParams: PushArgs = ['trackEvent', category, action]
    if (name !== undefined) {
      pushParams.push(name)
      if (value !== undefined) {
        pushParams.push(value)
      }
    }

    push(pushParams)
  }

  // Track base location
  const trackBaseLocation = (baseLocation: string): void => {
    if (debug === true) {
      console.debug(`ANALYTICS(trackBaseLocation):`, baseLocation)
    }

    // Track base location of user:
    // setCustomDimension is required
    // the 1 here corresponds to the id of the created custom dimension in the Matomo dashboard
    // baseLocation comes from the personnel data api
    push(['setCustomDimension', 1, baseLocation])
    push(['trackPageView'])
  }

  // Track rank
  const trackRank = (rank: string): void => {
    if (debug === true) {
      console.debug(`ANALYTICS(trackRank):`, rank)
    }

    // Track rank of user:
    // setCustomDimension is required
    // the 2 here corresponds to the id of the created custom dimension in the Matomo dashboard
    // rank comes from the personnel data api
    push(['setCustomDimension', 2, rank])
    push(['trackPageView'])
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
    const getAnalyticsConfig = async () => {
      const { analyticsUrl, analyticsSiteId } = await fetch(
        `/api/sysinfo`
      ).then((resp) => resp.json())

      if (!analyticsUrl) {
        // Error: No Matomo URL
        console.warn('ANALYTICS: No Matomo URL provided')
        return
      }

      if (!analyticsSiteId) {
        // Error: No Site ID
        console.warn('ANALYTICS: No Site ID provided')
        return
      }

      previousPath = location.href

      push(['setDocumentTitle', document.title])
      push(['setDoNotTrack', false])
      push(['trackPageView'])
      push(['enableLinkTracking'])

      push(['setTrackerUrl', `${analyticsUrl}/${phpTrackerFile}`])
      push(['setSiteId', analyticsSiteId])

      // Init script tag
      const scriptEl = document.createElement('script')
      const refElement = document.getElementsByTagName('script')[0]
      scriptEl.type = 'text/javascript'
      scriptEl.async = true
      scriptEl.defer = true
      scriptEl.src = `${analyticsUrl}/${jsTrackerFile}`
      if (refElement.parentNode) {
        refElement.parentNode.insertBefore(scriptEl, refElement)
      }

      previousPath = location.pathname

      // Listen to NextJS router events
      router.events.on('routeChangeStart', handleRouteChange)
      return () => {
        router.events.off('routeChangeStart', handleRouteChange)
      }
    }

    getAnalyticsConfig()
  }, [])

  const context = {
    push,
    setUserIdFn,
    unsetUserIdFn,
    trackEvent,
    trackBaseLocation,
    trackRank,
  }

  return (
    <AnalyticsContext.Provider value={context}>
      {children}
    </AnalyticsContext.Provider>
  )
}

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext)

  if (context === undefined) {
    throw new Error(
      'useAnalytics must be used within an AnalyticsContextProvider'
    )
  }

  return context
}
