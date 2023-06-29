/**
 * @jest-environment jsdom
 */

import { fireEvent, screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { renderWithAuth } from '../../testHelpers'
import EditDisplayName from './EditDisplayName'

describe('EditDisplayName component', () => {
  const mockHandlers = {
    handleEditDisplayName: jest.fn(),
  }

  describe('Without auth', () => {
    beforeEach(() => {
      render(
        <EditDisplayName
          userDisplayName="Test Name"
          handleEditDisplayName={mockHandlers.handleEditDisplayName}
        />
      )
    })

    test('returns null if no user is present when trying to update', async () => {
      const textInput = screen.getAllByTestId('nameInput')[0]
      fireEvent.change(textInput, { target: { value: 'My New Name' } })
      expect(textInput).toHaveValue('My New Name')

      const saveButton = screen.getAllByTestId('saveButton')[0]
      fireEvent.click(saveButton)
      expect(mockHandlers.handleEditDisplayName).not.toBeCalled()
    })
  })
  describe('With auth', () => {
    test('renders the component', async () => {
      renderWithAuth(
        <EditDisplayName
          userDisplayName="Test Name"
          handleEditDisplayName={mockHandlers.handleEditDisplayName}
        />
      )

      expect(screen.getAllByText('Update name and rank:')).toHaveLength(1)

      expect(
        screen.getAllByText('Current welcome display title:')
      ).toHaveLength(1)

      expect(screen.getAllByText('Update name')).toHaveLength(1)

      const inputField = screen.getByTestId('nameInput')
      fireEvent.change(inputField, { target: { value: 'Test Name' } })
      expect(inputField).toHaveValue('Test Name')
    })

    test('saves a new display name', async () => {
      const user = userEvent.setup()

      renderWithAuth(
        <EditDisplayName
          userDisplayName="Test Name"
          handleEditDisplayName={mockHandlers.handleEditDisplayName}
        />
      )

      const textInput = screen.getAllByTestId('nameInput')[0]
      fireEvent.change(textInput, { target: { value: 'My New Name' } })

      expect(textInput).toHaveValue('My New Name')
      expect(textInput).toHaveAttribute('value', 'My New Name')

      const saveButton = screen.getAllByTestId('saveButton')[0]
      await user.click(saveButton)

      expect(mockHandlers.handleEditDisplayName).toHaveBeenCalled()
    })

    test('resets display name when clicking cancel', async () => {
      const user = userEvent.setup()

      renderWithAuth(
        <EditDisplayName
          userDisplayName="Test Name"
          handleEditDisplayName={mockHandlers.handleEditDisplayName}
        />
      )

      const textInput = screen.getAllByTestId('nameInput')[0]
      fireEvent.change(textInput, { target: { value: 'My New Name' } })

      expect(textInput).toHaveValue('My New Name')
      expect(textInput).toHaveAttribute('value', 'My New Name')

      const cancelButton = screen.getByRole('button', { name: 'Cancel' })

      await user.click(cancelButton)

      expect(textInput).toHaveAttribute('value', '')
    })

    test('renders Welcome! if no userDisplayname is provided', () => {
      renderWithAuth(
        <EditDisplayName
          userDisplayName=""
          handleEditDisplayName={mockHandlers.handleEditDisplayName}
        />
      )

      expect(screen.getByText('Welcome!')).toBeInTheDocument()
    })
  })
})
