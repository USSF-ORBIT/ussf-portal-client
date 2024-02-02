/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import React from 'react'
import { GuardianDirectoryTable } from './GuardianDirectoryTable'

describe('GuardianDirectoryTable component', () => {
  test('renders the table', () => {
    render(
      <GuardianDirectoryTable
        headers={['header1', 'header2']}
        rows={[{ header1: 'value1', header2: 'value2' }]}
        keys={['header1', 'header2']}
      />
    )

    expect(screen.getByText('header1')).toBeInTheDocument()
    expect(screen.getByText('header2')).toBeInTheDocument()
    expect(screen.getByText('value1')).toBeInTheDocument()
    expect(screen.getByText('value2')).toBeInTheDocument()
  })

  test('renders the no results banner with no rows', async () => {
    const { container } = render(
      <GuardianDirectoryTable
        headers={['header1', 'header2']}
        rows={[]}
        keys={['header1', 'header2']}
      />
    )

    expect(screen.queryByText('header1')).not.toBeInTheDocument()
    expect(screen.queryByText('header2')).not.toBeInTheDocument()
    expect(screen.queryAllByRole('img')).toHaveLength(2)
    expect(
      screen.queryByText('There are no results that match that query.')
    ).toBeInTheDocument()
    expect(
      await axe(container, {
        rules: {
          'image-alt': { enabled: false },
        },
      })
    ).toHaveNoViolations()
  })
})
