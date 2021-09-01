/**
 * @jest-environment jsdom
 */
import React, { useEffect } from 'react'
import { render } from '@testing-library/react'
import { BetaContextProvider, useBetaContext } from './betaContext'

jest.mock('next/dist/client/router', () => ({
  __esModule: true,
  useRouter: () => ({
    query: {},
    pathname: '/',
    asPath: '/',
    events: {
      emit: jest.fn(),
      on: jest.fn(),
      off: jest.fn(),
    },
    push: jest.fn(() => Promise.resolve(true)),
    prefetch: jest.fn(() => Promise.resolve(true)),
    replace: jest.fn(() => Promise.resolve(true)),
  }),
}))
describe('beta context', () => {
  it('expects betaOptIn to be false by default', () => {
    const TestComponent = () => {
      const { betaOptIn } = useBetaContext()

      const status = betaOptIn.toString()
      return <h1>Default beta status is {status}</h1>
    }

    const { getByRole } = render(
      <BetaContextProvider>
        <TestComponent />
      </BetaContextProvider>
    )

    expect(getByRole('heading')).toHaveTextContent(
      'Default beta status is false'
    )
  })
  it('expects join beta to work', () => {
    const TestComponent = () => {
      const { betaOptIn, joinBeta } = useBetaContext()
      useEffect(() => {
        joinBeta()
      })
      const status = betaOptIn.toString()
      return <h1>Default beta status is {status}</h1>
    }

    const { getByRole } = render(
      <BetaContextProvider>
        <TestComponent />
      </BetaContextProvider>
    )

    expect(getByRole('heading')).toHaveTextContent(
      'Default beta status is true'
    )
  })

  it('expects leave beta to work', () => {
    const TestComponent = () => {
      const { betaOptIn, leaveBeta } = useBetaContext()
      useEffect(() => {
        leaveBeta()
      })
      const status = betaOptIn.toString()
      return <h1>Default beta status is {status}</h1>
    }

    const { getByRole } = render(
      <BetaContextProvider>
        <TestComponent />
      </BetaContextProvider>
    )

    expect(getByRole('heading')).toHaveTextContent(
      'Default beta status is false'
    )
  })
})
