/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen } from '@testing-library/react'

import Footer from './Footer'

describe('Footer component', () => {
  beforeEach(() => {
    render(<Footer />)
  })

  it.each([
    ['Vandenberg', 'https://www.vandenberg.spaceforce.mil/'],
    ['Los Angeles', 'https://www.losangeles.spaceforce.mil/'],
    ['Peterson', 'https://www.peterson.spaceforce.mil/'],
    ['Buckley', 'https://www.buckley.spaceforce.mil/'],
    ['Schriever', 'https://www.schriever.spaceforce.mil/'],
    ['Patrick', 'https://www.patrick.spaceforce.mil/'],
    ['SpOC', 'https://www.spoc.spaceforce.mil/'],
    [
      'SMC',
      'https://www.afspc.af.mil/About-Us/Fact-Sheets/Display/Article/1012587/space-and-missile-systems-center/',
    ],
    [
      'Space RCO',
      'https://www.kirtland.af.mil/Units/Space-Rapid-Capabilities-Office/',
    ],
    ['AFRL', 'https://afresearchlab.com/technology/space-vehicles/'],
    ['Facebook', 'https://www.facebook.com/USSpaceForceDoD/'],
    ['Twitter', 'https://twitter.com/SpaceForceDoD'],
    ['LinkedIn', 'https://www.linkedin.com/company/united-states-space-force'],
  ])('renders the link to %s', (label, url) => {
    const link = screen.getByRole('link', { name: label })
    expect(link).toBeInstanceOf(HTMLAnchorElement)
    expect(link).toHaveAttribute('href', url)
  })

  it('renders the Space Force logo', () => {
    expect(screen.getByAltText('United States Space Force')).toBeInTheDocument()
  })
})
