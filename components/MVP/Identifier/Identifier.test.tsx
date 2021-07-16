/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen } from '@testing-library/react'

import Identifier from './Identifier'

describe('Identifier component', () => {
  beforeEach(() => {
    render(<Identifier />)
  })

  it.each([
    ['Space Force', 'https://www.spaceforce.mil/'],
    [
      'Accessibility Support',
      'https://dodcio.defense.gov/DoDSection508/Std_Stmt/',
    ],
    [
      'Budget and Performance',
      'https://comptroller.defense.gov/Budget-Materials/',
    ],
    ['FOIA Requests', 'https://www.foia.af.mil/'],
    ['No FEAR Act Data', 'https://www.af.mil/Equal-Opportunity/'],
    ['Office of the Inspector General', 'https://www.dodig.mil/'],
    [
      'Sexual Assault Prevention and Response',
      'https://www.resilience.af.mil/SAPR/',
    ],
    ['USA.gov', 'https://www.usa.gov/'],
  ])('renders the link to %s', (label, url) => {
    const link = screen.getByRole('link', { name: label })
    expect(link).toBeInstanceOf(HTMLAnchorElement)
    expect(link).toHaveAttribute('href', url)
  })
})
