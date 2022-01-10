/**
 * @jest-environment jsdom
 */
import { GetServerSidePropsContext } from 'next'

import { testUser1 } from '../__fixtures__/authUsers'

import { getSession } from './session'
import { requireAuth } from './requireAuth'

jest.mock('./session', () => ({
  getSession: jest.fn(),
}))

const mockedGetSession = getSession as jest.Mock

const redirectResponse = {
  redirect: {
    destination: '/login',
    permanent: false,
  },
}

const invalidCtx = {} as GetServerSidePropsContext
const validCtx = { req: {}, res: {} } as GetServerSidePropsContext

const requireAuthNoCallback = requireAuth()

const requireAuthWithCallback = requireAuth(async () => ({
  props: {
    testProps: 'My test prop',
  },
}))

const requireAuthWithRedirectCallback = requireAuth(async () => ({
  redirect: {
    destination: '/someOtherPage',
    permanent: false,
  },
}))

const requireAuthWithNotFoundCallback = requireAuth(async () => ({
  notFound: true,
}))

const mockUserData = testUser1

describe('requireAuth', () => {
  it('throws an error if called without a req/res', async () => {
    await expect(requireAuthNoCallback(invalidCtx)).rejects.toThrowError()
  })

  it('returns a redirect if it can’t get a session', async () => {
    mockedGetSession.mockImplementationOnce(() => Promise.reject())

    const result = await requireAuthNoCallback(validCtx)
    expect(result).toStrictEqual(redirectResponse)
  })

  it('returns a redirect if the session has no user', async () => {
    mockedGetSession.mockImplementationOnce(() =>
      Promise.resolve({ passport: {} })
    )

    const result = await requireAuthNoCallback(validCtx)
    expect(result).toStrictEqual(redirectResponse)
  })

  it('returns the user if there is one in the session', async () => {
    mockedGetSession.mockImplementationOnce(() =>
      Promise.resolve({ passport: { user: mockUserData } })
    )

    const result = await requireAuthNoCallback(validCtx)
    expect(result).toStrictEqual({
      props: { user: mockUserData },
    })
  })

  describe('when there is a callback', () => {
    it('returns page props and the user if successful', async () => {
      mockedGetSession.mockImplementationOnce(() =>
        Promise.resolve({ passport: { user: mockUserData } })
      )

      const result = await requireAuthWithCallback(validCtx)
      expect(result).toStrictEqual({
        props: { user: mockUserData, testProps: 'My test prop' },
      })
    })

    it('redirects if the callback redirects', async () => {
      mockedGetSession.mockImplementationOnce(() =>
        Promise.resolve({ passport: { user: mockUserData } })
      )

      const result = await requireAuthWithRedirectCallback(validCtx)
      expect(result).toStrictEqual({
        redirect: {
          destination: '/someOtherPage',
          permanent: false,
        },
      })
    })

    it('returns not found if the callback returns not found', async () => {
      mockedGetSession.mockImplementationOnce(() =>
        Promise.resolve({ passport: { user: mockUserData } })
      )

      const result = await requireAuthWithNotFoundCallback(validCtx)
      expect(result).toStrictEqual({
        notFound: true,
      })
    })
  })
})
