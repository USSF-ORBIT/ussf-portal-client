import React from 'react'
import type { Meta } from '@storybook/react'
import BugReportFeedback from './BugReportFeedback'

export default {
  title: 'Base/BugReportFeedback',
  component: BugReportFeedback,
  decorators: [
    (Story) => (
      <div className="sfds">
        <Story />
      </div>
    ),
  ],
} as Meta

export const DefaultBugReportFeedback = () => <BugReportFeedback />
