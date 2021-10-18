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
        text="Test Collection"
        placeholder="Add Collection Title"
        onSave={jest.fn()}
      />
    )

    expect(
      screen.getByRole('button', { name: 'Test Collection' })
    ).toBeInTheDocument()
  })

  it('renders a placeholder title if no title is passed', () => {
    render(
      <EditableCollectionTitle
        text=""
        placeholder="Add Collection Title"
        onSave={jest.fn()}
      />
    )

    expect(
      screen.getByRole('button', { name: 'Add Collection Title' })
    ).toBeInTheDocument()
  })

  it('renders an input when button is clicked', () => {
    render(
      <EditableCollectionTitle
        text="Test Collection"
        placeholder="Add Collection Title"
        onSave={jest.fn()}
      />
    )
    const editTitle = screen.getByRole('button')
    userEvent.click(editTitle)
    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
  })

  it('calls save function on enter', () => {
    const handleOnSave = jest.fn()
    render(
      <EditableCollectionTitle
        text="Test Collection"
        placeholder="Add Collection Title"
        onSave={handleOnSave}
      />
    )
    const editTitle = screen.getByRole('button')
    userEvent.click(editTitle)
    const input = screen.getByRole('textbox')
    userEvent.click(input)
    userEvent.type(input, 'Updated Title {enter}')
    expect(handleOnSave).toHaveBeenCalled()
  })

  it('calls save function on esc', () => {
    const handleOnSave = jest.fn()
    render(
      <EditableCollectionTitle
        text="Test Collection"
        placeholder="Add Collection Title"
        onSave={handleOnSave}
      />
    )
    const editTitle = screen.getByRole('button')
    userEvent.click(editTitle)
    const input = screen.getByRole('textbox')
    userEvent.click(input)
    userEvent.type(input, 'Updated Title {esc}')
    expect(handleOnSave).toHaveBeenCalled()
  })

  it('calls save function on tab', () => {
    const handleOnSave = jest.fn()
    render(
      <EditableCollectionTitle
        text="Test Collection"
        placeholder="Add Collection Title"
        onSave={handleOnSave}
      />
    )
    const editTitle = screen.getByRole('button')
    userEvent.click(editTitle)
    const input = screen.getByRole('textbox')
    userEvent.click(input)
    userEvent.type(input, 'Updated Title')
    userEvent.tab()
    expect(handleOnSave).toHaveBeenCalled()
  })
})
