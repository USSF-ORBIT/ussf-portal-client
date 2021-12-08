/**
 * @jest-environment jsdom
 */

import { screen } from '@testing-library/react'
import type { RenderResult } from '@testing-library/react'
import React from 'react'
import { axe } from 'jest-axe'

import { renderWithAuth } from '../../testHelpers'

import PersonalData from './PersonalData'

describe('Personal Data Placeholder', () => {
  let html: RenderResult

  beforeEach(() => {
    html = renderWithAuth(<PersonalData />)
  })

  it('renders the greeting with the name prop', () => {
    const greeting = screen.getByRole('heading', { level: 2 })
    expect(greeting).toHaveTextContent('Welcome, MICHAEL HALL')
  })

  it('renders the list of key/value pairs', () => {
    expect(screen.getAllByRole('definition')).toHaveLength(4)
  })

  it('has no a11y violations', async () => {
    expect(await axe(html.container)).toHaveNoViolations()
  })
})
