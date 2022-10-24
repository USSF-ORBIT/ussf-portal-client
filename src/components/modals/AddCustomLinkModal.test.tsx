/**
 * @jest-environment jsdom
 */

import { screen, RenderResult } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React, { createRef } from 'react'
import { ModalRef } from '@trussworks/react-uswds'
import { axe } from 'jest-axe'
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
    await screen.findByRole('dialog', { name: 'Add a custom link' })
  })

  it('renders the AddCustomLinkModal component', async () => {
    expect(screen.getByRole('heading')).toHaveTextContent('Add a custom link')

    const deleteLinkButton = screen.queryByRole('button', {
      name: 'Delete',
    })
    expect(deleteLinkButton).not.toBeInTheDocument()
  })

  it('can cancel out of the modal', async () => {
    await userEvent.click(screen.getByRole('button', { name: 'Cancel' }))
    expect(testHandlers.onCancel).toHaveBeenCalled()
  })

  it('has no a11y violations', async () => {
    expect(await axe(html.container)).toHaveNoViolations()
  })
})
