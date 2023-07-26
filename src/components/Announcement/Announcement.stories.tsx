import React from 'react'
import { Meta } from '@storybook/react'
import Announcement from './Announcement'

export default {
  title: 'Components/Announcement',
  component: Announcement,
} as Meta

const mockAnnouncements = [
  {
    id: '1',
    body: {
      document: [
        {
          type: 'paragraph',
          children: [
            {
              text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            },
          ],
        },
      ],
    },
    status: 'Published',
    title: 'Test Announcment',
    publishedDate: '2022-06-20T21:56:55.926Z',
  },
  {
    id: '2',
    body: {
      document: [
        {
          type: 'paragraph',
          children: [
            {
              text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            },
          ],
        },
        {
          type: 'component-block',
          props: {
            link: {
              value: 'https://www.google.com',
              discriminant: 'url',
            },
            ctaText: 'View more',
          },
          children: [
            {
              type: 'component-inline-prop',
              children: [
                {
                  text: '',
                },
              ],
            },
          ],
          component: 'callToAction',
        },
      ],
    },
    status: 'Published',
    title: 'A Second Announcment',
    publishedDate: '2022-06-20T21:56:55.926Z',
  },
]

export const DefaultAnnouncement = () => (
  <Announcement announcements={mockAnnouncements} />
)
