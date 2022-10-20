/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { ObjectId } from 'mongodb'

import { EditableCollectionTitle } from './EditableCollectionTitle'

describe('EditableCollectionTitle component', () => {
  it('renders an editable collection title', () => {
    render(
      <EditableCollectionTitle
        collectionId={ObjectId()}
        text="Test Collection"
        onSave={jest.fn()}
        onCancel={jest.fn()}
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
        collectionId={ObjectId()}
        text="Test Collection"
        onSave={jest.fn()}
        onCancel={jest.fn()}
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
      collectionId={ObjectId()}
      text="Test Collection"
      onSave={mockHandleOnSave}
      onCancel={jest.fn()}
      isEditing={true}
    />
  )
  const input = screen.getByRole('textbox', { name: 'Collection Title' })
  await userEvent.clear(input)
  await userEvent.type(input, 'New Title')

  const saveNameButton = screen.getByRole('button', { name: 'Save name' })
  await userEvent.click(saveNameButton)
  expect(mockHandleOnSave).toBeCalledWith('New Title')
})

it('cancels the form', async () => {
  const mockHandleOnCancel = jest.fn()
  render(
    <EditableCollectionTitle
      collectionId={ObjectId()}
      text="Test Collection"
      onSave={jest.fn()}
      onCancel={mockHandleOnCancel}
      isEditing={true}
    />
  )
  const cancelButton = screen.getByRole('button', { name: 'Cancel' })
  await userEvent.click(cancelButton)
  expect(mockHandleOnCancel).toBeCalledTimes(1)
})
