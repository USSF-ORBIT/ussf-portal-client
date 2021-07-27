/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'

import TrainingAndEducation from 'pages/training-and-education/index'

describe('Training and Education page', () => {
  beforeEach(() => {
    render(<TrainingAndEducation />)
  })

  it('renders the page title', () => {
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Learn and Grow'
    )
  })

  it('renders the force multiplier announcement card', () => {
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      'Start your journey in digital fluency with our Force Multiplier program.'
    )
  })

  it.each([['Digital Fluency', 'Other Training']])(
    'renders the %s section',
    (header) => {
      expect(screen.getByRole('heading', { name: header })).toBeInTheDocument()
    }
  )

  it.each([
    [
      'Digital University Force Multiplier Program',
      '/training-and-education/force-multiplier-program',
    ],
    ['Digital Innovation from Space CAMP', 'https://spacecamp.il2.dsop.io/'],
    ['Defense Acquisition University', 'https://www.dau.edu/'],
    ['National Security Space Institute', 'https://www2.peterson.af.mil/nssi/'],
  ])('renders the link to %s', (label, url) => {
    const link = screen.getByRole('link', { name: label })
    expect(link).toBeInstanceOf(HTMLAnchorElement)
    expect(link).toHaveAttribute('href', url)
  })
})
