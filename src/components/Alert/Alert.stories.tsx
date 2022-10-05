import React from 'react'
import { Meta } from '@storybook/react'
import { Alert } from '@trussworks/react-uswds'

export default {
  title: 'Components/Alert',
  component: Alert,
  decorators: [
    (Story) => (
      <div className="sfds">
        <Story />
      </div>
    ),
  ],
} as Meta

const successMsg = 'Successful alert'
const errorMsg = 'Error alert'
const warningMsg = 'Warning alert'
const infoMsg = 'Info alert'

//TODO: Icons for React USWDS component not displaying in Chrome Storybook

export const AlertSuccess = () => (
  <Alert headingLevel="h1" type="success">
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
