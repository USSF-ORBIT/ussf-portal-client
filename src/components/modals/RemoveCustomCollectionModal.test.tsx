/**
 * @jest-environment jsdom
 */

import { screen } from '@testing-library/react'
import { ModalRef } from '@trussworks/react-uswds'
import React, { createRef } from 'react'
import userEvent from '@testing-library/user-event'
import { renderWithModalRoot } from '../../testHelpers'
import RemoveCustomCollectionModal from 'components/modals/RemoveCustomCollectionModal'

describe('RemoveCustomCollectionModal', () => {
  const mockOnDelete = jest.fn()
  const mockOnCancel = jest.fn()

  beforeEach(() => {
    const modalRef = createRef<ModalRef>()
    renderWithModalRoot(
      <RemoveCustomCollectionModal
        modalRef={modalRef}
        onDelete={mockOnDelete}
        onCancel={mockOnCancel}
      />
    )
  })

  it('renders and fires delete button on click', () => {
    expect(screen.getByRole('heading')).toHaveTextContent(
      'Are you sure you’d like to delete this collection from My Space?'
    )

    const deleteButton = screen.getByRole('button', { name: 'Delete' })

    expect(deleteButton).toBeInTheDocument()

    userEvent.click(deleteButton)
    expect(mockOnDelete).toHaveBeenCalled()
  })

  it('renders and fires cancel button on click', () => {
    const cancelButton = screen.getByRole('button', { name: 'Cancel' })

    expect(cancelButton).toBeInTheDocument()

    userEvent.click(cancelButton)
    expect(mockOnCancel).toHaveBeenCalled()
  })
})
