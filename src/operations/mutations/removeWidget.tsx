import { gql, useMutation } from '@apollo/client'

interface RemoveWidgetResponse {
  _id: string
}

interface RemoveWidgetInput {
  _id: string
}

export const REMOVE_WIDGET = gql`
  mutation removeWidget($_id: ID!) {
    removeWidget(_id: $_id) {
      _id
      type
    }
  }
`

export function useRemoveWidgetMutation() {
  return useMutation<RemoveWidgetResponse, RemoveWidgetInput>(REMOVE_WIDGET)
}
