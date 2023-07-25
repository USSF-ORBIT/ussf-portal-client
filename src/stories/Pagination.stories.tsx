import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Pagination } from '@trussworks/react-uswds'
import defaultStyles from '../layout/DefaultLayout/DefaultLayout.module.scss'

export default {
  title: 'Base/Pagination',
  component: Pagination,
  argTypes: {
    totalPages: { control: 'number' },
    currentPage: { control: 'number' },
    maxSlots: { control: 'number' },
    pathname: { control: 'string' },
  },
  decorators: [
    (Story) => (
      <div className={defaultStyles.siteContainer}>
        <Story />
      </div>
    ),
  ],
} as Meta<typeof Pagination>

const pathname = '/test-pathname'

type Story = StoryObj<typeof Pagination>

export const Sandbox: Story = {
  args: {
    totalPages: 24,
    currentPage: 10,
    maxSlots: 7,
  },
}

export const Default: Story = {
  args: {
    totalPages: 24,
    currentPage: 10,
  },
}

export const ThreePagesFirst: Story = {
  args: {
    pathname: pathname,
    totalPages: 3,
    currentPage: 1,
  },
}
export const ThreePages: Story = {
  args: {
    pathname: pathname,
    totalPages: 3,
    currentPage: 2,
  },
}
export const ThreePagesLast: Story = {
  args: {
    pathname: pathname,
    totalPages: 3,
    currentPage: 3,
  },
}

export const SevenPages: Story = {
  args: {
    pathname: pathname,
    totalPages: 7,
    currentPage: 4,
  },
}

export const EightPagesFirst: Story = {
  args: {
    pathname: pathname,
    totalPages: 8,
    currentPage: 1,
  },
}

export const EightPagesFour: Story = {
  args: {
    pathname: pathname,
    totalPages: 8,
    currentPage: 4,
  },
}

export const EightPagesFive: Story = {
  args: {
    pathname: pathname,
    totalPages: 8,
    currentPage: 5,
  },
}

export const EightPagesSix: Story = {
  args: {
    pathname: pathname,
    totalPages: 8,
    currentPage: 6,
  },
}

export const EightPagesLast: Story = {
  args: {
    pathname: pathname,
    totalPages: 8,
    currentPage: 8,
  },
}

export const NinePagesFive: Story = {
  args: {
    pathname: pathname,
    totalPages: 9,
    currentPage: 5,
  },
}

export const TenSlots: Story = {
  args: {
    pathname: pathname,
    totalPages: 24,
    currentPage: 10,
    maxSlots: 10,
  },
}
