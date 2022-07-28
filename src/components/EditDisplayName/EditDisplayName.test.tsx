/**
 * @jest-environment jsdom
 */

import { fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { renderWithAuth } from '../../testHelpers'
import EditDisplayName from './EditDisplayName'

describe('EditDisplayName component', () => {
  const mockHandlers = {
    handleEditDisplayName: jest.fn(),
  }

  beforeEach(() => {
    renderWithAuth(
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

  it('saves a new display name', () => {
    const textInput = screen.getAllByTestId('nameInput')[0]
    fireEvent.change(textInput, { target: { value: 'My New Name' } })

    expect(textInput).toHaveValue('My New Name')
    expect(textInput).toHaveAttribute('value', 'My New Name')

    const saveButton = screen.getAllByTestId('saveButton')[0]
    userEvent.click(saveButton)

    expect(mockHandlers.handleEditDisplayName).toHaveBeenCalled()
  })
})
