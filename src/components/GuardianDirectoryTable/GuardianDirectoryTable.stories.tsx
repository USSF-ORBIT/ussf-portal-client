import React from 'react'
import { Meta } from '@storybook/react'
import { GuardianDirectoryTable } from './GuardianDirectoryTable'
import { guardianDirectoryMock } from '__fixtures__/data/guardianDirectory'

export default {
  title: 'Components/GuardianDirectoryTable',
  component: GuardianDirectoryTable,
} as Meta

const directory = guardianDirectoryMock
export const Default = () => (
  <GuardianDirectoryTable
    headers={[
      'Last Name',
      'First Name',
      'Rank',
      'Title',
      'Base',
      'Field Commands',
      'Email',
    ]}
    keys={[
      'LastName',
      'FirstName',
      'Rank',
      'DutyTitle',
      'BaseLoc',
      'MajCom',
      'Email',
    ]}
    rows={directory}
  />
)

export const Empty = () => (
  <GuardianDirectoryTable
    headers={[
      'Last Name',
      'First Name',
      'Rank',
      'Title',
      'Base',
      'Field Commands',
      'Email',
    ]}
    keys={[
      'LastName',
      'FirstName',
      'Rank',
      'DutyTitle',
      'BaseLoc',
      'MajCom',
      'Email',
    ]}
    rows={[]}
  />
)
