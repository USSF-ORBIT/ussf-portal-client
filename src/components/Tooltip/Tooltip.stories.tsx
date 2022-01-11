import React from 'react'
import { Meta } from '@storybook/react'
import { IconInfo } from '@trussworks/react-uswds'

import Tooltip from './Tooltip'

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  decorators: [
    (Story) => (
      <div className="sfds">
        <Story />
      </div>
    ),
  ],
} as Meta

const labelText = `You have reached the maximum 25 collections that can be added to your My Space page. Please remove or reorganize your sections to continue to add more.`

export const tooltipDefault = (): React.ReactElement => (
  <div className="margin-4">
    <Tooltip label={labelText}>
      <IconInfo size={3} />
    </Tooltip>
  </div>
)

export const tooltipTop = (): React.ReactElement => (
  <div className="margin-4">
    <Tooltip position="top" label={labelText}>
      <IconInfo size={3} />
    </Tooltip>
  </div>
)

export const tooltipBottom = (): React.ReactElement => (
  <div className="margin-4">
    <Tooltip position="bottom" label={labelText}>
      <IconInfo size={3} />
    </Tooltip>
  </div>
)

export const tooltipRight = (): React.ReactElement => (
  <div className="margin-4">
    <Tooltip position="right" label={labelText}>
      <IconInfo size={3} />
    </Tooltip>
  </div>
)

export const tooltipLeft = (): React.ReactElement => (
  <div className="margin-4">
    <Tooltip position="left" label={labelText}>
      <IconInfo size={3} />
    </Tooltip>
  </div>
)
