import { gql, useMutation } from '@apollo/client'
import type {
  AddWidgetMutationResult,
  AddWidgetMutationVariables,
} from '../../../generated/graphql'

export const ADD_WIDGET = gql`
  mutation addWidget($title: String!, $type: WidgetType!) {
    addWidget(title: $title, type: $type) {
      _id
      title
      type
    }
  }
`

export function useAddWidgetMutation() {
  return useMutation<AddWidgetMutationResult, AddWidgetMutationVariables>(
    ADD_WIDGET
  )
}
