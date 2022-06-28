/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import React from 'react'

import Pagination from './Pagination'

describe('Pagination component', () => {
  const generateTestPages = (length: number) =>
    Array.from({ length }).map((item, i) => `#page-${i + 1}`)

  const testPages = generateTestPages(24)
  const testThreePages = generateTestPages(3)
  const testSevenPages = generateTestPages(7)

  it('renders pagination for a list of pages', () => {
    render(<Pagination pages={testPages} currentPage={10} />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()

    expect(screen.getByLabelText('Previous page')).toHaveAttribute(
      'href',
      '/#page-9'
    )
    expect(screen.getByLabelText('Page 1')).toHaveAttribute('href', '/#page-1')
    expect(screen.getByLabelText('Page 9')).toHaveAttribute('href', '/#page-9')
    expect(screen.getByLabelText('Page 10')).toHaveAttribute(
      'href',
      '/#page-10'
    )
    expect(screen.getByLabelText('Page 10')).toHaveAttribute(
      'aria-current',
      'page'
    )
    expect(screen.getByLabelText('Page 11')).toHaveAttribute(
      'href',
      '/#page-11'
    )
    expect(screen.getByLabelText('Page 24')).toHaveAttribute(
      'href',
      '/#page-24'
    )
    expect(screen.getByLabelText('Next page')).toHaveAttribute(
      'href',
      '/#page-11'
    )
  })

  it('only renders the maximum number of slots', () => {
    render(<Pagination pages={testPages} currentPage={10} />)
    expect(screen.getAllByRole('listitem')).toHaveLength(7) // overflow slots don't count
  })

  it('renders pagination when the first page is current', () => {
    render(<Pagination pages={testPages} currentPage={1} />)
    expect(screen.queryByLabelText('Previous page')).not.toBeInTheDocument()
    expect(screen.queryByLabelText('Next page')).toBeInTheDocument()
    expect(screen.getByLabelText('Page 1')).toHaveAttribute(
      'aria-current',
      'page'
    )
  })

  it('renders pagination when the last page is current', () => {
    render(<Pagination pages={testPages} currentPage={24} />)
    expect(screen.queryByLabelText('Previous page')).toBeInTheDocument()
    expect(screen.queryByLabelText('Next page')).not.toBeInTheDocument()
    expect(screen.getByLabelText('Page 24')).toHaveAttribute(
      'aria-current',
      'page'
    )
  })

  it('renders overflow at the beginning and end when current page is in the middle', () => {
    render(<Pagination pages={testPages} currentPage={10} />)
    expect(screen.getByLabelText('Previous page')).toHaveAttribute(
      'href',
      '/#page-9'
    )
    expect(screen.getByLabelText('Page 1')).toHaveAttribute('href', '/#page-1')
    expect(screen.getByLabelText('Page 9')).toHaveAttribute('href', '/#page-9')
    expect(screen.getByLabelText('Page 10')).toHaveAttribute(
      'href',
      '/#page-10'
    )
    expect(screen.getByLabelText('Page 10')).toHaveAttribute(
      'aria-current',
      'page'
    )
    expect(screen.getByLabelText('Page 11')).toHaveAttribute(
      'href',
      '/#page-11'
    )
    expect(screen.getByLabelText('Page 24')).toHaveAttribute(
      'href',
      '/#page-24'
    )
    expect(screen.getByLabelText('Next page')).toHaveAttribute(
      'href',
      '/#page-11'
    )
    expect(screen.getAllByText('…')).toHaveLength(2)
  })

  it('renders overflow at the end when at the beginning of the pages', () => {
    render(<Pagination pages={testPages} currentPage={3} />)

    expect(screen.getByLabelText('Previous page')).toHaveAttribute(
      'href',
      '/#page-2'
    )
    expect(screen.getByLabelText('Page 1')).toHaveAttribute('href', '/#page-1')
    expect(screen.getByLabelText('Page 2')).toHaveAttribute('href', '/#page-2')
    expect(screen.getByLabelText('Page 3')).toHaveAttribute('href', '/#page-3')
    expect(screen.getByLabelText('Page 3')).toHaveAttribute(
      'aria-current',
      'page'
    )
    expect(screen.getByLabelText('Page 4')).toHaveAttribute('href', '/#page-4')
    expect(screen.getByLabelText('Page 5')).toHaveAttribute('href', '/#page-5')
    expect(screen.getByLabelText('Page 24')).toHaveAttribute(
      'href',
      '/#page-24'
    )
    expect(screen.getByLabelText('Next page')).toHaveAttribute(
      'href',
      '/#page-4'
    )
    expect(screen.getAllByText('…')).toHaveLength(1)
  })

  it('renders overflow at the beginning when at the end of the pages', () => {
    render(<Pagination pages={testPages} currentPage={21} />)

    expect(screen.getByLabelText('Previous page')).toHaveAttribute(
      'href',
      '/#page-20'
    )
    expect(screen.getByLabelText('Page 1')).toHaveAttribute('href', '/#page-1')
    expect(screen.getByLabelText('Page 20')).toHaveAttribute(
      'href',
      '/#page-20'
    )
    expect(screen.getByLabelText('Page 21')).toHaveAttribute(
      'href',
      '/#page-21'
    )
    expect(screen.getByLabelText('Page 21')).toHaveAttribute(
      'aria-current',
      'page'
    )
    expect(screen.getByLabelText('Page 22')).toHaveAttribute(
      'href',
      '/#page-22'
    )
    expect(screen.getByLabelText('Page 23')).toHaveAttribute(
      'href',
      '/#page-23'
    )
    expect(screen.getByLabelText('Page 24')).toHaveAttribute(
      'href',
      '/#page-24'
    )
    expect(screen.getByLabelText('Next page')).toHaveAttribute(
      'href',
      '/#page-22'
    )
    expect(screen.getAllByText('…')).toHaveLength(1)
  })

  describe('for fewer pages than the max slots', () => {
    it('renders pagination with no overflow', () => {
      render(<Pagination pages={testThreePages} currentPage={2} />)
      expect(screen.getAllByRole('listitem')).toHaveLength(5)
      expect(screen.queryAllByText('…')).toHaveLength(0)
    })

    it('renders pagination with no overflow', () => {
      render(<Pagination pages={testSevenPages} currentPage={4} />)
      expect(screen.getAllByRole('listitem')).toHaveLength(9)
      expect(screen.queryAllByText('…')).toHaveLength(0)
    })
  })

  describe('with a custom slot number passed in', () => {
    it('only renders the maximum number of slots', () => {
      render(<Pagination pages={testPages} currentPage={10} maxSlots={10} />)
      expect(screen.getAllByRole('listitem')).toHaveLength(10)
    })
  })
})
