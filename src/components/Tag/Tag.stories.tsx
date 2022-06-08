import React from 'react'
import { Meta } from '@storybook/react'
import { Tag, Label, Category } from './Tag'
import { CONTENT_CATEGORIES } from 'constants/index'

export default {
  title: 'Components/Tag',
  component: Tag,
  decorators: [
    (Story) => (
      <div className="sfds">
        <Story />
      </div>
    ),
  ],
} as Meta

export const ExampleTags = () => (
  <>
    <Tag>uniforms</Tag>
    <Tag>fitness</Tag>
    <Tag>ensignia</Tag>
    <Tag>performance</Tag>
    <Tag>career</Tag>
    <Tag>rocket launches</Tag>
  </>
)

export const AllLabels = () => (
  <>
    <Label type="Source">Spaceforce.mil</Label>
    <Label type="Source">Defense.gov</Label>
    <Label type="Source">Social media</Label>
    <br /> <br />
    <Label type="All">All Guardians</Label>
    <br /> <br />
    <Label type="Base">Buckley SFB</Label>
    <Label type="Base">Schriever SFB</Label>
    <br /> <br />
    <Label type="Base">Peterson SFB</Label>
    <Label type="Base">Vandenberg SFB</Label>
    <br /> <br />
    <Label type="Base">Los Angeles SFB</Label>
    <Label type="Base">Cape Canaveral SF Station</Label>
    <br /> <br />
    <Label type="Base">Cheyenne Mountain SF Station</Label>
    <Label type="Base">Patrick SFB</Label>
  </>
)

export const AllCategories = () => (
  <>
    <Category category={CONTENT_CATEGORIES.EXTERNAL_NEWS} />
    <Category category={CONTENT_CATEGORIES.INTERNAL_NEWS} />
    <Category category={CONTENT_CATEGORIES.ANNOUNCEMENT} />
    <Category category={CONTENT_CATEGORIES.DOCUMENTATION} />
    <Category category={CONTENT_CATEGORIES.APPLICATION} />
  </>
)
