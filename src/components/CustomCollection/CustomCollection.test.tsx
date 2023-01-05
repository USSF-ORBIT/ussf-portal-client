/**
 * @jest-environment jsdom
 */

import { render, screen, within } from '@testing-library/react'
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

  it('renders the collection with DragDropContext', async () => {
    const { container } = render(
      <CustomCollection {...exampleCollection} {...mockHandlers} />
    )
    await screen.findByText('Example Collection')
    expect(
      container
        .querySelector('div')
        ?.getAttribute('data-rbd-droppable-context-id')
    ).toEqual('0')
  })

  // TODO this is skipped due to an issue with react-beautiful-dnd and react 18 compatiblity.
  // Seems that `user.keyboard` below is not triggering the change and thus not calling the mockEditCollection.
  // This broke in the browser until disabling `reactStrictMode`. However that is a temporary solution and needs to be revisited
  // Since react-beautiful-dnd is in maintenance only mode and only receiving critical updates we are not sure when this will be fixed.
  // For now to complete react 18 upgrade this is turned off in favor of an e2e test that tests the same functionality.
  // We should revisit it this and the dependency in the future. See https://app.shortcut.com/orbit-truss/story/1347
  it.skip('drags and drops a link', async () => {
    const user = userEvent.setup()
    const mockEditCollection = jest.fn()

    render(
      <CustomCollection
        {...exampleCollection}
        {...mockHandlers}
        handleEditCollection={mockEditCollection}
      />
    )

    await screen.findByText('Example Collection')

    // Get drag handles
    const dragHandle = screen.getAllByLabelText('Drag Handle')
    expect(dragHandle[0]).toHaveAttribute('data-rbd-drag-handle-context-id')
    dragHandle[0].focus()
    expect(dragHandle[0]).toHaveFocus()

    // Use keyboard to simulate drag and drop of a link
    await user.keyboard('[Space][ArrowDown][Space]')

    expect(mockEditCollection).toHaveBeenCalled()
  })

  it('renders the collection with delete or edit buttons', async () => {
    render(<CustomCollection {...exampleCollection} {...mockHandlers} />)
    await screen.findByText('Example Collection')

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

  it('renders an Add Link toggleable form', async () => {
    const user = userEvent.setup()

    render(
      <CustomCollection
        {...exampleCollection}
        {...mockHandlers}
        bookmarkOptions={mockLinks}
      />
    )
    await screen.findByText('Example Collection')

    const toggleFormButton = screen.getByRole('button', { name: '+ Add link' })
    expect(toggleFormButton).toBeInTheDocument()

    await user.click(toggleFormButton)
    const linkInput = screen.getByLabelText('Select existing link')
    expect(linkInput).toBeInTheDocument()
    expect(linkInput).toBeInvalid()

    await user.click(
      screen.getByRole('button', { name: 'Toggle the dropdown list' })
    )
    await user.click(screen.getByRole('option', { name: 'Test Bookmark 2' }))
    expect(linkInput).toBeValid()
  })

  it('cancels Add Link action and resets form', async () => {
    const user = userEvent.setup()
    render(<CustomCollection {...exampleCollection} {...mockHandlers} />)
    await screen.findByText('Example Collection')

    await user.click(screen.getByRole('button', { name: '+ Add link' }))
    expect(screen.queryByLabelText('Select existing link')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Cancel' }))
    expect(
      screen.getByRole('button', {
        name: '+ Add link',
      })
    ).toBeInTheDocument()

    expect(
      screen.queryByLabelText('Select existing link')
    ).not.toBeInTheDocument()
  })

  // it('can select Add Custom Link and open the Add Custom Link modal', async () => {
  //   const user = userEvent.setup()
  //   const mockAddLink = jest.fn()

  //   renderWithModalRoot(
  //     <CustomCollection
  //       {...exampleCollection}
  //       {...mockHandlers}
  //       bookmarkOptions={mockLinks}
  //       handleAddBookmark={mockAddLink}
  //     />
  //   )

  //   await screen.findByText('Example Collection')
  //   const toggleFormButton = screen.getByRole('button', { name: '+ Add link' })
  //   expect(toggleFormButton).toBeInTheDocument()

  //   await user.click(toggleFormButton)
  //   const linkInput = screen.getByLabelText('Select existing link')
  //   expect(linkInput).toBeInTheDocument()
  //   expect(linkInput).toBeInvalid()

  //   await user.click(
  //     screen.getByRole('button', { name: 'Toggle the dropdown list' })
  //   )

  //   await user.click(screen.getByRole('option', { name: 'Add custom link' }))

  //   // Open modal
  //   const addLinkModal = screen.getByRole('dialog', addLinkDialog)

  //   expect(addLinkModal).toHaveClass('is-visible')

  //   const labelInput = within(addLinkModal).getByRole('textbox', {
  //     name: 'bookmarkLabel',
  //   })

  //   const urlInput = within(addLinkModal).getByRole('textbox', {
  //     name: 'bookmarkUrl',
  //   })

  //   await user.type(labelInput, 'My Custom Link')
  //   await user.type(urlInput, 'http://www.example.com')

  //   await user.click(
  //     within(addLinkModal).getByRole('button', { name: 'Save custom link' })
  //   )

  //   expect(mockAddLink).toHaveBeenCalledWith(
  //     'http://www.example.com',
  //     'My Custom Link'
  //   )
  // })

  // it('canceling from the modal resets the form', async () => {
  //   const user = userEvent.setup()
  //   const mockAddLink = jest.fn()

  //   renderWithModalRoot(
  //     <CustomCollection
  //       {...exampleCollection}
  //       {...mockHandlers}
  //       bookmarkOptions={mockLinks}
  //       handleAddBookmark={mockAddLink}
  //     />
  //   )

  //   await screen.findByText('Example Collection')
  //   const toggleFormButton = screen.getByRole('button', { name: '+ Add link' })
  //   expect(toggleFormButton).toBeInTheDocument()

  //   await user.click(toggleFormButton)
  //   screen.getByLabelText('Select existing link')

  //   await user.click(
  //     screen.getByRole('button', { name: 'Toggle the dropdown list' })
  //   )

  //   await user.click(screen.getByRole('option', { name: 'Add custom link' }))

  //   // Open modal
  //   const addLinkModal = screen.getByRole('dialog', addLinkDialog)
  //   expect(addLinkModal).toHaveClass('is-visible')
  //   const cancelButton = within(addLinkModal).getByRole('button', {
  //     name: 'Cancel',
  //   })
  //   await user.click(cancelButton)

  //   expect(addLinkModal).not.toHaveClass('is-visible')
  //   expect(mockAddLink).not.toHaveBeenCalled()

  //   expect(
  //     screen.getByRole('button', {
  //       name: '+ Add link',
  //     })
  //   ).toBeInTheDocument()

  //   expect(
  //     screen.queryByLabelText('Select existing link')
  //   ).not.toBeInTheDocument()
  // })

  // it('adding a link closes the modal and resets the form', async () => {
  //   const user = userEvent.setup()
  //   const mockAddLink = jest.fn()

  //   renderWithModalRoot(
  //     <CustomCollection
  //       {...exampleCollection}
  //       {...mockHandlers}
  //       bookmarkOptions={mockLinks}
  //       handleAddBookmark={mockAddLink}
  //     />,
  //     { legacyRoot: true }
  //   )

  //   await screen.findByText('Example Collection')

  //   const toggleFormButton = screen.getByRole('button', { name: '+ Add link' })
  //   expect(toggleFormButton).toBeInTheDocument()

  //   // Find Add Custom Link in the ComboBox
  //   await user.click(toggleFormButton)
  //   const linkInput = screen.getByLabelText('Select existing link')
  //   expect(linkInput).toBeInTheDocument()

  //   await user.click(
  //     screen.getByRole('button', { name: 'Toggle the dropdown list' })
  //   )

  //   await user.click(screen.getByRole('option', { name: 'Add custom link' }))

  //   // Open modal
  //   const addLinkModal = screen.getByRole('dialog', addLinkDialog)

  //   expect(addLinkModal).toHaveClass('is-visible')

  //   const labelInput = within(addLinkModal).getByRole('textbox', {
  //     name: 'bookmarkLabel',
  //   })

  //   const urlInput = within(addLinkModal).getByRole('textbox', {
  //     name: 'bookmarkUrl',
  //   })

  //   await user.type(labelInput, 'My Custom Link')
  //   await user.type(urlInput, 'http://www.example.com')

  //   await user.click(
  //     within(addLinkModal).getByRole('button', { name: 'Save custom link' })
  //   )

  //   expect(mockAddLink).toHaveBeenCalledWith(
  //     'http://www.example.com',
  //     'My Custom Link'
  //   )
  //   expect(mockAddLink).toHaveBeenCalledTimes(1)

  //   // Modal closed
  //   expect(screen.queryByRole('dialog', addLinkDialog)).toHaveClass('is-hidden')
  //   await user.click(screen.getByRole('button', { name: '+ Add link' }))

  //   // Modal is still closed, form is reset
  //   expect(screen.queryByRole('dialog', addLinkDialog)).toHaveClass('is-hidden')

  //   // Find Add Custom Link in the ComboBox
  //   await user.click(toggleFormButton)
  //   await user.click(
  //     screen.getByRole('button', { name: 'Toggle the dropdown list' })
  //   )
  //   await user.click(screen.getByRole('option', { name: 'Add custom link' }))

  //   expect(screen.getByRole('dialog', addLinkDialog)).toHaveClass('is-visible')

  //   await user.type(labelInput, 'Another Custom Link')
  //   await user.type(urlInput, 'http://www.example.com')

  //   expect(labelInput).toBeValid()
  //   expect(urlInput).toBeValid()

  //   await user.click(
  //     within(addLinkModal).getByRole('button', { name: 'Save custom link' })
  //   )

  //   expect(mockAddLink).toHaveBeenCalledWith(
  //     'http://www.example.com',
  //     'Another Custom Link'
  //   )

  //   expect(mockAddLink).toHaveBeenCalledTimes(2)
  // })

  it('can add an existing link', async () => {
    const user = userEvent.setup()
    const mockAddLink = jest.fn()

    renderWithModalRoot(
      <CustomCollection
        {...exampleCollection}
        {...mockHandlers}
        bookmarkOptions={mockLinks}
        handleAddBookmark={mockAddLink}
      />
    )
    await screen.findByText('Example Collection')

    const toggleFormButton = screen.getByRole('button', { name: '+ Add link' })

    await user.click(toggleFormButton)
    const linkInput = screen.getByLabelText('Select existing link')
    await user.click(linkInput)
    await user.click(screen.getByRole('option', { name: 'Test Bookmark 2' }))

    expect(mockAddLink).toHaveBeenCalledWith(
      'http://www.example.com/2',
      'Test Bookmark 2',
      'testBookmark2'
    )
  })

  it('renders the settings dropdown menu', async () => {
    const user = userEvent.setup()
    render(<CustomCollection {...exampleCollection} {...mockHandlers} />)
    const menuToggleButton = await screen.findByRole('button', {
      name: 'Collection Settings',
    })
    expect(menuToggleButton).toBeInTheDocument()

    await user.click(menuToggleButton)
    const deleteItem = screen.getByRole('button', {
      name: 'Delete this collection',
    })
    expect(deleteItem).toBeInTheDocument()

    const editItem = screen.getByRole('button', {
      name: 'Edit collection title',
    })
    expect(editItem).toBeInTheDocument()
  })

  // it('clicking the delete collection button opens the delete modal', async () => {
  //   const user = userEvent.setup()
  //   const mockRemoveCollection = jest.fn()

  //   renderWithModalRoot(
  //     <CustomCollection
  //       {...exampleCollection}
  //       {...mockHandlers}
  //       handleRemoveCollection={mockRemoveCollection}
  //     />
  //   )

  //   const menuToggleButton = await screen.findByRole('button', {
  //     name: 'Collection Settings',
  //   })
  //   expect(menuToggleButton).toBeInTheDocument()

  //   await user.click(menuToggleButton)
  //   const deleteCollection = screen.getByRole('button', {
  //     name: 'Delete this collection',
  //   })
  //   expect(deleteCollection).toBeInTheDocument()
  //   await user.click(deleteCollection)

  //   // Open modal
  //   expect(screen.getByRole('dialog', removeCollectionDialog)).toHaveClass(
  //     'is-visible'
  //   )
  // })

  // it('clicking the cancel button in the modal closes the delete modal', async () => {
  //   const user = userEvent.setup()
  //   const mockRemoveCollection = jest.fn()

  //   renderWithModalRoot(
  //     <CustomCollection
  //       {...exampleCollection}
  //       {...mockHandlers}
  //       handleRemoveCollection={mockRemoveCollection}
  //     />
  //   )

  //   const menuToggleButton = await screen.findByRole('button', {
  //     name: 'Collection Settings',
  //   })

  //   await user.click(menuToggleButton)

  //   const deleteCollection = screen.getByRole('button', {
  //     name: 'Delete this collection',
  //   })
  //   await user.click(deleteCollection)

  //   // Open modal
  //   expect(screen.getByRole('dialog', removeCollectionDialog)).toHaveClass(
  //     'is-visible'
  //   )
  //   const removeCollectionModal = screen.getByRole(
  //     'dialog',
  //     removeCollectionDialog
  //   )
  //   expect(removeCollectionModal).toHaveClass('is-visible')
  //   const cancelButton = within(removeCollectionModal).getByRole('button', {
  //     name: 'Cancel',
  //   })
  //   await user.click(cancelButton)

  //   expect(mockRemoveCollection).toHaveBeenCalledTimes(0)

  //   expect(screen.queryByRole('dialog', removeCollectionDialog)).toHaveClass(
  //     'is-hidden'
  //   )
  // })

  // it('clicking the delete button in the modal closes the modal', async () => {
  //   const user = userEvent.setup()
  //   const mockRemoveCollection = jest.fn()

  //   renderWithModalRoot(
  //     <CustomCollection
  //       {...exampleCollection}
  //       {...mockHandlers}
  //       handleRemoveCollection={mockRemoveCollection}
  //     />
  //   )
  //   const menuToggleButton = await screen.findByRole('button', {
  //     name: 'Collection Settings',
  //   })
  //   expect(screen.queryByRole('dialog', removeCollectionDialog)).toHaveClass(
  //     'is-hidden'
  //   )

  //   await user.click(menuToggleButton)

  //   const deleteCollection = screen.getByRole('button', {
  //     name: 'Delete this collection',
  //   })
  //   await user.click(deleteCollection)

  //   // Open modal
  //   const confirmDeleteModal = screen.getByRole(
  //     'dialog',
  //     removeCollectionDialog
  //   )
  //   expect(confirmDeleteModal).toHaveClass('is-visible')

  //   await user.click(
  //     within(confirmDeleteModal).getByRole('button', { name: 'Delete' })
  //   )
  //   expect(mockRemoveCollection).toHaveBeenCalledTimes(1)

  //   expect(screen.queryByRole('dialog', removeCollectionDialog)).toHaveClass(
  //     'is-hidden'
  //   )
  // })

  it('clicking outside the dropdown menu closes the menu', async () => {
    const user = userEvent.setup()
    const mockRemoveCollection = jest.fn()

    renderWithModalRoot(
      <CustomCollection
        {...exampleCollection}
        {...mockHandlers}
        handleRemoveCollection={mockRemoveCollection}
      />
    )

    const menuToggleButton = await screen.findByRole('button', {
      name: 'Collection Settings',
    })
    // Open the menu
    await user.click(menuToggleButton)

    const deleteCollection = screen.getByRole('button', {
      name: 'Delete this collection',
    })

    expect(deleteCollection).toBeInTheDocument()
    expect(menuToggleButton).toBeInTheDocument()

    // Click outside menu
    const outsideEl = screen.getByRole('button', {
      name: '+ Add link',
    })
    await user.click(outsideEl)

    // Confirm the menu has been closed
    expect(deleteCollection).not.toBeInTheDocument()
  })

  it('clicking the menu button toggles the menu', async () => {
    const user = userEvent.setup()
    const mockRemoveCollection = jest.fn()

    renderWithModalRoot(
      <CustomCollection
        {...exampleCollection}
        {...mockHandlers}
        handleRemoveCollection={mockRemoveCollection}
      />
    )

    const menuToggleButton = await screen.findByRole('button', {
      name: 'Collection Settings',
    })
    // Open the menu
    await user.click(menuToggleButton)

    const deleteCollection = screen.getByRole('button', {
      name: 'Delete this collection',
    })

    expect(deleteCollection).toBeInTheDocument()
    expect(menuToggleButton).toBeInTheDocument()

    // Close the menu
    await user.click(menuToggleButton)

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
    const user = userEvent.setup()
    it('renders a focused input for the title', () => {
      render(<CustomCollection _id={ObjectId()} {...mockHandlers} />)

      expect(screen.getByRole('textbox')).toHaveFocus()
    })

    it('can enter a title', async () => {
      const mockEditCollection = jest.fn()

      render(
        <CustomCollection
          {...mockHandlers}
          _id={ObjectId()}
          handleEditCollection={mockEditCollection}
        />
      )

      await user.type(screen.getByRole('textbox'), 'My New Collection{enter}')
      expect(mockEditCollection).toHaveBeenCalledWith('My New Collection')
    })

    it('not entering a title deletes the collection', async () => {
      const mockDeleteCollection = jest.fn()

      render(
        <CustomCollection
          {...mockHandlers}
          _id={ObjectId()}
          handleRemoveCollection={mockDeleteCollection}
        />
      )
      const cancel = screen.getByRole('button', { name: 'Cancel' })

      await user.click(cancel)
      expect(mockDeleteCollection).toHaveBeenCalled()
    })
  })

  // describe('with 9 bookmarks', () => {
  //   it('shows a warning when adding the tenth link', async () => {
  //     const user = userEvent.setup()
  //     renderWithModalRoot(
  //       <CustomCollection
  //         {...exampleCollectionWithNine}
  //         {...mockHandlers}
  //         bookmarkOptions={mockLinks}
  //       />
  //     )
  //     await screen.findByText('Example Collection')

  //     const toggleFormButton = screen.getByRole('button', {
  //       name: '+ Add link',
  //     })
  //     expect(toggleFormButton).toBeInTheDocument()
  //     await user.click(toggleFormButton)

  //     expect(screen.queryByRole('tooltip', { hidden: true })).toHaveTextContent(
  //       `You’re about to hit your link limit — each collection can only have 10 links.`
  //     )

  //     await user.click(toggleFormButton)
  //     screen.getByLabelText('Select existing link')

  //     await user.click(
  //       screen.getByRole('button', { name: 'Toggle the dropdown list' })
  //     )

  //     await user.click(screen.getByRole('option', { name: 'Add custom link' }))

  //     const addLinkModal = screen.getByRole('dialog', addLinkDialog)
  //     expect(addLinkModal).toHaveClass('is-visible')

  //     expect(
  //       within(addLinkModal).queryByRole('heading', { level: 4 })
  //     ).toHaveTextContent('Link limit reached')
  //   })
  // })

  describe('with 10 bookmarks', () => {
    it('does not allow adding anymore links', async () => {
      render(
        <CustomCollection
          {...exampleCollectionWithTen}
          {...mockHandlers}
          bookmarkOptions={mockLinks}
        />
      )

      await screen.findByText('Example Collection')

      const toggleFormButton = screen.queryByRole('button', {
        name: '+ Add link',
      })
      expect(toggleFormButton).not.toBeInTheDocument()
    })
  })
})
