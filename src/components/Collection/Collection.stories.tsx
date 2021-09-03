import React from 'react'
import { Meta } from '@storybook/react'
import Collection from './Collection'
import Bookmark from 'components/Bookmark/Bookmark'

export default {
  title: 'Components/Collection',
  component: Collection,
} as Meta

const testBookmarks = [
  <Bookmark key="link1" href="#">
    Link 1
  </Bookmark>,
  <Bookmark key="link2" href="#">
    Link 2
  </Bookmark>,
  <Bookmark key="link3" href="#">
    Link 3
  </Bookmark>,
]

export const ExampleCollection = () => (
  <Collection title="Example collection">{testBookmarks}</Collection>
)
