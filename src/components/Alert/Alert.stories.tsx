import React from 'react'
import { Meta } from '@storybook/react'
import { Alert } from '@trussworks/react-uswds'

export default {
  title: 'Base/Alert',
  component: Alert,
} as Meta

const successMsg = 'Successful alert'
const errorMsg = 'Error alert'
const warningMsg = 'Warning alert'
const infoMsg = 'Info alert'

export const AlertSuccess = () => (
  <Alert type="success" headingLevel="h4">
    {successMsg}
  </Alert>
)

export const AlertWarning = () => (
  <Alert headingLevel="h1" type="warning">
    {warningMsg}
  </Alert>
)

export const AlertError = () => (
  <Alert headingLevel="h1" type="error">
    {errorMsg}
  </Alert>
)

export const AlertInfo = () => (
  <Alert headingLevel="h1" type="info">
    {infoMsg}
  </Alert>
)
