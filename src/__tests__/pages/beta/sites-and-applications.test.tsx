/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import SitesAndApplications from 'pages/beta/sites-and-applications'

const mockCollections = [
  {
    id: 1,
    title: 'Example Collection 1',
    bookmarks: [
      {
        id: 1,
        url: 'www.example.com',
        label: 'Example 1',
      },
    ],
  },
  {
    id: 2,
    title: 'Example Collection 2',
    bookmarks: [
      {
        id: 1,
        url: 'www.example.com',
        label: 'Example 1',
      },
      {
        id: 2,
        url: 'www.example2.com',
        label: 'Example 2',
      },
    ],
  },
]

describe('Sites and Applications page', () => {
  it('renders Sites & Applications content', () => {
    render(<SitesAndApplications collections={mockCollections} />)

    expect(
      screen.getByRole('heading', { name: 'Sites & Applications' })
    ).toBeInTheDocument()

    const collections = screen.getAllByRole('heading', { level: 3 })
    expect(collections).toHaveLength(mockCollections.length)
    collections.forEach((c, i) => {
      expect(collections[i]).toHaveTextContent(mockCollections[i].title)
    })
  })
})
