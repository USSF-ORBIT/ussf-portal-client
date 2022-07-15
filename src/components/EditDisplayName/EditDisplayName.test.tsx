/**
 * @jest-environment jsdom
 */

import { fireEvent, render, screen } from '@testing-library/react'

import React from 'react'

import EditDisplayName from './EditDisplayName'

describe('EditDisplayName component', () => {
  const mockHandlers = {
    handleEditDisplayName: jest.fn(),
  }

  beforeEach(() => {
    render(
      <EditDisplayName
        userDisplayName="Test Name"
        handleEditDisplayName={mockHandlers.handleEditDisplayName}
      />
    )
  })

  it('renders the component', async () => {
    expect(await screen.getAllByText('Update name and rank:')).toHaveLength(1)

    expect(
      await screen.getAllByText('Current welcome display title:')
    ).toHaveLength(1)

    expect(await screen.getAllByText('Update name')).toHaveLength(1)

    const inputField = screen.getByTestId('nameInput')
    fireEvent.change(inputField, { target: { value: 'Test Name' } })
    expect(inputField).toHaveValue('Test Name')
  })
})
