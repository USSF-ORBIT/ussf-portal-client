/**
 * @jest-environment jsdom
 */
import { screen } from '@testing-library/react'

import { renderWithAuth } from '../../../testHelpers'

import Accomplishments from 'pages/about-us/accomplishments'

describe('Accomplishments page', () => {
  beforeEach(() => {
    renderWithAuth(<Accomplishments />)
  })

  it('renders the page title', () => {
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Things we’re proud of'
    )
  })

  it.each([
    [
      'October 20, 2020',
      'June, 2020',
      'March 26, 2020',
      'December 20th, 2019',
      'February 19, 2019',
    ],
  ])('renders the %s item', (header) => {
    expect(screen.getByRole('heading', { name: header })).toBeInTheDocument()
  })
})
