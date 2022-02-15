import { gql, useMutation } from '@apollo/client'
import type { SectionType } from 'types'

interface AddSectionResponse {
  _id: string
  title: string
  type: SectionType
}

interface AddSectionInput {
  title: string
  type: SectionType
}

export const ADD_SECTION = gql`
  mutation addSection($title: String!, $type: SectionType!) {
    addSection(title: $title, type: $type) {
      _id
      title
      type
    }
  }
`

export function useAddSectionMutation() {
  return useMutation<AddSectionResponse, AddSectionInput>(ADD_SECTION)
}
