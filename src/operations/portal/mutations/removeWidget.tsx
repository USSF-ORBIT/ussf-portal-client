import { gql, useMutation } from '@apollo/client'
import {
  RemoveWidgetMutationVariables,
  RemoveWidgetMutationResult,
} from 'generated/graphql'
export const REMOVE_WIDGET = gql`
  mutation removeWidget($_id: OID!) {
    removeWidget(_id: $_id) {
      _id
    }
  }
`

export function useRemoveWidgetMutation() {
  return useMutation<RemoveWidgetMutationResult, RemoveWidgetMutationVariables>(
    REMOVE_WIDGET
  )
}
