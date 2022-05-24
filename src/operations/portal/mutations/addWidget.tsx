import { useMutation } from '@apollo/client'
import {
  AddWidgetDocument,
  AddWidgetMutationResult,
  AddWidgetMutationVariables,
} from 'types/index'

export function useAddWidgetMutation() {
  return useMutation<AddWidgetMutationResult, AddWidgetMutationVariables>(
    AddWidgetDocument
  )
}
