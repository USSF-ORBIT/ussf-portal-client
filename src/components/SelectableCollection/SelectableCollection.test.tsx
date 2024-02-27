/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import React from 'react'

import SelectableCollection from './SelectableCollection'

const exampleCollection = {
  id: '123',
  title: 'Example Collection',
  bookmarks: [
    {
      id: '456',
      url: 'https://google.com',
      label: 'Webmail',
      description: 'Lorem ipsum',
    },
    {
      id: '789',
      url: 'https://mypay.dfas.mil/#/',
      label: 'MyPay',
      description: 'Lorem ipsum',
    },
    {
      id: '102',
      url: 'https://afpcsecure.us.af.mil/PKI/MainMenu1.aspx',
      label: 'vMPF',
      description: 'Lorem ipsum',
    },
  ],
}

describe('SelectableCollection component', () => {
  it('renders the collection with disabled links and a select button', () => {
    const mockOnSelect = jest.fn()

    render(
      <SelectableCollection
        {...exampleCollection}
        isSelected={false}
        onSelect={mockOnSelect}
      />
    )

    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      exampleCollection.title
    )
    expect(screen.getAllByRole('listitem')).toHaveLength(
      exampleCollection.bookmarks.length
    )

    expect(screen.queryByRole('link')).not.toBeInTheDocument()

    expect(
      screen.getByRole('button', {
        name: 'Select collection Example Collection',
      })
    ).toBeInTheDocument()
  })

  it('clicking the button calls the select handler', async () => {
    const user = userEvent.setup()
    const mockOnSelect = jest.fn()

    render(
      <SelectableCollection
        {...exampleCollection}
        isSelected={false}
        onSelect={mockOnSelect}
      />
    )

    await user.click(
      screen.getByRole('button', {
        name: 'Select collection Example Collection',
      })
    )
    expect(mockOnSelect).toBeCalled()
  })

  it('the select handler is keyboard accessible', async () => {
    const user = userEvent.setup()
    const mockOnSelect = jest.fn()

    render(
      <SelectableCollection
        {...exampleCollection}
        isSelected={false}
        onSelect={mockOnSelect}
      />
    )

    await user.tab()
    expect(
      screen.getByRole('button', {
        name: 'Select collection Example Collection',
      })
    ).toHaveFocus()
    await user.keyboard('{enter}')
    expect(mockOnSelect).toBeCalled()
  })

  it('has no a11y violations', async () => {
    const { container } = render(
      <SelectableCollection
        {...exampleCollection}
        isSelected={false}
        onSelect={jest.fn()}
      />
    )

    expect(await axe(container)).toHaveNoViolations()
  })

  describe('when selected', () => {
    it('renders an unselect button that appears on focus', async () => {
      const user = userEvent.setup()
      const mockOnSelect = jest.fn()

      render(
        <SelectableCollection
          {...exampleCollection}
          isSelected={true}
          onSelect={mockOnSelect}
        />
      )

      await user.tab()
      expect(
        screen.getByRole('button', {
          name: 'Unselect collection Example Collection',
        })
      ).toHaveFocus()
      await user.click(
        screen.getByRole('button', {
          name: 'Unselect collection Example Collection',
        })
      )
      expect(mockOnSelect).toBeCalled()
    })

    it('has no a11y violations', async () => {
      const { container } = render(
        <SelectableCollection
          {...exampleCollection}
          isSelected={true}
          onSelect={jest.fn()}
        />
      )

      expect(await axe(container)).toHaveNoViolations()
    })
  })

  describe('when disabled', () => {
    it('does not render a button', () => {
      const mockOnSelect = jest.fn()

      render(
        <SelectableCollection
          {...exampleCollection}
          isSelected={true}
          onSelect={mockOnSelect}
          disabled={true}
        />
      )

      expect(
        screen.queryByRole('button', {
          name: 'Select collection Example Collection',
        })
      ).not.toBeInTheDocument()
    })

    it('has no a11y violations', async () => {
      const { container } = render(
        <SelectableCollection
          {...exampleCollection}
          isSelected={true}
          onSelect={jest.fn()}
          disabled={true}
        />
      )

      expect(await axe(container)).toHaveNoViolations()
    })
  })
})
