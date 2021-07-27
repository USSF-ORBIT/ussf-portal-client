/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'

import ForceMultiplierProgram from 'pages/training-and-education/force-multiplier-program'

describe('Force Multiplier Program page', () => {
  beforeEach(() => {
    render(<ForceMultiplierProgram />)
  })

  it('renders the page title', () => {
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Become Digitally Fluent'
    )
  })

  it.each([
    [
      'Introduction to Modern Infrastructure',
      'Digital Product Development',
      'Data Science and Artificial Intelligence',
      'Cybersecurity in the DOD',
    ],
  ])('renders the %s item', (header) => {
    expect(
      screen.getByRole('heading', { name: header, level: 2 })
    ).toBeInTheDocument()
  })

  it.each([
    ['Register', 'http://digitalu.udemy.com'],
    ['digitalu.udemy.com', 'http://digitalu.udemy.com'],
    ['digitalu@us.af.mil', 'mailto:digitalu@us.af.mil'],
    ['ufbsupport@udemy.com', 'mailto:ufbsupport@udemy.com'],
  ])('renders the link to %s', (label, url) => {
    const link = screen.getByRole('link', { name: label })
    expect(link).toBeInstanceOf(HTMLAnchorElement)
    expect(link).toHaveAttribute('href', url)
  })
})
