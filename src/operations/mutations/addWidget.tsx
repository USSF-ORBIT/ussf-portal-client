import { gql, useMutation } from '@apollo/client'
import type { ObjectId } from 'bson'
import type { WidgetType } from 'types'

interface AddWidgetResponse {
  _id: ObjectId
  title: string
  type: WidgetType
}

interface AddWidgetInput {
  title: string
  type: WidgetType
}

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
  return useMutation<AddWidgetResponse, AddWidgetInput>(ADD_WIDGET)
}
