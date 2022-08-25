/**
 * @jest-environment jsdom
 */

import { screen, RenderResult } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React, { createRef } from 'react'
import { ModalRef } from '@trussworks/react-uswds'
import { renderWithModalRoot } from '../../testHelpers'
import AddCustomLinkModal from './AddCustomLinkModal'

describe('AddCustomLinkModal', () => {
  const testHandlers = {
    onSave: jest.fn(),
    onCancel: jest.fn(),
  }

  let html: RenderResult
  beforeEach(async () => {
    const modalRef = createRef<ModalRef>()

    html = renderWithModalRoot(
      <AddCustomLinkModal
        modalRef={modalRef}
        onSave={testHandlers.onSave}
        onCancel={testHandlers.onCancel}
      />
    )
    await screen.findByText('Add a custom link')
  })

  it('renders the AddCustomLinkModal component', async () => {
    expect(await screen.findByText('Add a custom link')).toBeInTheDocument()
  })

  it('can cancel out of the modal', () => {
    userEvent.click(screen.getByRole('button', { name: 'Cancel' }))
    expect(testHandlers.onCancel).toHaveBeenCalled()
  })
})
