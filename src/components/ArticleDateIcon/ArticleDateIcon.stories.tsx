import React from 'react'
import { Meta } from '@storybook/react'

import { ArticleDateIcon } from './ArticleDateIcon'

export default {
  title: 'Components/ArticleList/ArticleDateIcon',
  component: ArticleDateIcon,
} as Meta

const testDate = new Date('May 16 2022')
const invalidDate = 'May 16 2022' as unknown as Date

export const ExampleArticleDateIcon = () => <ArticleDateIcon date={testDate} />

export const ExampleInvalidDate = () => <ArticleDateIcon date={invalidDate} />
