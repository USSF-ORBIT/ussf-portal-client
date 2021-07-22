/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen } from '@testing-library/react'
import ContentListGroup from '../ContentListGroup/ContentListGroup'
import ContentListItem from './ContentListItem'

describe('Content List Item component', () => {
  beforeEach(() => {
    render(
      <ContentListGroup>
        <ContentListItem heading="Item Title" path="/about">
          Lorem ipsum
        </ContentListItem>
      </ContentListGroup>
    )
  })

  it('renders the h3', () => {
    expect(
      screen.getByRole('heading', { name: 'Item Title' })
    ).toBeInTheDocument()
  })

  it('renders the path', () => {
    const link = screen.getByRole('link')

    expect(link).toBeInstanceOf(HTMLAnchorElement)
    expect(link).toHaveAttribute('href', '/about')
  })

  it('renders the children', () => {
    expect(screen.getByText('Lorem ipsum')).toBeInstanceOf(HTMLParagraphElement)
  })
})
