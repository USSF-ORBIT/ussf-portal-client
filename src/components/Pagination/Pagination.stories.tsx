import React from 'react'
import { Meta } from '@storybook/react'
import Pagination from './Pagination'

export default {
  title: 'Components/Pagination',
  component: Pagination,
} as Meta

const testPages = Array.from({ length: 25 }).map(() => '#')

export const Default = () => <Pagination pages={testPages} currentPage={10} />
