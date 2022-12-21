import React from 'react'
import { Meta } from '@storybook/react'
import { Button } from '@trussworks/react-uswds'

import Widget, { WidgetWithSettings } from './Widget'

export default {
  title: 'Base/Section',
  component: Widget,
  decorators: [
    (Story) => (
      <div className="sfds">
        <Story />
      </div>
    ),
  ],
} as Meta

export const ExampleSection = () => (
  <Widget header={<h3>Example Section</h3>}>
    <p>Example section contents</p>
  </Widget>
)

export const ExampleSectionWithSettings = () => (
  <WidgetWithSettings
    header={<h3>Example Section</h3>}
    settingsItems={[
      <Button
        key="settingsMenu_item1"
        type="button"
        onClick={() => {
          return
        }}>
        Delete this section
      </Button>,
    ]}>
    <p>Example section contents</p>
  </WidgetWithSettings>
)
