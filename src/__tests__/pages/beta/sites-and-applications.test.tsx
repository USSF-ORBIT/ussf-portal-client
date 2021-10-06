/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SitesAndApplications, {
  getStaticProps,
} from 'pages/beta/sites-and-applications'

const mockBookmarks = [
  {
    id: '1',
    url: 'www.example.com',
    label: 'Example 1',
  },
  {
    id: '2',
    url: 'www.example2.com',
    label: 'Example 2',
  },
]

const mockCollections = [
  {
    id: '1',
    title: 'Example Collection 1',
    bookmarks: [
      {
        id: '1',
        url: 'www.example.com',
        label: 'Example 1',
      },
    ],
  },
  {
    id: '2',
    title: 'Example Collection 2',
    bookmarks: [
      {
        id: '1',
        url: 'www.example.com',
        label: 'Example 1',
      },
      {
        id: '2',
        url: 'www.example2.com',
        label: 'Example 2',
      },
    ],
  },
]

describe('Sites and Applications page', () => {
  beforeEach(() => {
    render(
      <SitesAndApplications
        collections={mockCollections}
        bookmarks={mockBookmarks}
      />
    )
  })

  it('renders Sites & Applications content', () => {
    expect(
      screen.getByRole('heading', { name: 'Sites & Applications' })
    ).toBeInTheDocument()
  })

  it('sorts by type by default', () => {
    const collections = screen.getAllByRole('heading', { level: 3 })
    expect(collections).toHaveLength(mockCollections.length)
    collections.forEach((c, i) => {
      // eslint-disable-next-line security/detect-object-injection
      expect(collections[i]).toHaveTextContent(mockCollections[i].title)
    })
  })

  it('can toggle sort type', () => {
    const sortAlphaBtn = screen.getByRole('button', {
      name: 'Sort alphabetically',
    })

    const sortTypeBtn = screen.getByRole('button', { name: 'Sort by type' })
    userEvent.click(sortAlphaBtn)
    expect(screen.queryAllByRole('heading', { level: 3 })).toHaveLength(0)
    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(screen.getAllByRole('link')).toHaveLength(mockBookmarks.length)
    userEvent.click(sortTypeBtn)
    expect(screen.queryAllByRole('heading', { level: 3 })).toHaveLength(
      mockCollections.length
    )
    expect(screen.queryByRole('table')).not.toBeInTheDocument()
  })

  describe('selecting collections', () => {
    it('can enter select mode', () => {
      const selectBtn = screen.getByRole('button', {
        name: 'Select multiple collections',
      })
      expect(selectBtn).toBeInTheDocument()
      userEvent.click(selectBtn)

      expect(
        screen.queryByRole('button', { name: 'Select multiple collections' })
      ).not.toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
      expect(
        screen.getByRole('button', { name: 'Add selected' })
      ).toBeDisabled()
      expect(screen.getByText('0 collections selected')).toBeInTheDocument()

      expect(screen.getAllByRole('button', { name: 'Select' })).toHaveLength(
        mockCollections.length
      )
    })

    it('can cancel out of select mode', () => {
      expect(
        screen.queryByText('0 collections selected')
      ).not.toBeInTheDocument()

      userEvent.click(
        screen.getByRole('button', {
          name: 'Select multiple collections',
        })
      )

      expect(screen.queryByText('0 collections selected')).toBeInTheDocument()

      userEvent.click(screen.getByRole('button', { name: 'Cancel' }))

      expect(
        screen.queryByText('0 collections selected')
      ).not.toBeInTheDocument()
    })

    it('can select multiple collections', () => {
      userEvent.click(
        screen.getByRole('button', {
          name: 'Select multiple collections',
        })
      )

      expect(
        screen.getByRole('button', { name: 'Add selected' })
      ).toBeDisabled()
      expect(screen.getByText('0 collections selected')).toBeInTheDocument()
      const selectBtns = screen.getAllByRole('button', { name: 'Select' })
      userEvent.click(selectBtns[0])
      expect(screen.getByText('1 collection selected')).toBeInTheDocument()
      userEvent.click(selectBtns[1])
      expect(screen.getByText('2 collections selected')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Add selected' })).toBeEnabled()
    })

    it('selecting the same collection twice removes it from the selection', () => {
      userEvent.click(
        screen.getByRole('button', {
          name: 'Select multiple collections',
        })
      )

      expect(
        screen.getByRole('button', { name: 'Add selected' })
      ).toBeDisabled()
      expect(screen.getByText('0 collections selected')).toBeInTheDocument()
      const selectBtns = screen.getAllByRole('button', { name: 'Select' })
      userEvent.click(selectBtns[0])
      expect(screen.getByText('1 collection selected')).toBeInTheDocument()
      userEvent.click(selectBtns[1])
      expect(screen.getByText('2 collections selected')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Add selected' })).toBeEnabled()

      userEvent.click(selectBtns[0])
      expect(screen.getByText('1 collection selected')).toBeInTheDocument()
      userEvent.click(selectBtns[1])
      expect(screen.getByText('0 collections selected')).toBeInTheDocument()
    })
  })
})

describe('getStaticProps', () => {
  it('returns expected props', async () => {
    const results = await getStaticProps()
    expect(results).toEqual({ props: { collections: [], bookmarks: [] } })
  })
})
