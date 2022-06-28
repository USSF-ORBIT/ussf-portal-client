/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import React from 'react'

import Pagination from './Pagination'

describe('Pagination component', () => {
  const testPages = Array.from({ length: 25 }).map(() => '#')

  it('renders pagination for a list of pages', () => {
    render(<Pagination pages={testPages} currentPage={10} />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('only renders the maximum number of slots', () => {
    render(<Pagination pages={testPages} currentPage={10} />)
    expect(screen.getByRole('listitem')).toHaveLength(7)
  })
})
