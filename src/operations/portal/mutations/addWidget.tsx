import { useMutation } from '@apollo/client'
import {
  AddWidgetDocument,
  AddWidgetMutationResult,
  AddWidgetMutationVariables,
} from '../../../generated/graphql'

export function useAddWidgetMutation() {
  return useMutation<AddWidgetMutationResult, AddWidgetMutationVariables>(
    AddWidgetDocument
  )
}
