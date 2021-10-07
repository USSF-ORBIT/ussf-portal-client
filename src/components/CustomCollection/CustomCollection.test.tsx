/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { v4 } from 'uuid'

import { renderWithModalRoot } from '../../testHelpers'

import CustomCollection from './CustomCollection'

const exampleCollection = {
  id: v4(),
  title: 'Example Collection',
  bookmarks: [
    {
      id: v4(),
      url: 'https://google.com',
      label: 'Webmail',
      description: 'Lorem ipsum',
    },
    {
      id: v4(),
      url: 'https://mypay.dfas.mil/#/',
      label: 'MyPay',
      description: 'Lorem ipsum',
    },
    {
      id: v4(),
      url: 'https://afpcsecure.us.af.mil/PKI/MainMenu1.aspx',
      label: 'vMPF',
      description: 'Lorem ipsum',
    },
  ],
}

describe('CustomCollection component', () => {
  const addLinkDialog = {
    name: 'We don’t recognize that link',
  }

  const removeCollectionDialog = {
    name: 'Are you sure you’d like to delete this collection from My Space?',
  }

  it('renders the collection with delete buttons', () => {
    render(
      <CustomCollection
        {...exampleCollection}
        handleRemoveBookmark={jest.fn()}
        handleAddBookmark={jest.fn()}
        handleRemoveCollection={jest.fn()}
      />
    )
    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      exampleCollection.title
    )
    expect(screen.getAllByRole('listitem')).toHaveLength(
      exampleCollection.bookmarks.length
    )
    expect(screen.getAllByRole('link')).toHaveLength(
      exampleCollection.bookmarks.length
    )
    expect(
      screen.getAllByRole('button', { name: 'Remove this bookmark' })
    ).toHaveLength(exampleCollection.bookmarks.length)
  })

  it('renders an Add Link toggleable form', () => {
    render(
      <CustomCollection
        {...exampleCollection}
        handleRemoveBookmark={jest.fn()}
        handleAddBookmark={jest.fn()}
        handleRemoveCollection={jest.fn()}
      />
    )

    const toggleFormButton = screen.getByRole('button', { name: '+ Add link' })
    expect(toggleFormButton).toBeInTheDocument()

    userEvent.click(toggleFormButton)
    const urlInput = screen.getByLabelText('URL')
    expect(urlInput).toBeInTheDocument()
    expect(urlInput).toBeInvalid()

    userEvent.type(urlInput, 'example')
    expect(urlInput).toBeInvalid()
    userEvent.type(urlInput, 'http://www.example.com')
    expect(urlInput).toBeValid()
  })

  it('entering a new link opens the modal', () => {
    const mockAddLink = jest.fn()

    renderWithModalRoot(
      <CustomCollection
        {...exampleCollection}
        handleRemoveBookmark={jest.fn()}
        handleAddBookmark={mockAddLink}
        handleRemoveCollection={jest.fn()}
      />
    )

    const toggleFormButton = screen.getByRole('button', { name: '+ Add link' })
    userEvent.click(toggleFormButton)
    const urlInput = screen.getByLabelText('URL')
    userEvent.type(urlInput, 'http://www.example.com')
    userEvent.click(screen.getByRole('button', { name: 'Add site' }))

    // Open modal
    expect(screen.getByRole('dialog', addLinkDialog)).toHaveClass('is-visible')

    const labelInput = screen.getByLabelText('Label')
    expect(labelInput).toBeInvalid()
    userEvent.type(labelInput, 'My Custom Link')
    expect(labelInput).toBeValid()

    userEvent.click(screen.getByRole('button', { name: 'Save link name' }))

    expect(mockAddLink).toHaveBeenCalled()
  })

  it('canceling from the modal resets the form', () => {
    const mockAddLink = jest.fn()

    renderWithModalRoot(
      <CustomCollection
        {...exampleCollection}
        handleRemoveBookmark={jest.fn()}
        handleAddBookmark={mockAddLink}
        handleRemoveCollection={jest.fn()}
      />
    )

    const toggleFormButton = screen.getByRole('button', { name: '+ Add link' })
    userEvent.click(toggleFormButton)
    const urlInput = screen.getByLabelText('URL')
    userEvent.type(urlInput, 'http://www.example.com')
    userEvent.click(screen.getByRole('button', { name: 'Add site' }))

    // Open modal
    expect(screen.getByRole('dialog', addLinkDialog)).toHaveClass('is-visible')
    userEvent.click(screen.getByRole('button', { name: 'Cancel' }))

    expect(screen.getByRole('dialog', addLinkDialog)).not.toHaveClass(
      'is-visible'
    )

    expect(mockAddLink).not.toHaveBeenCalled()

    expect(
      screen.getByRole('button', {
        name: '+ Add link',
      })
    ).toBeInTheDocument()

    expect(screen.queryByLabelText('URL')).not.toBeInTheDocument()
  })
  it('adding a link closes the modal and resets the form', () => {
    const mockAddLink = jest.fn()

    renderWithModalRoot(
      <CustomCollection
        {...exampleCollection}
        handleRemoveBookmark={jest.fn()}
        handleAddBookmark={mockAddLink}
        handleRemoveCollection={jest.fn()}
      />
    )

    userEvent.click(screen.getByRole('button', { name: '+ Add link' }))
    userEvent.type(screen.getByLabelText('URL'), 'http://www.example.com')
    userEvent.click(screen.getByRole('button', { name: 'Add site' }))

    // Open modal
    expect(screen.getByRole('dialog', addLinkDialog)).toHaveClass('is-visible')

    const labelInput = screen.getByLabelText('Label')
    expect(labelInput).toBeInvalid()
    userEvent.type(labelInput, 'My Custom Link')
    expect(labelInput).toBeValid()

    userEvent.click(screen.getByRole('button', { name: 'Save link name' }))
    expect(mockAddLink).toHaveBeenCalledTimes(1)

    // Modal closed
    expect(screen.queryByRole('dialog', addLinkDialog)).toHaveClass('is-hidden')
    userEvent.click(screen.getByRole('button', { name: '+ Add link' }))

    // Modal is still closed, form is reset
    expect(screen.queryByRole('dialog', addLinkDialog)).toHaveClass('is-hidden')
    expect(screen.getByLabelText('URL')).toBeInvalid()
    userEvent.type(screen.getByLabelText('URL'), 'http://www.example.com')
    userEvent.click(screen.getByRole('button', { name: 'Add site' }))
    expect(screen.getByRole('dialog', addLinkDialog)).toHaveClass('is-visible')

    expect(screen.getByLabelText('Label')).toBeInvalid()
    userEvent.type(screen.getByLabelText('Label'), 'Another Custom Link')
    userEvent.click(screen.getByRole('button', { name: 'Save link name' }))
    expect(mockAddLink).toHaveBeenCalledTimes(2)
  })

  it('renders the settings dropdown menu', () => {
    render(
      <CustomCollection
        {...exampleCollection}
        handleRemoveBookmark={jest.fn()}
        handleAddBookmark={jest.fn()}
        handleRemoveCollection={jest.fn()}
      />
    )
    const menuToggleButton = screen.getByRole('button', {
      name: 'Collection Settings',
    })
    expect(menuToggleButton).toBeInTheDocument()

    userEvent.click(menuToggleButton)
    const menuItem = screen.getByRole('button', { name: 'Delete Collection' })
    expect(menuItem).toBeInTheDocument()
  })

  it('clicking the delete collection button opens the delete modal', () => {
    const mockRemoveCollection = jest.fn()

    renderWithModalRoot(
      <CustomCollection
        {...exampleCollection}
        handleRemoveBookmark={jest.fn()}
        handleAddBookmark={jest.fn()}
        handleRemoveCollection={mockRemoveCollection}
      />
    )

    const menuToggleButton = screen.getByRole('button', {
      name: 'Collection Settings',
    })
    expect(menuToggleButton).toBeInTheDocument()

    userEvent.click(menuToggleButton)
    const deleteCollection = screen.getByRole('button', {
      name: 'Delete Collection',
    })
    expect(deleteCollection).toBeInTheDocument()
    userEvent.click(deleteCollection)

    // Open modal
    expect(screen.getByRole('dialog', removeCollectionDialog)).toHaveClass(
      'is-visible'
    )
  })

  it('clicking the cancel button in the modal closes the delete modal', () => {
    const mockRemoveCollection = jest.fn()

    renderWithModalRoot(
      <CustomCollection
        {...exampleCollection}
        handleRemoveBookmark={jest.fn()}
        handleAddBookmark={jest.fn()}
        handleRemoveCollection={mockRemoveCollection}
      />
    )

    const menuToggleButton = screen.getByRole('button', {
      name: 'Collection Settings',
    })

    userEvent.click(menuToggleButton)

    const deleteCollection = screen.getByRole('button', {
      name: 'Delete Collection',
    })
    userEvent.click(deleteCollection)

    // Open modal
    expect(screen.getByRole('dialog', removeCollectionDialog)).toHaveClass(
      'is-visible'
    )

    userEvent.click(screen.getByTestId('cancel-removeCollectionModal'))
    expect(mockRemoveCollection).toHaveBeenCalledTimes(0)

    expect(screen.queryByRole('dialog', removeCollectionDialog)).toHaveClass(
      'is-hidden'
    )
  })

  it('clicking the delete button in the modal closes the modal', () => {
    const mockRemoveCollection = jest.fn()

    renderWithModalRoot(
      <CustomCollection
        {...exampleCollection}
        handleRemoveBookmark={jest.fn()}
        handleAddBookmark={jest.fn()}
        handleRemoveCollection={mockRemoveCollection}
      />
    )
    expect(screen.queryByRole('dialog', removeCollectionDialog)).toHaveClass(
      'is-hidden'
    )
    const menuToggleButton = screen.getByRole('button', {
      name: 'Collection Settings',
    })

    userEvent.click(menuToggleButton)

    const deleteCollection = screen.getByRole('button', {
      name: 'Delete Collection',
    })
    userEvent.click(deleteCollection)

    // Open modal
    expect(screen.getByRole('dialog', removeCollectionDialog)).toHaveClass(
      'is-visible'
    )

    userEvent.click(screen.getByRole('button', { name: 'Delete' }))
    expect(mockRemoveCollection).toHaveBeenCalledTimes(1)

    expect(screen.queryByRole('dialog', removeCollectionDialog)).toHaveClass(
      'is-hidden'
    )
  })

  it('clicking outside the dropdown menu closes the menu', () => {
    const mockRemoveCollection = jest.fn()

    renderWithModalRoot(
      <CustomCollection
        {...exampleCollection}
        handleRemoveBookmark={jest.fn()}
        handleAddBookmark={jest.fn()}
        handleRemoveCollection={mockRemoveCollection}
      />
    )

    const menuToggleButton = screen.getByRole('button', {
      name: 'Collection Settings',
    })
    // Open the menu
    userEvent.click(menuToggleButton)

    const deleteCollection = screen.getByRole('button', {
      name: 'Delete Collection',
    })

    expect(deleteCollection).toBeInTheDocument()
    expect(menuToggleButton).toBeInTheDocument()

    // Click outside menu
    const outsideEl = screen.getByRole('heading', {
      name: 'Example Collection',
    })
    userEvent.click(outsideEl)

    // Confirm the menu has been closed
    expect(deleteCollection).not.toBeInTheDocument()
  })

  it('clicking the menu button toggles the menu', () => {
    const mockRemoveCollection = jest.fn()

    renderWithModalRoot(
      <CustomCollection
        {...exampleCollection}
        handleRemoveBookmark={jest.fn()}
        handleAddBookmark={jest.fn()}
        handleRemoveCollection={mockRemoveCollection}
      />
    )

    const menuToggleButton = screen.getByRole('button', {
      name: 'Collection Settings',
    })
    // Open the menu
    userEvent.click(menuToggleButton)

    const deleteCollection = screen.getByRole('button', {
      name: 'Delete Collection',
    })

    expect(deleteCollection).toBeInTheDocument()
    expect(menuToggleButton).toBeInTheDocument()

    // Close the menu
    userEvent.click(menuToggleButton)

    // Confirm the menu has been closed
    expect(deleteCollection).not.toBeInTheDocument()
  })
})
