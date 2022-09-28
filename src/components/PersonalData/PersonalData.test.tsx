/**
 * @jest-environment jsdom
 */

import { act, screen } from '@testing-library/react'
import type { RenderResult } from '@testing-library/react'
import React from 'react'
import axios from 'axios'
import { axe } from 'jest-axe'
import { renderWithAuthAndApollo } from '../../testHelpers'
import { getDisplayNameMock } from '../../__fixtures__/operations/getDisplayName'
import PersonalData from './PersonalData'

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    route: '',
    pathname: '',
    replace: jest.fn(),
  }),
}))

jest.mock('axios')

describe('Personal Data component', () => {
  let html: RenderResult

  it('renders the greeting without a name', () => {
    renderWithAuthAndApollo(<PersonalData />, { user: null })
    const greeting = screen.getByRole('heading', { level: 2 })
    expect(greeting).toHaveTextContent('Welcome!')
  })

  describe('when logged in', () => {
    beforeEach(() => {
      html = renderWithAuthAndApollo(<PersonalData />, {}, getDisplayNameMock)
    })

    it('renders the greeting with a name', () => {
      const greeting = screen.getByRole('heading', { level: 2 })
      expect(greeting).toHaveTextContent('Welcome, BERNADETTE CAMPBELL')
    })

    it('renders the Edit name link', async () => {
      const editNameButton = await screen.findByTestId('editName')
      expect(editNameButton).toBeVisible()
    })

    it('has no a11y violations', async () => {
      // Bug with NextJS Link + axe :(
      // https://github.com/nickcolley/jest-axe/issues/95#issuecomment-758921334
      await act(async () => {
        expect(await axe(html.container)).toHaveNoViolations()
      })
    })

    it('makes the call to get user', () => {
      expect(axios.get).toHaveBeenLastCalledWith('/api/auth/user')
    })
  })
})
