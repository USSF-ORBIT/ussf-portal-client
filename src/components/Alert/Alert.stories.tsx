import React from 'react'
import { Meta } from '@storybook/react'
import { Alert } from '@trussworks/react-uswds'

export default {
  title: 'Base/Alert',
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

export const AlertSuccess = () => (
  <Alert type="success" headingLevel="h4" slim>
    {successMsg}
  </Alert>
)

export const AlertWarning = () => (
  <Alert headingLevel="h1" type="warning" slim>
    {warningMsg}
  </Alert>
)

export const AlertError = () => (
  <Alert headingLevel="h1" type="error" slim>
    {errorMsg}
  </Alert>
)

export const AlertInfo = () => (
  <Alert headingLevel="h1" type="info" slim>
    {infoMsg}
  </Alert>
)
