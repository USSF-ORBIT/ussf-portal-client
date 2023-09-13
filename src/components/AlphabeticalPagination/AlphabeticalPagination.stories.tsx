// what is displayed in storybook, never printed in app

import React from 'react'
import { Meta } from '@storybook/react'
import AlphabeticalPagination from './AlphabeticalPagination'

export default {
  title: 'Base/Pagination/Alphabetical',
  component: AlphabeticalPagination,
} as Meta

export const DefaultAlphabeticalPagination = () => <AlphabeticalPagination />
