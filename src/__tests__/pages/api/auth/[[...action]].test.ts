import { testApiHandler } from 'next-test-api-route-handler'
import handler from 'pages/api/auth/[[...action]]'

describe('API / Auth handlers', () => {
  describe('GET /api/auth/login', () => {
    it('initiates SAML authentication', async () => {
      await testApiHandler({
        handler,
        url: '/api/auth/login',
        test: async ({ fetch }) => {
          const res = await fetch()
          expect(res.status).toBe(200)
        },
      })
    })
  })

  describe('POST /api/auth/login', () => {
    it('handles completion of SAML authentication', async () => {
      await testApiHandler({
        handler,
        url: '/api/auth/login',
        test: async ({ fetch }) => {
          const res = await fetch({ method: 'POST' })
          expect(res.status).toBe(200)
        },
      })
    })
  })

  describe('GET /api/auth/logout', () => {
    it('initiates SAML logout', async () => {
      await testApiHandler({
        handler,
        url: '/api/auth/logout',
        test: async ({ fetch }) => {
          const res = await fetch()
          expect(res.status).toBe(200)
        },
      })
    })
  })

  describe('GET /api/auth/logout/callback', () => {
    it('handles completion of SAML logout', async () => {
      await testApiHandler({
        handler,
        url: '/api/auth/logout/callback',
        test: async ({ fetch }) => {
          const res = await fetch()
          expect(res.status).toBe(200)
        },
      })
    })
  })
})
