import type { IncomingMessage } from 'http'
import { testApiHandler } from 'next-test-api-route-handler'
import type { NextApiHandler } from 'next'
import axios from 'axios'

import { mockUser } from '../../../../lib/__mocks__/saml'

import handler from 'pages/api/auth/[[...action]]'

jest.mock('axios')
jest.mock('../../../../lib/session')
jest.mock('../../../../lib/saml')

const mockedAxios = axios as jest.Mocked<typeof axios>

mockedAxios.post.mockImplementation(() => {
  return Promise.resolve()
})

const apiHandler = handler as unknown as NextApiHandler<any>

const mockSession = {
  destroy: jest.fn(),
}

interface RequestWithSession extends IncomingMessage {
  user?: typeof mockUser
  session?: typeof mockSession
}

describe('API / Auth handlers', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('GET /api/auth/user', () => {
    it('returns a status 401 if not logged in', async () => {
      await testApiHandler({
        handler: apiHandler,
        url: '/api/auth/user',
        test: async ({ fetch }) => {
          const res = await fetch()
          expect(res.status).toBe(401)
          expect(await res.json()).toStrictEqual({ user: null })
        },
      })
    })

    it('returns the user if logged in', async () => {
      await testApiHandler({
        handler: apiHandler,
        url: '/api/auth/user',
        requestPatcher: (req: RequestWithSession) => {
          req.user = mockUser
          req.session = mockSession
        },
        test: async ({ fetch }) => {
          const res = await fetch()
          expect(res.status).toBe(200)
          expect(await res.json()).toStrictEqual({ user: mockUser })
        },
      })
    })
  })

  describe('GET /api/auth/login', () => {
    it('initiates SAML authentication', async () => {
      await testApiHandler({
        handler: apiHandler,
        url: '/api/auth/login',
        test: async ({ fetch }) => {
          const res = await fetch()
          // TODO - improve this test
          expect(res.status).toBeTruthy()
        },
      })
    })
  })

  describe('POST /api/auth/login', () => {
    // TODO - test if there is no user/login fails
    it('handles completion of SAML authentication', async () => {
      await testApiHandler({
        handler: apiHandler,
        url: '/api/auth/login',
        test: async ({ fetch }) => {
          const res = await fetch({ method: 'POST' })
          expect(res.status).toBe(200)
          expect(await res.json()).toStrictEqual({ user: mockUser })
        },
      })
    })
  })

  describe('GET /api/auth/logout', () => {
    it('logs out after logging in', async () => {
      await testApiHandler({
        handler: apiHandler,
        requestPatcher: (req: RequestWithSession) => {
          req.user = mockUser
          req.session = mockSession
        },
        url: '/api/auth/logout',
        test: async ({ fetch }) => {
          const res = await fetch()
          expect(res.status).toBe(200)
          expect(mockedAxios.post).toHaveBeenCalledWith('mock SLO request URL')
          expect(mockSession.destroy).toHaveBeenCalledTimes(1)
        },
      })
    })

    it('logs out even if there is no user', async () => {
      await testApiHandler({
        handler: apiHandler,
        requestPatcher: (req: RequestWithSession) => {
          req.session = mockSession
        },
        url: '/api/auth/logout',
        test: async ({ fetch }) => {
          const res = await fetch()
          expect(res.status).toBe(200)
          expect(mockedAxios.post).not.toHaveBeenCalled()
          expect(mockSession.destroy).toHaveBeenCalledTimes(1)
        },
      })
    })
  })

  describe('GET /api/auth/logout/callback', () => {
    it('handles completion of SAML logout', async () => {
      await testApiHandler({
        handler: apiHandler,
        url: '/api/auth/logout/callback',
        test: async ({ fetch }) => {
          const res = await fetch()
          expect(res.status).toBe(200)
        },
      })
    })
  })
})
