/**
 * @jest-environment jsdom
 */

import { render, screen, within, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ObjectId } from 'mongodb'
import React from 'react'

import { renderWithModalRoot } from '../../testHelpers'

import CustomCollection from './CustomCollection'

const exampleCollection = {
  _id: ObjectId(),
  title: 'Example Collection',
  bookmarks: [
    {
      _id: ObjectId(),
      url: 'https://google.com',
      label: 'Webmail',
      cmsId: 'cmsId1',
    },
    {
      _id: ObjectId(),
      url: 'https://mypay.dfas.mil/#/',
      label: 'MyPay',
      cmsId: 'cmsId2',
    },
    {
      _id: ObjectId(),
      url: 'https://afpcsecure.us.af.mil/PKI/MainMenu1.aspx',
      label: 'vMPF',
      cmsId: 'cmsId3',
    },
    {
      _id: ObjectId(),
      url: 'https://example.com',
      label: 'My Custom Link',
    },
  ],
}

const exampleCollectionWithNine = {
  _id: ObjectId(),
  title: 'Example Collection',
  bookmarks: [
    {
      _id: ObjectId(),
      url: 'https://google.com',
      label: 'Webmail',
      cmsId: 'cmsId1',
    },
    {
      _id: ObjectId(),
      url: 'https://mypay.dfas.mil/#/',
      label: 'MyPay',
      cmsId: 'cmsId2',
    },
    {
      _id: ObjectId(),
      url: 'https://afpcsecure.us.af.mil/PKI/MainMenu1.aspx',
      label: 'vMPF',
      cmsId: 'cmsId3',
    },
    {
      _id: ObjectId(),
      url: 'https://example.com',
      label: 'My Custom Link',
    },
    {
      _id: ObjectId(),
      url: 'https://example.com',
      label: 'My Custom Link',
    },
    {
      _id: ObjectId(),
      url: 'https://example.com',
      label: 'My Custom Link',
    },
    {
      _id: ObjectId(),
      url: 'https://example.com',
      label: 'My Custom Link',
    },
    {
      _id: ObjectId(),
      url: 'https://example.com',
      label: 'My Custom Link',
    },
    {
      _id: ObjectId(),
      url: 'https://example.com',
      label: 'My Custom Link',
    },
  ],
}

const exampleCollectionWithTen = {
  _id: ObjectId(),
  title: 'Example Collection',
  bookmarks: [
    {
      _id: ObjectId(),
      url: 'https://google.com',
      label: 'Webmail',
      cmsId: 'cmsId1',
    },
    {
      _id: ObjectId(),
      url: 'https://mypay.dfas.mil/#/',
      label: 'MyPay',
      cmsId: 'cmsId2',
    },
    {
      _id: ObjectId(),
      url: 'https://afpcsecure.us.af.mil/PKI/MainMenu1.aspx',
      label: 'vMPF',
      cmsId: 'cmsId3',
    },
    {
      _id: ObjectId(),
      url: 'https://example.com',
      label: 'My Custom Link',
    },
    {
      _id: ObjectId(),
      url: 'https://example.com',
      label: 'My Custom Link',
    },
    {
      _id: ObjectId(),
      url: 'https://example.com',
      label: 'My Custom Link',
    },
    {
      _id: ObjectId(),
      url: 'https://example.com',
      label: 'My Custom Link',
    },
    {
      _id: ObjectId(),
      url: 'https://example.com',
      label: 'My Custom Link',
    },
    {
      _id: ObjectId(),
      url: 'https://example.com',
      label: 'My Custom Link',
    },
    {
      _id: ObjectId(),
      url: 'https://example.com',
      label: 'My Custom Link',
    },
  ],
}

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
  {
    id: 'cmsId3',
    label: 'vMPF',
    url: 'https://afpcsecure.us.af.mil/',
    __typename: 'Bookmark',
  },
  {
    id: 'cmsId2',
    label: 'MyPay',
    url: 'https://mypay.dfas.mil/#/',
    __typename: 'Bookmark',
  },
  {
    id: 'cmsId1',
    label: 'Webmail',
    url: 'https://webmail.apps.mil/',
    __typename: 'Bookmark',
  },
]

