/**
 * @jest-environment jsdom
 */

import { act, screen, render } from '@testing-library/react'
import type { RenderResult } from '@testing-library/react'
import React from 'react'
import { axe } from 'jest-axe'
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

  describe('when logged in', () => {
    beforeEach(() => {
      html = render(<PersonalData userDisplayName="BERNADETTE CAMPBELL" />)
    })

    test('renders the greeting with a name', () => {
      const greeting = screen.getByRole('heading', { level: 2 })
      expect(greeting).toHaveTextContent('Welcome, BERNADETTE CAMPBELL')
    })

    test('renders the Edit name link', async () => {
      const editNameButton = await screen.findByTestId('editName')
      expect(editNameButton).toBeVisible()
    })

    test('has no a11y violations', async () => {
      // Bug with NextJS Link + axe :(
      // https://github.com/nickcolley/jest-axe/issues/95#issuecomment-758921334
      await act(async () => {
        expect(await axe(html.container)).toHaveNoViolations()
      })
    })
  })
})
