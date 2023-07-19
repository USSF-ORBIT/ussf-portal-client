import React from 'react'
import { Meta } from '@storybook/react'
import { Icon } from '@trussworks/react-uswds'

import Tooltip from './Tooltip'

export default {
  title: 'Base/Tooltip',
  component: Tooltip,
} as Meta

const labelText = `You can only add 10 links to a collection.\nTo add more links, please create a new collection.`

export const TooltipDefault = (): React.ReactElement => (
  <div className="margin-4">
    <Tooltip label={labelText}>
      <Icon.Info size={3} />
    </Tooltip>
  </div>
)

export const TooltipTop = (): React.ReactElement => (
  <div className="margin-4">
    <Tooltip position="top" label={labelText}>
      <Icon.Info size={3} />
    </Tooltip>
  </div>
)

export const TooltipBottom = (): React.ReactElement => (
  <div className="margin-4">
    <Tooltip position="bottom" label={labelText}>
      <Icon.Info size={3} />
    </Tooltip>
  </div>
)

export const TooltipRight = (): React.ReactElement => (
  <div className="margin-4">
    <Tooltip position="right" label={labelText}>
      <Icon.Info size={3} />
    </Tooltip>
  </div>
)

export const TooltipLeft = (): React.ReactElement => (
  <div className="margin-4">
    <Tooltip position="left" label={labelText}>
      <Icon.Info size={3} />
    </Tooltip>
  </div>
)
