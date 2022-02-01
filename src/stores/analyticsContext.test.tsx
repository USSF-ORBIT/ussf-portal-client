/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
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

describe('useAnalytics', () => {
  it('throws an error if AnalyticsContext is undefined', () => {
    jest.spyOn(React, 'useContext').mockReturnValueOnce(undefined)
    expect(() => useAnalytics()).toThrowError()
  })

  it('returns the created context', () => {
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

  it('warns in the console if missing the analytics URL', () => {
    const consoleSpy = jest.spyOn(console, 'warn')
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

    const analyticsConfig = {
      siteId: 'test',
    }

    render(
      <AnalyticsProvider config={analyticsConfig}>
        <TestComponent />
      </AnalyticsProvider>
    )

    expect(consoleSpy).toHaveBeenCalledWith('ANALYTICS: No Matomo URL provided')
  })

  it('warns in the console if missing the analytics site ID', () => {
    const consoleSpy = jest.spyOn(console, 'warn')
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

    const analyticsConfig = {
      url: 'test',
    }

    render(
      <AnalyticsProvider config={analyticsConfig}>
        <TestComponent />
      </AnalyticsProvider>
    )

    expect(consoleSpy).toHaveBeenCalledWith('ANALYTICS: No Site ID provided')
  })

  it('initializes the analytics queue on render', () => {
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

    const analyticsConfig = {
      url: 'TEST_MATOMO_URL',
      siteId: 'TEST_MATOMO_SITE_ID',
    }

    render(
      <AnalyticsProvider config={analyticsConfig}>
        <TestComponent />
      </AnalyticsProvider>
    )

    expect(windowWithAnalytics._paq).toBeDefined()
  })

  describe('with config defined', () => {
    const windowWithAnalytics = window as unknown as typeof Window & {
      _paq: (number[] | string[] | number | string | boolean)[]
    }

    beforeEach(() => {
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

      const analyticsConfig = {
        url: 'TEST_MATOMO_URL',
        siteId: 'TEST_MATOMO_SITE_ID',
      }

      render(
        <AnalyticsProvider config={analyticsConfig}>
          <TestComponent />
        </AnalyticsProvider>
      )
    })

    it('initializes the analytics config on mount', () => {
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

    it('provides the push handler', () => {
      userEvent.click(screen.getByRole('button', { name: 'Test push' }))
      expect(windowWithAnalytics._paq[6]).toEqual([
        'trackEvent',
        'testEvent',
        'push action',
      ])
    })

    it('provides the trackEvent handler', () => {
      userEvent.click(screen.getByRole('button', { name: 'Test track event' }))
      expect(windowWithAnalytics._paq[6]).toEqual([
        'trackEvent',
        'testEvent',
        'track event action',
      ])
    })

    it('can use trackEvent to track an event name', () => {
      userEvent.click(
        screen.getByRole('button', { name: 'Test track event with name' })
      )
      expect(windowWithAnalytics._paq[6]).toEqual([
        'trackEvent',
        'testEvent',
        'track event action',
        'test action name',
      ])
    })

    it('can use trackEvent to track an event value', () => {
      userEvent.click(
        screen.getByRole('button', { name: 'Test track event with value' })
      )
      expect(windowWithAnalytics._paq[6]).toEqual([
        'trackEvent',
        'testEvent',
        'track event action',
        'test action name',
        10,
      ])
    })
  })
})
