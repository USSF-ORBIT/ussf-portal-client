import React from 'react'
import { Meta } from '@storybook/react'
import { Button } from '@trussworks/react-uswds'

import Widget, { WidgetWithSettings } from './Widget'

export default {
  title: 'Base/Widget',
  component: Widget,
} as Meta

export const ExampleWidget = () => (
  <Widget header={<h3>Example Widget</h3>}>
    <p>Example widget contents</p>
  </Widget>
)

export const ExampleWidgetWithSettings = () => (
  <WidgetWithSettings
    header="Example Widget"
    settingsItems={[
      <Button
        key="settingsMenu_item1"
        type="button"
        onClick={() => {
          return
        }}>
        Delete this widget
      </Button>,
    ]}>
    <p>Example widget contents</p>
  </WidgetWithSettings>
)
