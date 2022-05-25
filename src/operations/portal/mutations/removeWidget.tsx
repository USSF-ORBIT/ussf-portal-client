import { useMutation } from '@apollo/client'
import type {
  RemoveWidgetMutationVariables,
  RemoveWidgetMutationResult,
} from 'types'
import { RemoveWidgetDocument } from 'types'

export function useRemoveWidgetMutation() {
  return useMutation<RemoveWidgetMutationResult, RemoveWidgetMutationVariables>(
    RemoveWidgetDocument
  )
}
