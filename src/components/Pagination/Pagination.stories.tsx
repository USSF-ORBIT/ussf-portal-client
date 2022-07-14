import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import Pagination from './Pagination'

export default {
  title: 'Components/Pagination',
  component: Pagination,
  argTypes: {
    currentPage: { control: 'number' },
    maxSlots: { control: 'number' },
    pathname: { control: 'string' },
  },
} as ComponentMeta<typeof Pagination>

const pathname = '/test-pathname'
const Template: ComponentStory<typeof Pagination> = (args) => (
  <Pagination
    totalPages={24}
    currentPage={args.currentPage}
    maxSlots={args.maxSlots}
    pathname={args.pathname}
  />
)

export const Sandbox = Template.bind({})
Sandbox.args = {
  currentPage: 10,
  maxSlots: 7,
}

export const Default = () => (
  <Pagination pathname={pathname} totalPages={10} currentPage={10} />
)

export const ThreePagesFirst = () => (
  <Pagination pathname={pathname} totalPages={3} currentPage={1} />
)
export const ThreePages = () => (
  <Pagination pathname={pathname} totalPages={3} currentPage={2} />
)
export const ThreePagesLast = () => (
  <Pagination pathname={pathname} totalPages={3} currentPage={3} />
)

export const SevenPages = () => (
  <Pagination pathname={pathname} totalPages={7} currentPage={4} />
)

export const EightPagesFirst = () => (
  <Pagination pathname={pathname} totalPages={8} currentPage={1} />
)

export const EightPagesFour = () => (
  <Pagination pathname={pathname} totalPages={8} currentPage={4} />
)

export const EightPagesFive = () => (
  <Pagination pathname={pathname} totalPages={8} currentPage={5} />
)

export const EightPagesSix = () => (
  <Pagination pathname={pathname} totalPages={8} currentPage={6} />
)

export const EightPagesLast = () => (
  <Pagination pathname={pathname} totalPages={8} currentPage={8} />
)

export const NinePagesFive = () => (
  <Pagination pathname={pathname} totalPages={9} currentPage={5} />
)

export const TenSlots = () => (
  <Pagination
    pathname={pathname}
    totalPages={24}
    currentPage={10}
    maxSlots={10}
  />
)
