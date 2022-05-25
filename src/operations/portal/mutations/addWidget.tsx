import { useMutation } from '@apollo/client'
import { AddWidgetDocument } from 'types/index'
import type { AddWidgetMutationResult, AddWidgetMutationVariables } from 'types'

export function useAddWidgetMutation() {
  return useMutation<AddWidgetMutationResult, AddWidgetMutationVariables>(
    AddWidgetDocument
  )
}
