/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
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
})
