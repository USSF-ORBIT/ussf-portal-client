import { gql, useMutation } from '@apollo/client'
import { ObjectId } from 'bson'
interface RemoveWidgetResponse {
  _id: ObjectId
}

interface RemoveWidgetInput {
  _id: ObjectId
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
