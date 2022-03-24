import { gql, useMutation } from '@apollo/client'
import { ObjectId } from 'bson'
interface RemoveWidgetResponse {
  _id: ObjectId
}

interface RemoveWidgetInput {
  _id: ObjectId
}

export const REMOVE_WIDGET = gql`
  mutation removeWidget($_id: OID!) {
    removeWidget(_id: $_id) {
      _id
    }
  }
`

export function useRemoveWidgetMutation() {
  return useMutation<RemoveWidgetResponse, RemoveWidgetInput>(REMOVE_WIDGET)
}
