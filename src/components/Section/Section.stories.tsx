import React from 'react'
import { Meta } from '@storybook/react'
import { Button } from '@trussworks/react-uswds'

import Section, { SectionWithSettings } from './Section'

export default {
  title: 'Components/Sections/Section',
  component: Section,
  decorators: [
    (Story) => (
      <div className="sfds">
        <Story />
      </div>
    ),
  ],
} as Meta

export const ExampleSection = () => (
  <Section header={<h3>Example Section</h3>}>
    <p>Example section contents</p>
  </Section>
)

export const ExampleSectionWithSettings = () => (
  <SectionWithSettings
    header={<h3>Example Section</h3>}
    settingsItems={[
      <Button
        key="settingsMenu_item1"
        type="button"
        onClick={() => {
          return
        }}>
        Delete this collection
      </Button>,
    ]}>
    <p>Example section contents</p>
  </SectionWithSettings>
)
