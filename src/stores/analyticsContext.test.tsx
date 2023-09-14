/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, renderHook, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/router'

import {
  useAnalytics,
  AnalyticsProvider,
  WindowWithAnalytics,
} from './analyticsContext'

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

const mockRouterOn = jest.fn()
const mockRouterOff = jest.fn()

const mockedUseRouter = useRouter as jest.Mock

mockedUseRouter.mockReturnValue({
  events: {
    on: mockRouterOn,
    off: mockRouterOff,
  },
})

// Mock fetch
window.fetch = jest.fn(() =>
  Promise.resolve({
    json: async () => ({
      version: 'Test app version',
      buildId: 'Test build ID',
      nodeEnv: 'test',
      analyticsUrl: 'TEST_MATOMO_URL',
      analyticsSiteId: 'TEST_MATOMO_SITE_ID',
    }),
  })
) as jest.Mock

const mockedFetch = fetch as jest.Mock

// ignore console.debug and don't output to test output
jest.spyOn(console, 'debug').mockImplementation(jest.fn())
const mockConsoleWarn = jest.fn()
jest.spyOn(console, 'warn').mockImplementation(mockConsoleWarn)
const mockConsoleDebug = jest.fn()
jest.spyOn(console, 'debug').mockImplementation(mockConsoleDebug)

describe('useAnalytics', () => {
  test('throws an error if AnalyticsContext is undefined', () => {
    jest.spyOn(React, 'useContext').mockReturnValueOnce(undefined)
    expect(() => useAnalytics()).toThrowError()
  })

  test('returns the created context', () => {
    const { result } = renderHook(() => useAnalytics())
    expect(result.current).toBeTruthy()
    expect(result.current.push).toBeTruthy()
    expect(result.current.trackEvent).toBeTruthy()
  })
})

