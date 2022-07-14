/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import React from 'react'

import AnnouncementInfo from './AnnouncementInfo'

const testAnnouncementWithUrl = {
  id: 'testAnnouncement123',
  title: 'Test Announcement',
  body: {
    document: [
      {
        type: 'paragraph',
        children: [
          {
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
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
      {
        type: 'paragraph',
        children: [
          {
            text: '',
          },
        ],
      },
    ],
  },
  status: 'Published',
  publishedDate: '2022-05-17T13:44:39.796Z',
}

const testAnnouncementWithArticle = {
  id: 'anotherTest123',
  title: 'Cool new article',
  body: {
    document: [
      {
        type: 'paragraph',
        children: [
          {
            text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat mas',
          },
        ],
      },
      {
        type: 'component-block',
        props: {
          link: {
            value: {
              id: 'cl4ydwrah1780zhrimycrfati',
              data: {
                slug: '/something',
              },
            },
            discriminant: 'article',
          },
          ctaText: 'View article',
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
      {
        type: 'paragraph',
        children: [
          {
            text: '',
          },
        ],
      },
    ],
  },
  status: 'Published',
  publishedDate: '2022-05-17T13:44:39.796Z',
}

describe('AnnouncementInfo component', () => {
  it('renders an announcement with a url CTA', () => {
    render(<AnnouncementInfo announcement={testAnnouncementWithUrl} />)

    expect(screen.getAllByText('Test Announcement')).toHaveLength(1)
  })

  it('renders an announcement with an article CTA', () => {
    render(<AnnouncementInfo announcement={testAnnouncementWithArticle} />)

    expect(screen.getAllByText('Cool new article')).toHaveLength(1)
  })
})
