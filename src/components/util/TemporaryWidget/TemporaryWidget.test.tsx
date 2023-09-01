/**
 * @jest-environment jsdom
 */
import { act, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { renderWithMySpaceAndModalContext } from '../../../testHelpers'
import TemporaryWidget from './TemporaryWidget'

describe('TemporaryWidget', () => {
  test('renders the TemporaryWidget component for Weather', async () => {
    await act(async () => {
      renderWithMySpaceAndModalContext(<TemporaryWidget />, {
        temporaryWidget: 'Weather',
      })
    })

    await waitFor(() => {
      expect(screen.getByText('Weather')).toBeInTheDocument()
      expect(
        screen.getByText('Search by five-digit ZIP code (US only)')
      ).toBeInTheDocument()
    })
  })
})
