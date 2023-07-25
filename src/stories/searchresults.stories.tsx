import React from 'react'
import type { Meta } from '@storybook/react'

import { SearchResultItem } from 'components/SearchResultItem/SearchResultItem'
import type { SearchResultRecord } from 'types/index'

export default {
  title: 'Components/SearchResults',
} as Meta

const testApplicationResult: SearchResultRecord = {
  id: 'testBookmark123',
  type: 'Bookmark',
  title: 'MyFSS',
  preview:
    'How is Air Force Information Management System abbreviated? AFIMS stands for Air Force Information Management System. For those who have seen the Earth from space, and for the hundreds and perhaps thousands more who will, the experience most certainly changes your perspective.',
  permalink: 'https://www.url.com/myfss',
}

const testArticleResult: SearchResultRecord = {
  id: 'testArticle123',
  type: 'Article',
  title:
    'Physical training: Everything you need to know about the update in requirements',
  preview:
    'As a steward of almost 9 million acres encompassing forests, prairies, deserts, wetlands, and coastal habitats, the Department of the Air Force recognizes the importance of protecting and sustaining the natural environment.',
  permalink:
    'https://localhost:3000/articles/physical-training-everything-you-need-to-know',
  date: '2022-05-17T13:44:39.796Z',
  labels: [
    {
      id: 'testLabel',
      name: 'All Guardians',
      type: 'Audience',
    },
  ],
}

export const SearchResults = () => {
  return (
    <>
      <SearchResultItem item={testApplicationResult} />
      <SearchResultItem item={testApplicationResult} />
      <SearchResultItem item={testArticleResult} />
      <SearchResultItem
        item={{
          ...testArticleResult,
          preview:
            'As a steward of almost 9 million acres encompassing forests, prairies, deserts, wetlands, and coastal habitats, the Department of the Air Force recognizes the importance of protecting and sustaining the natural environment. As a steward of almost 9 million acres encompassing forests, prairies, deserts, wetlands, and coastal habitats, the Department of the Air Force recognizes the importance of protecting and sustaining the natural environment. As a steward of almost 9 million acres encompassing forests, prairies, deserts, wetlands, and coastal habitats, the Department of the Air Force recognizes the importance of protecting and sustaining the natural environment.',
          permalink:
            'https://localhost:3000/articles/physical-training-everything-you-need-to-know?asfljaslfkjlkajrlakjsflkajsflasfmaaslkfjalsfjaklsjlasfksfljaslfkjlkajrlakjsflkajsflasfmaaslkfjalsfjaklsjlasfk',
        }}
      />

      <SearchResultItem item={testArticleResult} />
    </>
  )
}
