/**
 * @jest-environment jsdom
 */

import { screen } from '@testing-library/react'
import { ModalRef } from '@trussworks/react-uswds'
import React, { createRef } from 'react'
import userEvent from '@testing-library/user-event'
import { renderWithModalRoot } from '../../testHelpers'

import RemoveSectionModal from 'components/modals/RemoveSectionModal'

describe('RemoveSectionModal', () => {
  const mockOnDelete = jest.fn()
  const mockOnCancel = jest.fn()

  beforeEach(() => {
    const modalRef = createRef<ModalRef>()
    renderWithModalRoot(
      <RemoveSectionModal
        modalRef={modalRef}
        onDelete={mockOnDelete}
        onCancel={mockOnCancel}
      />
    )
  })

  it('renders and fires delete button on click', async () => {
    const user = userEvent.setup()

    expect(screen.getByRole('heading')).toHaveTextContent(
      'Are you sure you’d like to delete this section?'
    )

    const deleteButton = screen.getByRole('button', { name: 'Delete' })

    expect(deleteButton).toBeInTheDocument()

    await user.click(deleteButton)
    expect(mockOnDelete).toHaveBeenCalled()
  })

  it('renders and fires cancel button on click', async () => {
    const user = userEvent.setup()
    const cancelButton = screen.getByRole('button', { name: 'Cancel' })

    expect(cancelButton).toBeInTheDocument()

    await user.click(cancelButton)
    expect(mockOnCancel).toHaveBeenCalled()
  })
})
