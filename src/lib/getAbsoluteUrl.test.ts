/**
 * @jest-environment jsdom
 */
import type { IncomingMessage } from 'http'
import { getAbsoluteUrl } from './getAbsoluteUrl'

describe('getAbsoluteUrl', () => {
  describe('with no parameters', () => {
    it('returns localhost with no parameters', () => {
      const expected = {
        protocol: 'http:',
        origin: 'http://localhost',
        host: 'localhost',
      }
      expect(getAbsoluteUrl()).toStrictEqual(expected)
    })
  })

  describe('with request only', () => {
    it('returns correctly with x-forwarded-host header set', () => {
      const expected = {
        protocol: 'https:',
        origin: 'https://example.com',
        host: 'example.com',
      }
      const req = {
        headers: { 'x-forwarded-host': 'example.com' },
      } as unknown as IncomingMessage
      expect(getAbsoluteUrl(req)).toStrictEqual(expected)
    })

    it('returns correctly with host header set', () => {
      const expected = {
        protocol: 'https:',
        origin: 'https://example.org',
        host: 'example.org',
      }
      const req = {
        headers: { host: 'example.org' },
      } as IncomingMessage
      expect(getAbsoluteUrl(req)).toStrictEqual(expected)
    })
  })

  describe('with setLocalhost passed', () => {
    it('returns custom localhost', () => {
      const expected = {
        protocol: 'http:',
        origin: 'http://custom.example.local',
        host: 'custom.example.local',
      }
      expect(getAbsoluteUrl(undefined, 'custom.example.local')).toStrictEqual(
        expected
      )
    })

    it('returns correctly with host header set', () => {
      const expected = {
        protocol: 'https:',
        origin: 'https://example.org',
        host: 'example.org',
      }
      const req = {
        headers: { host: 'example.org' },
      } as IncomingMessage
      expect(getAbsoluteUrl(req, 'custom.example.com')).toStrictEqual(expected)
    })
  })
})
