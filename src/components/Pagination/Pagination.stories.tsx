import React from 'react'
import { Meta } from '@storybook/react'
import Pagination from './Pagination'

export default {
  title: 'Components/Pagination',
  component: Pagination,
} as Meta

const testPages = Array.from({ length: 24 }).map((item, i) => `#page-${i + 1}`)

const testThreePages = Array.from({ length: 3 }).map(
  (item, i) => `#page-${i + 1}`
)
const testSevenPages = Array.from({ length: 7 }).map(
  (item, i) => `#page-${i + 1}`
)
const testEightPages = Array.from({ length: 8 }).map(
  (item, i) => `#page-${i + 1}`
)
const testNinePages = Array.from({ length: 9 }).map(
  (item, i) => `#page-${i + 1}`
)

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
