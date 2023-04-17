import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { GovBanner } from '@trussworks/react-uswds'

export default {
  title: 'Base/GovBanner',
  component: GovBanner,
  argTypes: {
    tld: { control: 'string' },
  },
} as ComponentMeta<typeof GovBanner>

const Template: ComponentStory<typeof GovBanner> = (args) => (
  <GovBanner tld={args.tld} />
)

export const Sandbox = Template.bind({})
Sandbox.args = {
  tld: '.mil',
}

export const Default = () => <GovBanner tld=".mil" />
