import React from 'react'
import type { Meta } from '@storybook/react'

import { SearchResultItem } from 'components/SearchResultItem/SearchResultItem'
import {
  testApplicationResult,
  testArticleResult,
  testDocumentationResult,
  testLandingPageResult,
} from '__fixtures__/data/searchResults'

export default {
  title: 'Components/SearchResults',
} as Meta

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
      <SearchResultItem item={testDocumentationResult} />
      <SearchResultItem item={testLandingPageResult} />
    </>
  )
}
