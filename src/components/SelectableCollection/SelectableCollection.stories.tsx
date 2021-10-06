import React from 'react'
import { Meta } from '@storybook/react'
import SelectableCollection from './SelectableCollection'
import Collection from 'components/Collection/Collection'
import Bookmark from 'components/Bookmark/Bookmark'

type StorybookArgTypes = {
  handleSelect: () => void
}

export default {
  title: 'Components/SelectableCollection',
  component: SelectableCollection,
  argTypes: {
    handleSelect: { action: 'Select collection' },
  },
} as Meta

export const Unselected = (argTypes: StorybookArgTypes) => (
  <SelectableCollection isSelected={false} onSelect={argTypes.handleSelect}>
    <Collection title="Example collection">
      <Bookmark key="link1" href="#">
        Webmail
      </Bookmark>
      <Bookmark key="link2" href="#">
        MyPay
      </Bookmark>
      <Bookmark key="link3" href="#">
        vMPF
      </Bookmark>
      <Bookmark key="link3" href="#">
        LeaveWeb
      </Bookmark>
      <Bookmark key="link3" href="#">
        e-Publications
      </Bookmark>
    </Collection>
  </SelectableCollection>
)

export const Selected = (argTypes: StorybookArgTypes) => (
  <SelectableCollection isSelected={true} onSelect={argTypes.handleSelect}>
    <Collection title="Example collection">
      <Bookmark key="link1" href="#">
        Webmail
      </Bookmark>
      <Bookmark key="link2" href="#">
        MyPay
      </Bookmark>
      <Bookmark key="link3" href="#">
        vMPF
      </Bookmark>
      <Bookmark key="link3" href="#">
        LeaveWeb
      </Bookmark>
      <Bookmark key="link3" href="#">
        e-Publications
      </Bookmark>
    </Collection>
  </SelectableCollection>
)
