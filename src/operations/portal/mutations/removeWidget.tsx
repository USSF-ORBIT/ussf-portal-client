import { useMutation } from '@apollo/client'
import {
  RemoveWidgetDocument,
  RemoveWidgetMutationVariables,
  RemoveWidgetMutationResult,
} from 'types/index'

export function useRemoveWidgetMutation() {
  return useMutation<RemoveWidgetMutationResult, RemoveWidgetMutationVariables>(
    RemoveWidgetDocument
  )
}
