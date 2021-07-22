/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen } from '@testing-library/react'

import ContentListGroup from './ContentListGroup'

describe('Content List Group component', () => {
  beforeEach(() => {
    render(
      <ContentListGroup heading="List Title">
        <div className="test-child">Test Content</div>
      </ContentListGroup>
    )
  })

  it('renders the h2', () => {
    expect(
      screen.getByRole('heading', { name: 'List Title' })
    ).toBeInTheDocument()
  })
  it('renders the children', () => {
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })
})
