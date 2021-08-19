import React from 'react'
import { Meta } from '@storybook/react'

import Footer from './Footer'

export default {
  title: 'MVP/Components/Footer',
  component: Footer,
  decorators: [
    (Story) => (
      <div className="mvp">
        <Story />
      </div>
    ),
  ],
} as Meta

export const DefaultFooter = () => <Footer />
