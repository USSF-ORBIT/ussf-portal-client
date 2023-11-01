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
      'First Name',
      'Last Name',
      'Rank',
      'Title',
      'Base',
      'Field Commands',
      'Email',
    ]}
    keys={[
      'FirstName',
      'LastName',
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
      'First Name',
      'Last Name',
      'Rank',
      'Title',
      'Base',
      'Field Commands',
      'Email',
    ]}
    keys={[
      'FirstName',
      'LastName',
      'Rank',
      'DutyTitle',
      'BaseLoc',
      'MajCom',
      'Email',
    ]}
    rows={[]}
  />
)
