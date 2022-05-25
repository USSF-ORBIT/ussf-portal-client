import { useMutation } from '@apollo/client'
import type {
  RemoveWidgetMutationVariables,
  RemoveWidgetMutationResult,
} from 'types'
import { RemoveWidgetDocument } from 'types/index'

export function useRemoveWidgetMutation() {
  return useMutation<RemoveWidgetMutationResult, RemoveWidgetMutationVariables>(
    RemoveWidgetDocument
  )
}
