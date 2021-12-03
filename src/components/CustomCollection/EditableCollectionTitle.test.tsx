/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from '@testing-library/react'
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
        onDelete={jest.fn()}
      />
    )

    expect(
      screen.getByRole('button', {
        name: 'Edit Test Collection collection title',
      })
    ).toBeInTheDocument()
  })

  it('renders in edit mode if no title is passed in', () => {
    render(
      <EditableCollectionTitle
        collectionId="testCollection123"
        text=""
        onSave={jest.fn()}
        onDelete={jest.fn()}
      />
    )

    expect(screen.getByLabelText('Collection Title')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveFocus()
  })

  it('renders a textarea when edit button is clicked', () => {
    render(
      <EditableCollectionTitle
        collectionId="testCollection123"
        text="Test Collection"
        onSave={jest.fn()}
        onDelete={jest.fn()}
      />
    )
    const editTitle = screen.getByRole('button', {
      name: 'Edit Test Collection collection title',
    })

    userEvent.click(editTitle)
    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()

    expect(
      screen.queryByRole('button', {
        name: 'Edit Test Collection collection title',
      })
    ).not.toBeInTheDocument()
  })

  it('enters edit mode when the title is focused by pressing enter', () => {
    render(
      <EditableCollectionTitle
        collectionId="testCollection123"
        text="Test Collection"
        onSave={jest.fn()}
        onDelete={jest.fn()}
      />
    )
    const editTitle = screen.getByRole('button', {
      name: 'Edit Test Collection collection title',
    })
    userEvent.tab()
    expect(editTitle).toHaveFocus()
    userEvent.keyboard('{enter}')
    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
    expect(
      screen.queryByRole('button', {
        name: 'Edit  Test Collection collection title',
      })
    ).not.toBeInTheDocument()
  })

  describe('saving a new value', () => {
    it('saves on blur', () => {
      const handleOnSave = jest.fn()
      render(
        <EditableCollectionTitle
          collectionId="testCollection123"
          text="Test Collection"
          onSave={handleOnSave}
          onDelete={jest.fn()}
        />
      )
      const editTitle = screen.getByRole('button', {
        name: 'Edit Test Collection collection title',
      })
      userEvent.click(editTitle)
      const input = screen.getByRole('textbox')
      userEvent.click(input)
      userEvent.type(input, 'Updated Title')
      fireEvent.blur(input)
      expect(handleOnSave).toHaveBeenCalled()
      expect(
        screen.getByRole('button', {
          name: 'Edit Updated Title collection title',
        })
      ).toHaveTextContent('Updated Title')
    })

    it('saves on enter', () => {
      const handleOnSave = jest.fn()
      render(
        <EditableCollectionTitle
          collectionId="testCollection123"
          text="Test Collection"
          onSave={handleOnSave}
          onDelete={jest.fn()}
        />
      )
      const editTitle = screen.getByRole('button', {
        name: 'Edit Test Collection collection title',
      })
      userEvent.click(editTitle)
      const input = screen.getByRole('textbox')
      userEvent.click(input)
      userEvent.type(input, 'Updated Title{enter}')
      expect(handleOnSave).toHaveBeenCalled()
      expect(
        screen.getByRole('button', {
          name: 'Edit Updated Title collection title',
        })
      ).toHaveTextContent('Updated Title')
    })

    it('saves on esc', () => {
      const handleOnSave = jest.fn()
      render(
        <EditableCollectionTitle
          collectionId="testCollection123"
          text="Test Collection"
          onSave={handleOnSave}
          onDelete={jest.fn()}
        />
      )
      const editTitle = screen.getByRole('button', {
        name: 'Edit Test Collection collection title',
      })
      userEvent.click(editTitle)
      const input = screen.getByRole('textbox')
      userEvent.click(input)
      userEvent.type(input, 'Updated Title{esc}')
      expect(handleOnSave).toHaveBeenCalled()
      expect(
        screen.getByRole('button', {
          name: 'Edit Updated Title collection title',
        })
      ).toHaveTextContent('Updated Title')
    })

    it('saves on tab', () => {
      const handleOnSave = jest.fn()
      render(
        <EditableCollectionTitle
          collectionId="testCollection123"
          text="Test Collection"
          onSave={handleOnSave}
          onDelete={jest.fn()}
        />
      )
      const editTitle = screen.getByRole('button', {
        name: 'Edit Test Collection collection title',
      })
      userEvent.click(editTitle)
      const input = screen.getByRole('textbox')
      userEvent.click(input)
      userEvent.type(input, 'Updated Title')
      userEvent.tab()
      expect(handleOnSave).toHaveBeenCalled()
      expect(
        screen.getByRole('button', {
          name: 'Edit Updated Title collection title',
        })
      ).toHaveTextContent('Updated Title')
    })
  })

  it('reverts back to the previous value if the input is cleared', () => {
    const handleOnSave = jest.fn()

    render(
      <EditableCollectionTitle
        collectionId="testCollection123"
        text="Test Collection"
        onSave={handleOnSave}
        onDelete={jest.fn()}
      />
    )
    const editTitle = screen.getByRole('button', {
      name: 'Edit Test Collection collection title',
    })
    userEvent.click(editTitle)
    const input = screen.getByRole('textbox')
    userEvent.click(input)
    userEvent.clear(input)
    fireEvent.blur(input)
    expect(handleOnSave).not.toHaveBeenCalled()
    expect(
      screen.getByRole('button', {
        name: 'Edit Test Collection collection title',
      })
    ).toHaveTextContent('Test Collection')
  })

  it('deletes the collection if the input is left empty and there is no existing value', () => {
    const handleOnSave = jest.fn()
    const handleOnDelete = jest.fn()

    render(
      <EditableCollectionTitle
        collectionId="testCollection123"
        text=""
        onSave={handleOnSave}
        onDelete={handleOnDelete}
      />
    )

    const input = screen.getByRole('textbox')
    userEvent.click(input)
    fireEvent.blur(input)
    expect(handleOnDelete).toHaveBeenCalled()
    expect(handleOnSave).not.toHaveBeenCalled()
  })
})
