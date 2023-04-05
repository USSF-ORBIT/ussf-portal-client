/**
 * @jest-environment jsdom
 */

import { screen, act } from '@testing-library/react'
import type { RenderResult } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import { axe } from 'jest-axe'

import { renderWithAuth } from '../../testHelpers'

import Settings from 'pages/settings'

describe('Settings page', () => {
  describe('when logged in', () => {
    let html: RenderResult

    beforeEach(() => {
      html = renderWithAuth(
        <MockedProvider>
          <Settings />
        </MockedProvider>
      )
    })

    it('renders the settings page', () => {
      expect(screen.getAllByText('Settings')).toHaveLength(1)

      expect(screen.getAllByText('Update name and rank:')).toHaveLength(1)
    })

    it('has no a11y violations', async () => {
      // Bug with NextJS Link + axe :(
      // https://github.com/nickcolley/jest-axe/issues/95#issuecomment-758921334
      await act(async () => {
        expect(await axe(html.container)).toHaveNoViolations()
      })
    })
  })
})
