/**
 * @jest-environment jsdom
 */

import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

import { renderWithModalRoot } from '../../testHelpers'

import AddCustomLinkModal from './AddCustomLinkModal'

describe('AddCustomLinkModal', () => {
  const mockOnSave = jest.fn()
  const mockOnCancel = jest.fn()

  beforeEach(() => {
    renderWithModalRoot(
      <AddCustomLinkModal
        isOpen={true}
        closeModal={mockOnCancel}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    )
  })

  it('renders a form to add a link label', () => {
    expect(screen.getByRole('heading')).toHaveTextContent(
      'We don’t recognize that link'
    )

    const labelInput = screen.getByLabelText('Label')
    expect(labelInput).toBeInvalid()
    userEvent.type(labelInput, 'My Custom Link')
    expect(labelInput).toBeValid()

    userEvent.click(screen.getByRole('button', { name: 'Save link name' }))
    expect(mockOnSave).toHaveBeenCalled()
  })

  it('can cancel out of the modal', () => {
    userEvent.click(screen.getByRole('button', { name: 'Cancel' }))
    expect(mockOnCancel).toHaveBeenCalled()
  })
})