describe('CustomCollection component', () => {
  const addLinkDialog = {
    name: 'Add a custom link',
  }

  const removeCollectionDialog = {
    name: 'Are you sure you’d like to delete this collection from My Space?',
  }

  const mockHandlers = {
    handleRemoveBookmark: jest.fn(),
    handleAddBookmark: jest.fn(),
    handleRemoveCollection: jest.fn(),
    handleEditCollection: jest.fn(),
    handleEditBookmark: jest.fn(),
  }

  let scrollSpy: jest.Mock

  beforeAll(() => {
    scrollSpy = jest.fn()
    window.HTMLElement.prototype.scrollIntoView = scrollSpy
  })

  beforeEach(() => {
    jest.clearAllMocks()
    scrollSpy.mockReset()
  })

  it('renders the collection with DragDropContext', () => {
    const { container } = render(
      <CustomCollection {...exampleCollection} {...mockHandlers} />
    )
    expect(
      container
        .querySelector('div')
        ?.getAttribute('data-rbd-droppable-context-id')
    ).toEqual('0')
  })

  it('drags and drops a link', async () => {
    const mockEditCollection = jest.fn()

    render(
      <CustomCollection
        {...exampleCollection}
        {...mockHandlers}
        handleEditCollection={mockEditCollection}
      />
    )

    // Get drag handles
    const dragHandle = screen.getAllByLabelText('Drag Handle')
    dragHandle[0].focus()
    expect(dragHandle[0]).toHaveFocus()

    // Use keyboard to simulate drag and drop of a link
    userEvent.keyboard('{space}{arrowdown}{space}')

    expect(mockEditCollection).toHaveBeenCalled()
  })

  it('renders the collection with delete or edit buttons', () => {
    render(<CustomCollection {...exampleCollection} {...mockHandlers} />)
    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        level: 3,
      })
    ).toHaveTextContent(exampleCollection.title)

    // Drag and drop library adds a blank <li />, so updated line below to look for length + 1
    expect(screen.getAllByRole('listitem')).toHaveLength(
      exampleCollection.bookmarks.length + 1
    )
    expect(screen.getAllByRole('link')).toHaveLength(
      exampleCollection.bookmarks.length
    )

    expect(
      screen.getAllByRole('button', { name: 'Remove this link' })
    ).toHaveLength(3)
    expect(
      screen.getAllByRole('button', { name: 'Edit this link' })
    ).toHaveLength(1)
  })

  it('renders an Add Link toggleable form', () => {
    render(
      <CustomCollection
        {...exampleCollection}
        {...mockHandlers}
        bookmarkOptions={mockLinks}
      />
    )

    const toggleFormButton = screen.getByRole('button', { name: '+ Add link' })
    expect(toggleFormButton).toBeInTheDocument()
    // why does this not need to be wrapped in act, but others do? makes no sense.
    userEvent.click(toggleFormButton)
    const linkInput = screen.getByLabelText('Select existing link')
    expect(linkInput).toBeInTheDocument()
    expect(linkInput).toBeInvalid()

    userEvent.click(
      screen.getByRole('button', { name: 'Toggle the dropdown list' })
    )
    userEvent.click(screen.getByRole('option', { name: 'Test Bookmark 2' }))
    expect(linkInput).toBeValid()
  })

  it('cancels Add Link action and resets form', () => {
    render(<CustomCollection {...exampleCollection} {...mockHandlers} />)

    userEvent.click(screen.getByRole('button', { name: '+ Add link' }))
    expect(screen.queryByLabelText('Select existing link')).toBeInTheDocument()

    userEvent.click(screen.getByRole('button', { name: 'Cancel' }))
    expect(
      screen.getByRole('button', {
        name: '+ Add link',
      })
    ).toBeInTheDocument()

    expect(
      screen.queryByLabelText('Select existing link')
    ).not.toBeInTheDocument()
  })

  it('can select Add Custom Link and open the Add Custom Link modal', async () => {
    const mockAddLink = jest.fn()

    renderWithModalRoot(
      <CustomCollection
        {...exampleCollection}
        {...mockHandlers}
        bookmarkOptions={mockLinks}
        handleAddBookmark={mockAddLink}
      />
    )

    const toggleFormButton = screen.getByRole('button', { name: '+ Add link' })
    expect(toggleFormButton).toBeInTheDocument()

    userEvent.click(toggleFormButton)
    const linkInput = screen.getByLabelText('Select existing link')
    expect(linkInput).toBeInTheDocument()
    expect(linkInput).toBeInvalid()

    userEvent.click(
      screen.getByRole('button', { name: 'Toggle the dropdown list' })
    )

    userEvent.click(screen.getByRole('option', { name: 'Add custom link' }))

    // Open modal
    const addLinkModal = screen.getByRole('dialog', addLinkDialog)

    expect(addLinkModal).toHaveClass('is-visible')

    const labelInput = within(addLinkModal).getByRole('textbox', {
      name: 'bookmarkLabel',
    })

    const urlInput = within(addLinkModal).getByRole('textbox', {
      name: 'bookmarkUrl',
    })

    userEvent.type(labelInput, 'My Custom Link')
    userEvent.type(urlInput, 'http://www.example.com')

    await act(async () => {
      userEvent.click(
        within(addLinkModal).getByRole('button', { name: 'Save custom link' })
      )
    })

    await act(async () => {
      expect(mockAddLink).toHaveBeenCalledWith(
        'http://www.example.com',
        'My Custom Link'
      )
    })
  })

  it('canceling from the modal resets the form', async () => {
    const mockAddLink = jest.fn()

    renderWithModalRoot(
      <CustomCollection
        {...exampleCollection}
        {...mockHandlers}
        bookmarkOptions={mockLinks}
        handleAddBookmark={mockAddLink}
      />
    )

    const toggleFormButton = screen.getByRole('button', { name: '+ Add link' })
    expect(toggleFormButton).toBeInTheDocument()

    await act(async () => userEvent.click(toggleFormButton))
    screen.getByLabelText('Select existing link')

    userEvent.click(
      screen.getByRole('button', { name: 'Toggle the dropdown list' })
    )

    userEvent.click(screen.getByRole('option', { name: 'Add custom link' }))

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

    expect(
      screen.queryByLabelText('Select existing link')
    ).not.toBeInTheDocument()
  })

  it('adding a link closes the modal and resets the form', async () => {
    const mockAddLink = jest.fn()

    renderWithModalRoot(
      <CustomCollection
        {...exampleCollection}
        {...mockHandlers}
        bookmarkOptions={mockLinks}
        handleAddBookmark={mockAddLink}
      />
    )

    const toggleFormButton = screen.getByRole('button', { name: '+ Add link' })
    expect(toggleFormButton).toBeInTheDocument()

    // Find Add Custom Link in the ComboBox
    userEvent.click(toggleFormButton)
    const linkInput = screen.getByLabelText('Select existing link')
    expect(linkInput).toBeInTheDocument()

    userEvent.click(
      screen.getByRole('button', { name: 'Toggle the dropdown list' })
    )

    userEvent.click(screen.getByRole('option', { name: 'Add custom link' }))

    // Open modal
    const addLinkModal = screen.getByRole('dialog', addLinkDialog)

    expect(addLinkModal).toHaveClass('is-visible')

    const labelInput = within(addLinkModal).getByRole('textbox', {
      name: 'bookmarkLabel',
    })

    const urlInput = within(addLinkModal).getByRole('textbox', {
      name: 'bookmarkUrl',
    })

    userEvent.type(labelInput, 'My Custom Link')
    userEvent.type(urlInput, 'http://www.example.com')

    await act(async () => {
      userEvent.click(
        within(addLinkModal).getByRole('button', { name: 'Save custom link' })
      )
    })

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

    // Find Add Custom Link in the ComboBox
    userEvent.click(toggleFormButton)
    userEvent.click(
      screen.getByRole('button', { name: 'Toggle the dropdown list' })
    )
    userEvent.click(screen.getByRole('option', { name: 'Add custom link' }))

    expect(screen.getByRole('dialog', addLinkDialog)).toHaveClass('is-visible')

    userEvent.type(labelInput, 'Another Custom Link')
    userEvent.type(urlInput, 'http://www.example.com')

    expect(labelInput).toBeValid()
    expect(urlInput).toBeValid()

    await act(async () => {
      userEvent.click(
        within(addLinkModal).getByRole('button', { name: 'Save custom link' })
      )
    })
    expect(mockAddLink).toHaveBeenCalledWith(
      'http://www.example.com',
      'Another Custom Link'
    )

    expect(mockAddLink).toHaveBeenCalledTimes(2)
  })

  it('can add an existing link', () => {
    const mockAddLink = jest.fn()

    renderWithModalRoot(
      <CustomCollection
        {...exampleCollection}
        {...mockHandlers}
        bookmarkOptions={mockLinks}
        handleAddBookmark={mockAddLink}
      />
    )

    const toggleFormButton = screen.getByRole('button', { name: '+ Add link' })
    userEvent.click(toggleFormButton)
    const linkInput = screen.getByLabelText('Select existing link')
    userEvent.click(linkInput)
    userEvent.click(screen.getByRole('option', { name: 'Test Bookmark 2' }))

    expect(mockAddLink).toHaveBeenCalledWith(
      'http://www.example.com/2',
      'Test Bookmark 2',
      'testBookmark2'
    )
  })

  it('renders the settings dropdown menu', () => {
    render(<CustomCollection {...exampleCollection} {...mockHandlers} />)
    const menuToggleButton = screen.getByRole('button', {
      name: 'Collection Settings',
    })
    expect(menuToggleButton).toBeInTheDocument()

    userEvent.click(menuToggleButton)
    const deleteItem = screen.getByRole('button', {
      name: 'Delete this collection',
    })
    expect(deleteItem).toBeInTheDocument()

    const editItem = screen.getByRole('button', {
      name: 'Edit collection title',
    })
    expect(editItem).toBeInTheDocument()
  })

  it('clicking the delete collection button opens the delete modal', () => {
    const mockRemoveCollection = jest.fn()

    renderWithModalRoot(
      <CustomCollection
        {...exampleCollection}
        {...mockHandlers}
        handleRemoveCollection={mockRemoveCollection}
      />
    )

    const menuToggleButton = screen.getByRole('button', {
      name: 'Collection Settings',
    })
    expect(menuToggleButton).toBeInTheDocument()

    userEvent.click(menuToggleButton)
    const deleteCollection = screen.getByRole('button', {
      name: 'Delete this collection',
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
        {...mockHandlers}
        handleRemoveCollection={mockRemoveCollection}
      />
    )

    const menuToggleButton = screen.getByRole('button', {
      name: 'Collection Settings',
    })

    userEvent.click(menuToggleButton)

    const deleteCollection = screen.getByRole('button', {
      name: 'Delete this collection',
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
        {...mockHandlers}
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
      name: 'Delete this collection',
    })
    userEvent.click(deleteCollection)

    // Open modal
    const confirmDeleteModal = screen.getByRole(
      'dialog',
      removeCollectionDialog
    )
    expect(confirmDeleteModal).toHaveClass('is-visible')

    userEvent.click(
      within(confirmDeleteModal).getByRole('button', { name: 'Delete' })
    )
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
        {...mockHandlers}
        handleRemoveCollection={mockRemoveCollection}
      />
    )

    const menuToggleButton = screen.getByRole('button', {
      name: 'Collection Settings',
    })
    // Open the menu
    userEvent.click(menuToggleButton)

    const deleteCollection = screen.getByRole('button', {
      name: 'Delete this collection',
    })

    expect(deleteCollection).toBeInTheDocument()
    expect(menuToggleButton).toBeInTheDocument()

    // Click outside menu
    const outsideEl = screen.getByRole('button', {
      name: '+ Add link',
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
        {...mockHandlers}
        handleRemoveCollection={mockRemoveCollection}
      />
    )

    const menuToggleButton = screen.getByRole('button', {
      name: 'Collection Settings',
    })
    // Open the menu
    userEvent.click(menuToggleButton)

    const deleteCollection = screen.getByRole('button', {
      name: 'Delete this collection',
    })

    expect(deleteCollection).toBeInTheDocument()
    expect(menuToggleButton).toBeInTheDocument()

    // Close the menu
    userEvent.click(menuToggleButton)

    // Confirm the menu has been closed
    expect(deleteCollection).not.toBeInTheDocument()
  })

  it('renders the collection with links from the CMS', () => {
    const { container } = render(
      <CustomCollection
        {...exampleCollection}
        {...mockHandlers}
        bookmarkOptions={mockLinks}
      />
    )

    expect(container.querySelector('a')?.getAttribute('href')).toEqual(
      'https://webmail.apps.mil/'
    )
  })

  describe('an empty collection', () => {
    it('renders a focused input for the title', () => {
      render(<CustomCollection _id={ObjectId()} {...mockHandlers} />)

      expect(screen.getByRole('textbox')).toHaveFocus()
    })

    it('can enter a title', () => {
      const mockEditCollection = jest.fn()

      render(
        <CustomCollection
          {...mockHandlers}
          _id={ObjectId()}
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
          {...mockHandlers}
          _id={ObjectId()}
          handleRemoveCollection={mockDeleteCollection}
        />
      )
      const cancel = screen.getByRole('button', { name: 'Cancel' })

      userEvent.click(cancel)
      expect(mockDeleteCollection).toHaveBeenCalled()
    })
  })

  describe('with 9 bookmarks', () => {
    it('shows a warning when adding the tenth link', () => {
      renderWithModalRoot(
        <CustomCollection
          {...exampleCollectionWithNine}
          {...mockHandlers}
          bookmarkOptions={mockLinks}
        />
      )

      const toggleFormButton = screen.getByRole('button', {
        name: '+ Add link',
      })
      expect(toggleFormButton).toBeInTheDocument()
      userEvent.click(toggleFormButton)

      expect(screen.queryByRole('tooltip', { hidden: true })).toHaveTextContent(
        `You’re about to hit your link limit — each collection can only have 10 links.`
      )

      userEvent.click(toggleFormButton)
      screen.getByLabelText('Select existing link')

      userEvent.click(
        screen.getByRole('button', { name: 'Toggle the dropdown list' })
      )

      userEvent.click(screen.getByRole('option', { name: 'Add custom link' }))

      const addLinkModal = screen.getByRole('dialog', addLinkDialog)
      expect(addLinkModal).toHaveClass('is-visible')

      expect(
        within(addLinkModal).queryByRole('heading', { level: 4 })
      ).toHaveTextContent('Link limit reached')
    })
  })

  describe('with 10 bookmarks', () => {
    it('does not allow adding anymore links', () => {
      render(
        <CustomCollection
          {...exampleCollectionWithTen}
          {...mockHandlers}
          bookmarkOptions={mockLinks}
        />
      )

      const toggleFormButton = screen.queryByRole('button', {
        name: '+ Add link',
      })
      expect(toggleFormButton).not.toBeInTheDocument()
    })
  })
})
