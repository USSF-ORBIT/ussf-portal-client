/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import React from 'react'
import { Tag, Label, Category } from './Tag'
import { CONTENT_CATEGORIES } from 'constants/index'

describe('Tag component', () => {
  test('renders the tag with no a11y violations', async () => {
    const { container } = render(<Tag>my tag</Tag>)

    expect(screen.queryByText('my tag')).toBeInTheDocument()
    expect(screen.queryByText('my tag')).toHaveClass('usa-tag')
    expect(await axe(container)).toHaveNoViolations()
  })
})

describe('Label component', () => {
  test('renders the label', async () => {
    render(<Label type="Audience">All Guardians</Label>)

    expect(screen.queryByText('All Guardians')).toBeInTheDocument()
    expect(screen.queryByText('All Guardians')).toHaveClass('usa-tag')
  })
})

describe('Category component', () => {
  test('renders the category with no a11y violations', async () => {
    const { container } = render(
      <Category category={CONTENT_CATEGORIES.ANNOUNCEMENT} />
    )

    expect(screen.queryByText('Announcement')).toBeInTheDocument()
    expect(screen.queryByText('Announcement')).toHaveClass('usa-tag')
    expect(await axe(container)).toHaveNoViolations()
  })
})