describe('Analytics context', () => {
  beforeAll(() => {
    // Insert an empty script so the analytics script can attach somewhere
    const testScript = document.createElement('script')
    document.body.appendChild(testScript)
  })

  beforeEach(() => {
    mockedFetch.mockClear()
    mockConsoleWarn.mockClear()
    mockConsoleDebug.mockClear()
  })

  test('warns in the console if missing the analytics URL', async () => {
    const TestComponent = () => {
      const { push, trackEvent } = useAnalytics()
      return (
        <div>
          <button
            type="button"
            onClick={() => push(['trackEvent', 'testEvent', 'test event 1'])}>
            Test push
          </button>
          <button
            type="button"
            onClick={() => trackEvent('testEvent', 'test event 2')}>
            Test track event
          </button>
        </div>
      )
    }

    mockedFetch.mockResolvedValueOnce({
      json: async () => ({
        version: 'Test app version',
        buildId: 'Test build ID',
        nodeEnv: 'test',
        analyticsSiteId: 'TEST_MATOMO_SITE_ID',
      }),
    })

    render(
      <AnalyticsProvider>
        <TestComponent />
      </AnalyticsProvider>
    )

    await waitFor(() => {
      expect(mockConsoleWarn).toHaveBeenCalledWith(
        'ANALYTICS: No Matomo URL provided'
      )
    })
  })

  test('warns in the console if missing the analytics site ID', async () => {
    const TestComponent = () => {
      const { push, trackEvent } = useAnalytics()
      return (
        <div>
          <button
            type="button"
            onClick={() => push(['trackEvent', 'testEvent', 'test event 1'])}>
            Test push
          </button>
          <button
            type="button"
            onClick={() => trackEvent('testEvent', 'test event 2')}>
            Test track event
          </button>
        </div>
      )
    }

    mockedFetch.mockResolvedValueOnce({
      json: async () => ({
        version: 'Test app version',
        buildId: 'Test build ID',
        nodeEnv: 'test',
        analyticsUrl: 'TEST_MATOMO_URL',
      }),
    })

    render(
      <AnalyticsProvider>
        <TestComponent />
      </AnalyticsProvider>
    )

    await waitFor(() => {
      expect(mockConsoleWarn).toHaveBeenCalledWith(
        'ANALYTICS: No Site ID provided'
      )
    })
  })

  test('initializes the analytics queue on render', async () => {
    const windowWithAnalytics = window as unknown as WindowWithAnalytics

    expect(windowWithAnalytics._paq).toBeUndefined()

    const TestComponent = () => {
      const { push, trackEvent } = useAnalytics()
      return (
        <div>
          <button
            type="button"
            onClick={() => push(['trackEvent', 'testEvent', 'push action'])}>
            Test push
          </button>
          <button
            type="button"
            onClick={() => trackEvent('testEvent', 'track event action')}>
            Test track event
          </button>
          <button
            type="button"
            onClick={() =>
              trackEvent('testEvent', 'track event action', 'test action name')
            }>
            Test track event with name
          </button>
          <button
            type="button"
            onClick={() =>
              trackEvent(
                'testEvent',
                'track event action',
                'test action name',
                10
              )
            }>
            Test track event with value
          </button>
        </div>
      )
    }

    render(
      <AnalyticsProvider>
        <TestComponent />
      </AnalyticsProvider>
    )

    await waitFor(() => {
      expect(windowWithAnalytics._paq).toBeDefined()
    })
  })

  test('calls setUserIdFn', async () => {
    const windowWithAnalytics = window as unknown as WindowWithAnalytics

    expect(windowWithAnalytics._paq).toBeDefined()

    const TestComponent = () => {
      const { push, setUserIdFn } = useAnalytics()
      return (
        <div>
          <button type="button" onClick={() => setUserIdFn('testUserId')}>
            Set user ID
          </button>
          <button
            type="button"
            onClick={() => push(['trackEvent', 'testEvent', 'push action'])}>
            Test push
          </button>
        </div>
      )
    }

    render(
      <AnalyticsProvider debug>
        <TestComponent />
      </AnalyticsProvider>
    )

    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: 'Set user ID' }))
    await user.click(screen.getByRole('button', { name: 'Test push' }))
    expect(windowWithAnalytics._paq?.pop()).toEqual([
      'trackEvent',
      'testEvent',
      'push action',
    ])
    expect(windowWithAnalytics._paq?.pop()).toEqual(['setUserId', 'testUserId'])

    expect(mockConsoleDebug).toHaveBeenCalledWith(
      'ANALYTICS(setUserId):',
      'testUserId'
    )
  })

  test('calls unsetUserIdFn', async () => {
    const windowWithAnalytics = window as unknown as WindowWithAnalytics

    expect(windowWithAnalytics._paq).toBeDefined()

    const TestComponent = () => {
      const { unsetUserIdFn } = useAnalytics()
      return (
        <div>
          <button type="button" onClick={() => unsetUserIdFn()}>
            Unset user ID
          </button>
        </div>
      )
    }

    render(
      <AnalyticsProvider debug>
        <TestComponent />
      </AnalyticsProvider>
    )

    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: 'Unset user ID' }))

    expect(windowWithAnalytics._paq?.pop()).toEqual(['appendToTrackingUrl', ''])
    expect(mockConsoleDebug).toHaveBeenCalledWith('ANALYTICS(unsetUserId)')
  })

  test('calls trackBaseLocation', async () => {
    const windowWithAnalytics = window as unknown as WindowWithAnalytics

    expect(windowWithAnalytics._paq).toBeDefined()

    const TestComponent = () => {
      const { trackBaseLocation } = useAnalytics()
      return (
        <div>
          <button
            type="button"
            onClick={() => trackBaseLocation('testBaseLocation')}>
            Track base location
          </button>
        </div>
      )
    }

    render(
      <AnalyticsProvider debug>
        <TestComponent />
      </AnalyticsProvider>
    )

    const user = userEvent.setup()
    await user.click(
      screen.getByRole('button', { name: 'Track base location' })
    )

    expect(mockConsoleDebug).toHaveBeenCalledWith(
      'ANALYTICS(trackBaseLocation):',
      'testBaseLocation'
    )
  })

  test('calls trackRank', async () => {
    const windowWithAnalytics = window as unknown as WindowWithAnalytics

    expect(windowWithAnalytics._paq).toBeDefined()

    const TestComponent = () => {
      const { trackRank } = useAnalytics()
      return (
        <div>
          <button type="button" onClick={() => trackRank('General')}>
            Track rank
          </button>
        </div>
      )
    }

    render(
      <AnalyticsProvider debug>
        <TestComponent />
      </AnalyticsProvider>
    )

    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: 'Track rank' }))

    expect(mockConsoleDebug).toHaveBeenCalledWith(
      'ANALYTICS(trackRank):',
      'General'
    )
  })

  describe('with config defined', () => {
    const windowWithAnalytics = window as unknown as typeof Window & {
      _paq: (number[] | string[] | number | string | boolean)[]
    }

    beforeEach(async () => {
      document.title = 'Test Doc Title'
      windowWithAnalytics._paq = []

      const TestComponent = () => {
        const { push, trackEvent } = useAnalytics()
        return (
          <div>
            <button
              type="button"
              onClick={() => push(['trackEvent', 'testEvent', 'push action'])}>
              Test push
            </button>
            <button
              type="button"
              onClick={() => trackEvent('testEvent', 'track event action')}>
              Test track event
            </button>
            <button
              type="button"
              onClick={() =>
                trackEvent(
                  'testEvent',
                  'track event action',
                  'test action name'
                )
              }>
              Test track event with name
            </button>
            <button
              type="button"
              onClick={() =>
                trackEvent(
                  'testEvent',
                  'track event action',
                  'test action name',
                  10
                )
              }>
              Test track event with value
            </button>
          </div>
        )
      }

      render(
        <AnalyticsProvider>
          <TestComponent />
        </AnalyticsProvider>
      )

      waitFor(() => {
        expect(windowWithAnalytics._paq).toBeDefined()
      })
    })

    test('initializes the analytics config on mount', () => {
      expect(windowWithAnalytics._paq[0]).toEqual([
        'setDocumentTitle',
        'Test Doc Title',
      ])
      expect(windowWithAnalytics._paq[1]).toEqual(['setDoNotTrack', true])
      expect(windowWithAnalytics._paq[2]).toEqual(['trackPageView'])
      expect(windowWithAnalytics._paq[3]).toEqual(['enableLinkTracking'])
      expect(windowWithAnalytics._paq[4]).toEqual([
        'setTrackerUrl',
        'TEST_MATOMO_URL/matomo.php',
      ])
      expect(windowWithAnalytics._paq[5]).toEqual([
        'setSiteId',
        'TEST_MATOMO_SITE_ID',
      ])

      expect(mockRouterOn).toHaveBeenCalledWith(
        'routeChangeStart',
        expect.anything()
      )
    })

    test('provides the push handler', async () => {
      const user = userEvent.setup()
      await user.click(screen.getByRole('button', { name: 'Test push' }))

      expect(windowWithAnalytics._paq.pop()).toEqual([
        'trackEvent',
        'testEvent',
        'push action',
      ])
    })

    test('provides the trackEvent handler', async () => {
      const user = userEvent.setup()
      await user.click(screen.getByRole('button', { name: 'Test track event' }))
      expect(windowWithAnalytics._paq.pop()).toEqual([
        'trackEvent',
        'testEvent',
        'track event action',
      ])
    })

    test('can use trackEvent to track an event name', async () => {
      const user = userEvent.setup()
      await user.click(
        screen.getByRole('button', { name: 'Test track event with name' })
      )
      expect(windowWithAnalytics._paq.pop()).toEqual([
        'trackEvent',
        'testEvent',
        'track event action',
        'test action name',
      ])
    })

    test('can use trackEvent to track an event value', async () => {
      const user = userEvent.setup()
      await user.click(
        screen.getByRole('button', { name: 'Test track event with value' })
      )
      expect(windowWithAnalytics._paq.pop()).toEqual([
        'trackEvent',
        'testEvent',
        'track event action',
        'test action name',
        10,
      ])
    })
  })
})
