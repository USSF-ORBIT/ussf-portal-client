import React, { ReactNode } from 'react'
import { Tooltip } from '@trussworks/react-uswds'
import classnames from 'classnames'

import styles from './Tooltip.module.scss'

type TooltipProps = {
  label: string
  position?: 'top' | 'bottom' | 'left' | 'right' | undefined
  wrapperclasses?: string
  className?: string
  children: ReactNode
}

const USSFTooltip = (props: TooltipProps) => {
  const { className } = props
  const classes = classnames(styles.tooltipButton, className)

  return <Tooltip {...props} className={classes} />
}

export default USSFTooltip
