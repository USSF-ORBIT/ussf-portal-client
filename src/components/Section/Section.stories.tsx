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
  <Section header="Example Section">
    <p>Example section contents</p>
  </Section>
)

export const ExampleSectionWithSettings = () => (
  <SectionWithSettings
    header="Example Section"
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
