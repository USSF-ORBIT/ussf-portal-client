/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

import { EditableCollectionTitle } from './EditableCollectionTitle'

describe('EditableCollectionTitle component', () => {
  it('renders an editable collection title', () => {
    render(
      <EditableCollectionTitle
        collectionId="testCollection123"
        text="Test Collection"
        onSave={jest.fn()}
        onCancel={jest.fn()}
        onDelete={jest.fn()}
        isEditing={false}
      />
    )

    expect(
      screen.getByRole('heading', { level: 3, name: 'Test Collection' })
    ).toBeInTheDocument()
  })

  it('renders a form to edit title if isEditing is true', () => {
    render(
      <EditableCollectionTitle
        collectionId="testCollection123"
        text="Test Collection"
        onSave={jest.fn()}
        onCancel={jest.fn()}
        onDelete={jest.fn()}
        isEditing={true}
      />
    )
    expect(
      screen.getByRole('textbox', { name: 'Collection Title' })
    ).toBeInTheDocument()

    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()

    expect(
      screen.getByRole('button', { name: 'Save name' })
    ).toBeInTheDocument()
  })
})

it('saves the form', async () => {
  const mockHandleOnSave = jest.fn()
  render(
    <EditableCollectionTitle
      collectionId="testCollection123"
      text="Test Collection"
      onSave={mockHandleOnSave}
      onCancel={jest.fn()}
      onDelete={jest.fn()}
      isEditing={true}
    />
  )
  const input = screen.getByRole('textbox', { name: 'Collection Title' })
  userEvent.type(input, 'New Title')

  const saveNameButton = screen.getByRole('button', { name: 'Save name' })
  userEvent.click(saveNameButton)
  // #TODO "errors" when clicking submit on form; expected behavior by jsdom
  // <<Error: Not implemented: HTMLFormElement.prototype.submit>>
  // Should I ignore the error?
  expect(mockHandleOnSave).toBeCalledTimes(1)
})

it('cancels the form', () => {
  const mockHandleOnCancel = jest.fn()
  render(
    <EditableCollectionTitle
      collectionId="testCollection123"
      text="Test Collection"
      onSave={jest.fn()}
      onCancel={mockHandleOnCancel}
      onDelete={jest.fn()}
      isEditing={true}
    />
  )
  const cancelButton = screen.getByRole('button', { name: 'Cancel' })
  userEvent.click(cancelButton)
  expect(mockHandleOnCancel).toBeCalledTimes(1)
})
