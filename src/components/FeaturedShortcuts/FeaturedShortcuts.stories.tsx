import React from 'react'
import { Meta } from '@storybook/react'
import { ObjectId } from 'bson'
import FeaturedShortcuts from './FeaturedShorcuts'
import { featuredShortcutItems } from './FeaturedShortcutItems'
import { Widget } from 'types/index'

const mockFeaturedShortcutsWidget: Widget = {
  _id: new ObjectId(),
  title: 'Featured Shortcuts',
  type: 'FeaturedShortcuts',
}

export default {
  title: 'Components/Widgets/FeaturedShortcuts',
  component: FeaturedShortcuts,
} as Meta

export const FeaturedShorcutsWidget = () => (
  <FeaturedShortcuts
    featuredShortcuts={featuredShortcutItems}
    widget={mockFeaturedShortcutsWidget}
  />
)
