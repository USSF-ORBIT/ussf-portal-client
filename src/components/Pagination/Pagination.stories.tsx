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

const generateTestPages = (length: number) =>
  Array.from({ length }).map((item, i) => `#page-${i + 1}`)

const testPages = generateTestPages(24)
const testThreePages = generateTestPages(3)
const testSevenPages = generateTestPages(7)
const testEightPages = generateTestPages(8)
const testNinePages = generateTestPages(9)

const Template: ComponentStory<typeof Pagination> = (args) => (
  <Pagination
    pages={args.pages}
    currentPage={args.currentPage}
    maxSlots={args.maxSlots}
  />
)

export const Sandbox = Template.bind({})
Sandbox.args = {
  pages: testPages,
  currentPage: 10,
  maxSlots: 7,
}

export const Default = () => <Pagination pages={testPages} currentPage={10} />

export const ThreePagesFirst = () => (
  <Pagination pages={testThreePages} currentPage={1} />
)
export const ThreePages = () => (
  <Pagination pages={testThreePages} currentPage={2} />
)
export const ThreePagesLast = () => (
  <Pagination pages={testThreePages} currentPage={3} />
)

export const SevenPages = () => (
  <Pagination pages={testSevenPages} currentPage={4} />
)

export const EightPagesFirst = () => (
  <Pagination pages={testEightPages} currentPage={1} />
)

export const EightPagesFour = () => (
  <Pagination pages={testEightPages} currentPage={4} />
)

export const EightPagesFive = () => (
  <Pagination pages={testEightPages} currentPage={5} />
)

export const EightPagesSix = () => (
  <Pagination pages={testEightPages} currentPage={6} />
)

export const EightPagesLast = () => (
  <Pagination pages={testEightPages} currentPage={8} />
)

export const NinePagesFive = () => (
  <Pagination pages={testNinePages} currentPage={5} />
)

export const TenSlots = () => (
  <Pagination pages={testPages} currentPage={10} maxSlots={10} />
)
