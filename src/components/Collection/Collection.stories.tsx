import React from 'react'
import { Meta } from '@storybook/react'
import Collection from './Collection'
import Bookmark from 'components/Bookmark/Bookmark'

export default {
  title: 'Components/Collections/Collection',
  component: Collection,
} as Meta

export const ExampleCollection = () => (
  <Collection title="Example collection">
    <Bookmark bookmarkDescription="Webmail description" key="link1" href="#">
      Webmail
    </Bookmark>
    <Bookmark bookmarkDescription="MyPay description" key="link2" href="#">
      MyPay
    </Bookmark>
    <Bookmark key="link3" href="#">
      vMPF
    </Bookmark>
    <Bookmark key="link4" href="#">
      LeaveWeb
    </Bookmark>
    <Bookmark key="link5" href="#">
      e-Publications
    </Bookmark>
  </Collection>
)

export const ExampleCollectionSingleBookmark = () => (
  <Collection title="Example collection">
    <Bookmark bookmarkDescription="Webmail description" key="link1" href="#">
      Webmail
    </Bookmark>
  </Collection>
)
