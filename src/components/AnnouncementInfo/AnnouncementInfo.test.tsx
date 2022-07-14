/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import React from 'react'

import AnnouncementInfo from './AnnouncementInfo'

const testAnnouncement = {
  id: 'testAnnouncement123',
  title: 'Test Announcement',
  body: {
    document: [
      {
        type: 'paragraph',
        children: [
          {
            text: 'this is a test',
          },
        ],
      },
    ],
  },
  status: 'Published',
  publishedDate: '2022-05-17T13:44:39.796Z',
}

describe('AnnouncementInfo component', () => {
  it('renders the announcement info', () => {
    render(<AnnouncementInfo announcement={testAnnouncement} />)

    expect(screen.getAllByText('Test Announcement')).toHaveLength(1)
  })
})
