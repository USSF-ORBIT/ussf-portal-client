import React from 'react'
import { Meta } from '@storybook/react'

import { SearchResultItem } from './SearchResultItem'
import {
  testArticleResult,
  testApplicationResult,
  testDocumentationResult,
} from '__fixtures__/data/searchResults'

export default {
  title: 'Components/SearchResults/SearchResultItem',
  component: SearchResultItem,
} as Meta

export const ApplicationResult = () => (
  <SearchResultItem item={testApplicationResult} />
)

export const ArticleResult = () => <SearchResultItem item={testArticleResult} />

export const ArticleResultLineClamp = () => (
  <SearchResultItem
    item={{
      ...testArticleResult,
      preview:
        'As a steward of almost 9 million acres encompassing forests, prairies, deserts, wetlands, and coastal habitats, the Department of the Air Force recognizes the importance of protecting and sustaining the natural environment. As a steward of almost 9 million acres encompassing forests, prairies, deserts, wetlands, and coastal habitats, the Department of the Air Force recognizes the importance of protecting and sustaining the natural environment. As a steward of almost 9 million acres encompassing forests, prairies, deserts, wetlands, and coastal habitats, the Department of the Air Force recognizes the importance of protecting and sustaining the natural environment.',
      permalink:
        'https://localhost:3000/articles/physical-training-everything-you-need-to-know?asfljaslfkjlkajrlakjsflkajsflasfmaaslkfjalsfjaklsjlasfksfljaslfkjlkajrlakjsflkajsflasfmaaslkfjalsfjaklsjlasfk',
    }}
  />
)

export const DocumentationResult = () => (
  <SearchResultItem item={testDocumentationResult} />
)
