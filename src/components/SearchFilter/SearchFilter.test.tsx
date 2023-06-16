/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen, waitFor, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithSearchContext } from '../../testHelpers'
import SearchFilter from './SearchFilter'
import Search from 'components/Search/Search'

const mockLabels = [
  { name: 'label1' },
  { name: 'label2' },
  { name: 'label3' },
  { name: 'two words' },
]

describe('SearchFilter component', () => {
  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  test('renders the search filter', () => {
    render(<SearchFilter labels={mockLabels} />)

    expect(screen.getByText('Filter Search')).toBeInTheDocument()
  })

  test('renders the dropdown options', () => {
    render(<SearchFilter labels={mockLabels} />)

    expect(screen.getByRole('combobox')).toBeInTheDocument()
    expect(screen.getAllByRole('option')).toHaveLength(5)
  })

  test('user can select the default dropdown option', async () => {
    const user = userEvent.setup()

    render(<SearchFilter labels={mockLabels} />)
    const dropdown = screen.getByTestId('label-dropdown')

    expect(dropdown).toBeInTheDocument()
    expect(screen.getAllByRole('option')).toHaveLength(5)

    await user.selectOptions(dropdown, 'label1')

    expect(screen.getByText('label1')).toHaveAttribute('aria-selected', 'true')

    await user.selectOptions(dropdown, 'default')

    await waitFor(() => {
      expect(screen.getByText('label1')).toHaveAttribute(
        'aria-selected',
        'false'
      )
      expect(screen.getByText('None applied')).toHaveAttribute(
        'aria-selected',
        'true'
      )
    })
  })

  test('selecting an option updates the dropdown', async () => {
    const user = userEvent.setup()

    render(<SearchFilter labels={mockLabels} />)
    const dropdown = screen.getByTestId('label-dropdown')

    expect(dropdown).toBeInTheDocument()
    expect(screen.getAllByRole('option')).toHaveLength(5)

    await user.selectOptions(dropdown, 'label1')

    expect(screen.getByText('label1')).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText('label2')).toHaveAttribute('aria-selected', 'false')

    await user.selectOptions(dropdown, 'label2')

    expect(screen.getByText('label1')).toHaveAttribute('aria-selected', 'false')
    expect(screen.getByText('label2')).toHaveAttribute('aria-selected', 'true')
  })

  test('renders the checkbox options', () => {
    render(<SearchFilter labels={mockLabels} />)

    expect(screen.getAllByRole('checkbox')).toHaveLength(3)
    expect(screen.getByLabelText('Application')).toBeInTheDocument()
    expect(screen.getByLabelText('News')).toBeInTheDocument()
    expect(screen.getByLabelText('Documentation')).toBeInTheDocument()
  })

  test('selecting a checkbox updates the checkbox state', async () => {
    const user = userEvent.setup()

    render(<SearchFilter labels={mockLabels} />)
    const applicationCheckbox = screen.getByLabelText('Application')

    expect(applicationCheckbox).toBeInTheDocument()
    expect(applicationCheckbox).not.toBeChecked()

    await user.click(applicationCheckbox)

    expect(applicationCheckbox).toBeChecked()
  })

  test('unchecking a checkbox removes it from the query', async () => {
    const user = userEvent.setup()

    renderWithSearchContext(<SearchFilter labels={mockLabels} />, {
      searchQuery: 'category:news',
    })

    const newsCheckbox = screen.getByLabelText('News')

    expect(newsCheckbox).toBeInTheDocument()
    expect(newsCheckbox).toBeChecked()

    await user.click(newsCheckbox)
    expect(newsCheckbox).not.toBeChecked()
  })

  test('selecting a dropdown option removes the previous label from the query', async () => {
    const user = userEvent.setup()

    renderWithSearchContext(<SearchFilter labels={mockLabels} />)

    const dropdown = screen.getByTestId('label-dropdown')

    await user.selectOptions(dropdown, 'label1')
    expect(screen.getByText('label1')).toHaveAttribute('aria-selected', 'true')

    await user.selectOptions(dropdown, 'label2')

    expect(screen.getByText('label1')).toHaveAttribute('aria-selected', 'false')
    expect(screen.getByText('label2')).toHaveAttribute('aria-selected', 'true')
  })

  test('user can select a label that has two words', async () => {
    const user = userEvent.setup()

    renderWithSearchContext(<SearchFilter labels={mockLabels} />)

    const dropdown = screen.getByTestId('label-dropdown')

    await user.selectOptions(dropdown, 'two words')

    expect(screen.getByText('two words')).toHaveAttribute(
      'aria-selected',
      'true'
    )
  })

  test('submits the form', async () => {
    const user = userEvent.setup()
    const mockSubmit = jest.fn()

    renderWithSearchContext(
      <>
        <Search />
        <SearchFilter labels={mockLabels} />
      </>,
      {
        searchQuery: 'label:label1' + 'test'.repeat(60),
      }
    )

    const form = screen.getByRole('search')
    form.addEventListener('submit', mockSubmit)

    await user.click(screen.getByRole('button', { name: 'Filter' }))

    expect(mockSubmit).toHaveBeenCalled()
  })

  test('if searchQuery contains any filter values, update the dropdown with the value', async () => {
    renderWithSearchContext(
      <>
        <Search />
        <SearchFilter labels={mockLabels} />
      </>,
      {
        searchQuery:
          'label:label1 category:news category:application category:documentation',
      }
    )

    expect(screen.getByText('label1')).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByLabelText('News')).toBeChecked()
    expect(screen.getByLabelText('Application')).toBeChecked()
    expect(screen.getByLabelText('Documentation')).toBeChecked()
  })

  test('clears the form', async () => {
    const user = userEvent.setup()

    render(<SearchFilter labels={mockLabels} />)

    const documentationCheckbox = screen.getByLabelText('Documentation')

    expect(documentationCheckbox).toBeInTheDocument()
    expect(documentationCheckbox).not.toBeChecked()

    await user.click(documentationCheckbox)

    expect(documentationCheckbox).toBeChecked()

    const clearButton = screen.getByRole('button', { name: 'Reset' })

    await user.click(clearButton)

    await waitFor(() => {
      expect(documentationCheckbox).not.toBeChecked()
    })
  })
})
