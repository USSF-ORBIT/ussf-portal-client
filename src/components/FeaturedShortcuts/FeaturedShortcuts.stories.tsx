import React from 'react'
import { Meta } from '@storybook/react'
import FeaturedShortcuts from './FeaturedShorcuts'
import { featuredShortcutItems } from 'components/FeaturedShortcuts/FeaturedShortcutItems'

export default {
  title: 'Components/Widgets/FeaturedShortcuts',
  component: FeaturedShortcuts,
} as Meta

export const FeaturedShorcutsWidget = () => (
  <FeaturedShortcuts featuredShortcuts={featuredShortcutItems} />
)
