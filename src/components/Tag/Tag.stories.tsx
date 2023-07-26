import React from 'react'
import { Meta } from '@storybook/react'
import { Tag, Label, Category } from './Tag'
import { CONTENT_CATEGORIES } from 'constants/index'

export default {
  title: 'Base/Tag',
  component: Tag,
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
    <h4>Source labels</h4>
    <Label type="Source">Spaceforce.mil</Label>
    <Label type="Source">Defense.gov</Label>
    <Label type="Source">Social media</Label>
    <br /> <br />
    <h4>Audience labels</h4>
    <Label type="Audience">All Guardians</Label>
    <br /> <br />
    <h4>Base labels</h4>
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
    <Category category={CONTENT_CATEGORIES.NEWS} />
    <Category category={CONTENT_CATEGORIES.ANNOUNCEMENT} />
    <Category category={CONTENT_CATEGORIES.DOCUMENTATION} />
    <Category category={CONTENT_CATEGORIES.APPLICATION} />
  </>
)
