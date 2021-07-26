/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import Home from 'pages/index'

describe('Home page', () => {
  beforeEach(() => {
    render(<Home />)
  })

  it('renders the Covid Alert', () => {
    expect(
      screen.getByRole('region', { name: 'Site alert' })
    ).toBeInTheDocument()
  })

  it('renders the Quick Links', () => {
    expect(
      screen.getByRole('heading', {
        name: 'Quick Links',
        level: 2,
      })
    ).toBeInTheDocument()
  })

  it('renders the Announcement Cards', () => {
    expect(
      screen.getByRole('link', {
        name: 'Physical fitness assessments will resume July 1st 2021 news',
      })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('link', {
        name: "Video from the Chief of Space Operations's latest townhall news",
      })
    ).toBeInTheDocument()
  })
  it('renders the Manage Your Life section', () => {
    expect(
      screen.getByRole('heading', {
        name: 'Manage Your Life',
        level: 2,
      })
    ).toBeInTheDocument()
  })

  it('renders the Work Tools section', () => {
    expect(
      screen.getByRole('heading', {
        name: 'Work Tools',
        level: 2,
      })
    ).toBeInTheDocument()
  })

  it('renders the Learn and Grow section', () => {
    expect(
      screen.getByRole('heading', {
        name: 'Learn and Grow',
        level: 2,
      })
    ).toBeInTheDocument()
  })

  it('renders the Service Portals section', () => {
    expect(
      screen.getByRole('heading', {
        name: 'Service portals',
        level: 2,
      })
    ).toBeInTheDocument()
  })
})
