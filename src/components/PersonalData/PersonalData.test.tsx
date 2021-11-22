/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import type { RenderResult } from '@testing-library/react'
import React from 'react'
import { axe } from 'jest-axe'
import PersonalData from './PersonalData'

describe('Personal Data Placeholder', () => {
  let html: RenderResult
  beforeEach(() => {
    html = render(<PersonalData name="Michael Hall" />)
  })

  it('renders the Greeting', () => {
    const greeting = screen.getByRole('heading', { level: 2 })
    expect(greeting).toHaveTextContent('Welcome, Sgt Snuffy')
  })

  it('renders the list of key/value pairs', () => {
    expect(screen.getAllByRole('definition')).toHaveLength(4)
  })

  it('has no a11y violations', async () => {
    expect(await axe(html.container)).toHaveNoViolations()
  })
})
