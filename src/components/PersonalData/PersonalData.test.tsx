/**
 * @jest-environment jsdom
 */

import { screen, render } from '@testing-library/react'
import type { RenderResult } from '@testing-library/react'
import React from 'react'
import { axe } from 'jest-axe'
import { MockedProvider } from '@apollo/client/testing'
import { renderWithAuth } from '../../testHelpers'
import { getDisplayNameMock } from '../../__fixtures__/operations/getDisplayName'
import PersonalData from './PersonalData'

describe('Personal Data component', () => {
  let html: RenderResult

  it('renders the greeting without a name', () => {
    html = render(
      <MockedProvider>
        <PersonalData />
      </MockedProvider>
    )
    const greeting = screen.getByRole('heading', { level: 2 })
    expect(greeting).toHaveTextContent('Welcome!')
  })

  describe('when logged in', () => {
    beforeEach(() => {
      html = renderWithAuth(
        <MockedProvider mocks={getDisplayNameMock}>
          <PersonalData />
        </MockedProvider>
      )
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
      expect(await axe(html.container)).toHaveNoViolations()
    })
  })
})
