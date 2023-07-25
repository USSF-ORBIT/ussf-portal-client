import React from 'react'
import { Meta } from '@storybook/react'

import { ArticleList } from './ArticleList'

import type { ArticleListItemRecord } from 'types'

export default {
  title: 'Components/ArticleList',
  component: ArticleList,
} as Meta

const testArticle: ArticleListItemRecord = {
  id: 'testArticleId123',
  slug: 'test-article',
  title:
    'Version 2.8.5 released! Includes MVP search experience and a way to filter the news.',
  preview:
    'This article is a test. Vestibulum in turpis vitae arcu tincidunt maximus sit amet suscipit justo. Morbi lobortis posuere mollis. Suspendisse egestas egestas sapien eu blandit. In euismod suscipit nisi, eget vulputate tellus. Cras vel nisi nec urna facilisis luctus. Phasellus vel sagittis lacus. Ut dapibus ipsum arcu, nec semper ipsum malesuada in. Aliquam et lectus pharetra, gravida eros suscipit, tincidunt libero. Fusce vel ultrices tellus, vel pulvinar diam. Vestibulum pharetra vehicula lacinia.',
  publishedDate: '2022-05-17T13:44:39.796Z',
}

const testArticles = [testArticle, testArticle, testArticle]

export const ExampleArticleList = () => <ArticleList articles={testArticles} />

export const EmptyArticleList = () => <ArticleList articles={[]} />
