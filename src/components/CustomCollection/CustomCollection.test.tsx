/**
 * @jest-environment jsdom
 */

import { render, screen, within } from '@testing-library/react'
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

  let scrollSpy: jest.Mock

  beforeAll(() => {
    scrollSpy = jest.fn()
    window.HTMLElement.prototype.scrollIntoView = scrollSpy
  })

  beforeEach(() => {
    scrollSpy.mockReset()
  })

  it('renders the collection with delete buttons', () => {
    render(
      <CustomCollection
        {...exampleCollection}
        handleRemoveBookmark={jest.fn()}
        handleAddBookmark={jest.fn()}
        handleRemoveCollection={jest.fn()}
        handleEditCollection={jest.fn()}
      />
    )
    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Edit collection title' })
    ).toHaveTextContent(exampleCollection.title)
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
        handleEditCollection={jest.fn()}
      />
    )

    const toggleFormButton = screen.getByRole('button', { name: '+ Add link' })
    expect(toggleFormButton).toBeInTheDocument()

    userEvent.click(toggleFormButton)
    const urlInput = screen.getByLabelText('URL')
    expect(urlInput).toBeInTheDocument()
    expect(urlInput).toBeInvalid()

    /*
    // TODO - add URL validation back
    userEvent.type(urlInput, 'example')
    expect(urlInput).toBeInvalid()
    userEvent.type(urlInput, 'http://www.example.com')
    expect(urlInput).toBeValid()
    */
  })

  it('entering a new custom URL opens the modal', () => {
    const mockAddLink = jest.fn()

    renderWithModalRoot(
      <CustomCollection
        {...exampleCollection}
        handleRemoveBookmark={jest.fn()}
        handleAddBookmark={mockAddLink}
        handleRemoveCollection={jest.fn()}
        handleEditCollection={jest.fn()}
      />
    )

    const toggleFormButton = screen.getByRole('button', { name: '+ Add link' })
    userEvent.click(toggleFormButton)
    const urlInput = screen.getByLabelText('URL')
    userEvent.type(urlInput, 'http://www.example.com')
    userEvent.click(
      screen.getByRole('option', { name: 'http://www.example.com' })
    )
    userEvent.click(screen.getByRole('button', { name: 'Add site' }))

    // Open modal
    expect(screen.getByRole('dialog', addLinkDialog)).toHaveClass('is-visible')

    const labelInput = screen.getByLabelText('Label')
    expect(labelInput).toBeInvalid()
    userEvent.type(labelInput, 'My Custom Link')
    expect(labelInput).toBeValid()

    userEvent.click(screen.getByRole('button', { name: 'Save link name' }))

    expect(mockAddLink).toHaveBeenCalledWith(
      'http://www.example.com',
      'My Custom Link'
    )
  })

  it('canceling from the modal resets the form', () => {
    const mockAddLink = jest.fn()

    renderWithModalRoot(
      <CustomCollection
        {...exampleCollection}
        handleRemoveBookmark={jest.fn()}
        handleAddBookmark={mockAddLink}
        handleRemoveCollection={jest.fn()}
        handleEditCollection={jest.fn()}
      />
    )

    const toggleFormButton = screen.getByRole('button', { name: '+ Add link' })
    userEvent.click(toggleFormButton)
    const urlInput = screen.getByLabelText('URL')
    userEvent.type(urlInput, 'http://www.example.com')
    userEvent.click(
      screen.getByRole('option', { name: 'http://www.example.com' })
    )
    userEvent.click(screen.getByRole('button', { name: 'Add site' }))

    // Open modal
    const addLinkModal = screen.getByRole('dialog', addLinkDialog)
    expect(addLinkModal).toHaveClass('is-visible')
    const cancelButton = within(addLinkModal).getByRole('button', {
      name: 'Cancel',
    })
    userEvent.click(cancelButton)

    expect(addLinkModal).not.toHaveClass('is-visible')

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
        handleEditCollection={jest.fn()}
      />
    )

    userEvent.click(screen.getByRole('button', { name: '+ Add link' }))
    userEvent.type(screen.getByLabelText('URL'), 'http://www.example.com')
    userEvent.click(
      screen.getByRole('option', { name: 'http://www.example.com' })
    )
    userEvent.click(screen.getByRole('button', { name: 'Add site' }))

    // Open modal
    expect(screen.getByRole('dialog', addLinkDialog)).toHaveClass('is-visible')

    const labelInput = screen.getByLabelText('Label')
    expect(labelInput).toBeInvalid()
    userEvent.type(labelInput, 'My Custom Link')
    expect(labelInput).toBeValid()

    userEvent.click(screen.getByRole('button', { name: 'Save link name' }))
    expect(mockAddLink).toHaveBeenCalledWith(
      'http://www.example.com',
      'My Custom Link'
    )

    expect(mockAddLink).toHaveBeenCalledTimes(1)

    // Modal closed
    expect(screen.queryByRole('dialog', addLinkDialog)).toHaveClass('is-hidden')
    userEvent.click(screen.getByRole('button', { name: '+ Add link' }))

    // Modal is still closed, form is reset
    expect(screen.queryByRole('dialog', addLinkDialog)).toHaveClass('is-hidden')
    expect(screen.getByLabelText('URL')).toBeInvalid()
    userEvent.type(screen.getByLabelText('URL'), 'http://www.example.com')
    userEvent.click(
      screen.getByRole('option', { name: 'http://www.example.com' })
    )
    userEvent.click(screen.getByRole('button', { name: 'Add site' }))
    expect(screen.getByRole('dialog', addLinkDialog)).toHaveClass('is-visible')

    expect(screen.getByLabelText('Label')).toBeInvalid()
    userEvent.type(screen.getByLabelText('Label'), 'Another Custom Link')
    userEvent.click(screen.getByRole('button', { name: 'Save link name' }))
    expect(mockAddLink).toHaveBeenCalledWith(
      'http://www.example.com',
      'Another Custom Link'
    )

    expect(mockAddLink).toHaveBeenCalledTimes(2)
  })

  it('can add an existing link', () => {
    const mockAddLink = jest.fn()

    const mockLinks = [
      {
        id: 'testBookmark1',
        url: 'http://www.example.com/1',
        label: 'Test Bookmark 1',
      },
      {
        id: 'testBookmark2',
        url: 'http://www.example.com/2',
        label: 'Test Bookmark 2',
      },
      {
        id: 'testBookmark3',
        url: 'http://www.example.com/3',
        label: 'Test Bookmark 3',
      },
    ]

    renderWithModalRoot(
      <CustomCollection
        {...exampleCollection}
        bookmarkOptions={mockLinks}
        handleRemoveBookmark={jest.fn()}
        handleAddBookmark={mockAddLink}
        handleRemoveCollection={jest.fn()}
        handleEditCollection={jest.fn()}
      />
    )

    const toggleFormButton = screen.getByRole('button', { name: '+ Add link' })
    userEvent.click(toggleFormButton)
    const urlInput = screen.getByLabelText('URL')
    userEvent.click(urlInput)
    userEvent.click(screen.getByRole('option', { name: 'Test Bookmark 2' }))
    userEvent.click(screen.getByRole('button', { name: 'Add site' }))

    expect(mockAddLink).toHaveBeenCalledWith(
      'http://www.example.com/2',
      'Test Bookmark 2'
    )
  })

  it('renders the settings dropdown menu', () => {
    render(
      <CustomCollection
        {...exampleCollection}
        handleRemoveBookmark={jest.fn()}
        handleAddBookmark={jest.fn()}
        handleRemoveCollection={jest.fn()}
        handleEditCollection={jest.fn()}
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
        handleEditCollection={jest.fn()}
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
        handleEditCollection={jest.fn()}
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
    const removeCollectionModal = screen.getByRole(
      'dialog',
      removeCollectionDialog
    )
    expect(removeCollectionModal).toHaveClass('is-visible')
    const cancelButton = within(removeCollectionModal).getByRole('button', {
      name: 'Cancel',
    })
    userEvent.click(cancelButton)

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
        handleEditCollection={jest.fn()}
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
        handleEditCollection={jest.fn()}
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
    const outsideEl = screen.getByRole('button', {
      name: 'Edit collection title',
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
        handleEditCollection={jest.fn()}
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

  describe('an empty collection', () => {
    it('renders a focused input for the title', () => {
      render(
        <CustomCollection
          id="testCollection"
          handleRemoveBookmark={jest.fn()}
          handleAddBookmark={jest.fn()}
          handleRemoveCollection={jest.fn()}
          handleEditCollection={jest.fn()}
        />
      )

      expect(screen.getByRole('textbox')).toHaveFocus()
    })

    it('can enter a title', () => {
      const mockEditCollection = jest.fn()

      render(
        <CustomCollection
          id="testCollection"
          handleRemoveBookmark={jest.fn()}
          handleAddBookmark={jest.fn()}
          handleRemoveCollection={jest.fn()}
          handleEditCollection={mockEditCollection}
        />
      )

      userEvent.type(screen.getByRole('textbox'), 'My New Collection{enter}')
      expect(mockEditCollection).toHaveBeenCalledWith('My New Collection')
    })

    it('not entering a title deletes the collection', () => {
      const mockDeleteCollection = jest.fn()

      render(
        <CustomCollection
          id="testCollection"
          handleRemoveBookmark={jest.fn()}
          handleAddBookmark={jest.fn()}
          handleRemoveCollection={mockDeleteCollection}
          handleEditCollection={jest.fn()}
        />
      )

      userEvent.keyboard('{enter}')
      expect(mockDeleteCollection).toHaveBeenCalled()
    })
  })
})
