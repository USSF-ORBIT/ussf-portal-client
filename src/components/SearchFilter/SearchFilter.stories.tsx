import React from 'react'
import { Meta } from '@storybook/react'
import SearchFilter from './SearchFilter'

const mockLabels = [{ name: 'label1' }, { name: 'label2' }, { name: 'label3' }]

export default {
  title: 'Base/SearchFilter',
  component: SearchFilter,
} as Meta

export const DefaultSearchFilter = () => <SearchFilter labels={mockLabels} />
