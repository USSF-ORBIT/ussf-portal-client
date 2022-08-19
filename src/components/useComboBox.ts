/**
 * This file is copied from React USWDS to support ComboBoxCustom.
 * It includes the util generateDynamicEg
 */
import React, { useReducer } from 'react'
import type { ComboBoxOption, CustomizableFilter } from './ComboBoxCustom'
import { FocusMode } from './ComboBoxCustom'
//import { generateDynamicRegExp } from './utils'

export enum ActionTypes {
  SELECT_OPTION,
  CLEAR,
  OPEN_LIST,
  CLOSE_LIST,
  FOCUS_OPTION,
  UPDATE_FILTER,
  BLUR,
  CLEAR_SELECTION,
  FOCUS_INPUT,
}

/* eslint-disable security/detect-non-literal-regexp, security/detect-object-injection */
/**
 * Generate a dynamic regular expression based off of a replaceable and possibly filtered value.
 *
 * @param {string} filter The base filter to use. May be extended by `extras`.
 * @param {string} query The value to use in the regular expression
 * @param {object} extras An object of regular expressions to replace and filter the query
 */
export const generateDynamicRegExp = (
  filter: string,
  query = '',
  extras: Record<string, string> = {}
): RegExp => {
  const escapeRegExp = (text: string): string => {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
  }

  let find = filter.replace(/{{(.*?)}}/g, (_m, $1: string): string => {
    const key = $1.trim()
    const queryFilter = extras[key]
    if (key !== 'query' && queryFilter) {
      const matcher = new RegExp(queryFilter, 'i')
      const matches = query.match(matcher)

      if (matches) {
        return escapeRegExp(matches[1])
      }

      return ''
    }
    return escapeRegExp(query)
  })

  console.log('find', find)
  find = '^(?:' + find + ')$'

  return new RegExp(find, 'i')
}
export type Action =
  | {
      type: ActionTypes.SELECT_OPTION
      option: ComboBoxOption
    }
  | {
      type: ActionTypes.CLEAR
    }
  | {
      type: ActionTypes.OPEN_LIST
    }
  | {
      type: ActionTypes.CLOSE_LIST
    }
  | {
      type: ActionTypes.FOCUS_OPTION
      option: ComboBoxOption
    }
  | {
      type: ActionTypes.UPDATE_FILTER
      value: string
    }
  | {
      type: ActionTypes.BLUR
    }
  | {
      type: ActionTypes.CLEAR_SELECTION
    }
  | {
      type: ActionTypes.FOCUS_INPUT
    }

export interface State {
  isOpen: boolean
  selectedOption?: ComboBoxOption
  focusedOption?: ComboBoxOption
  focusMode: FocusMode
  filteredOptions: ComboBoxOption[]
  inputValue: string
  statusText: string
}

interface FilterResults {
  closestMatch: ComboBoxOption
  optionsToDisplay: ComboBoxOption[]
}

export const useComboBox = (
  initialState: State,
  optionsList: ComboBoxOption[],
  disableFiltering: boolean,
  customizableFilter: CustomizableFilter
): [State, React.Dispatch<Action>] => {
  const getPotentialMatches = (needle: string): FilterResults => {
    const regex = generateDynamicRegExp(
      customizableFilter.filter,
      needle,
      customizableFilter.extras
    )
    let filteredOptions = optionsList.filter((option) =>
      regex.test(option.label.toLowerCase())
    )
    //this works but im trying to make it so
    // we can pass this option in as a prop
    // and then filter on it too
    //filteredOptions.push({ value: 'custom', label: 'Add a custom link' })

    if (disableFiltering) {
      return {
        closestMatch:
          filteredOptions.length > 0 ? filteredOptions[0] : optionsList[0],
        optionsToDisplay: optionsList,
      }
    }

    return {
      closestMatch: filteredOptions[0],
      optionsToDisplay: filteredOptions,
    }
  }

  const reducer = (state: State, action: Action): State => {
    switch (action.type) {
      case ActionTypes.SELECT_OPTION:
        return {
          ...state,
          isOpen: false,
          selectedOption: action.option,
          focusMode: FocusMode.Input,
          inputValue: action.option.label,
          filteredOptions: optionsList,
          focusedOption: action.option,
          statusText: '',
        }
      case ActionTypes.UPDATE_FILTER: {
        const { closestMatch, optionsToDisplay } = getPotentialMatches(
          action.value
        )

        const newState = {
          ...state,
          isOpen: true,
          filteredOptions: optionsToDisplay,
          inputValue: action.value,
          statusText: `${optionsToDisplay.length} result${
            optionsToDisplay.length > 1 ? 's' : ''
          } available.`,
        }

        if (optionsToDisplay.length < 1) {
          newState.statusText = 'No results.'
        }

        if (disableFiltering || !state.selectedOption) {
          newState.focusedOption = closestMatch
        } else if (state.selectedOption) {
          if (newState.filteredOptions.includes(state.selectedOption)) {
            newState.focusedOption = state.selectedOption
          } else {
            newState.focusedOption = closestMatch
          }
        }

        return newState
      }
      case ActionTypes.OPEN_LIST: {
        const statusText = state.filteredOptions.length
          ? `${state.filteredOptions.length} result${
              state.filteredOptions.length > 1 ? 's' : ''
            } available.`
          : 'No results.'

        return {
          ...state,
          isOpen: true,
          focusMode: FocusMode.Input,
          focusedOption:
            state.selectedOption || state.focusedOption || optionsList[0],
          statusText,
        }
      }
      case ActionTypes.CLOSE_LIST: {
        const newState = {
          ...state,
          isOpen: false,
          focusMode: FocusMode.Input,
          focusedOption: undefined,
          statusText: '',
        }

        if (state.filteredOptions.length === 0) {
          newState.filteredOptions = optionsList
          newState.inputValue = ''
        }

        if (state.selectedOption) {
          newState.inputValue = state.selectedOption.label
        }

        return newState
      }

      case ActionTypes.FOCUS_OPTION: {
        const statusText = state.filteredOptions.length
          ? `${state.filteredOptions.length} result${
              state.filteredOptions.length > 1 ? 's' : ''
            } available.`
          : 'No results.'

        return {
          ...state,
          isOpen: true,
          focusedOption: action.option,
          focusMode: FocusMode.Item,
          statusText,
        }
      }
      case ActionTypes.CLEAR:
        return {
          ...state,
          inputValue: '',
          isOpen: false,
          focusMode: FocusMode.Input,
          selectedOption: undefined,
          filteredOptions: optionsList,
          focusedOption: optionsList[0],
          statusText: '',
        }
      case ActionTypes.BLUR: {
        const newState = {
          ...state,
          isOpen: false,
          focusMode: FocusMode.None,
          filteredOptions: optionsList,
          statusText: '',
        }

        if (!state.selectedOption) {
          newState.inputValue = ''
          newState.focusedOption = optionsList[0]
        } else {
          newState.inputValue = state.selectedOption.label
          newState.focusedOption = state.selectedOption
        }

        return newState
      }
      case ActionTypes.CLEAR_SELECTION: {
        return {
          ...state,
          inputValue: '',
          isOpen: false,
          focusMode: FocusMode.None,
          selectedOption: undefined,
          filteredOptions: optionsList,
          focusedOption: undefined,
          statusText: '',
        }
      }
      case ActionTypes.FOCUS_INPUT: {
        return {
          ...state,
          focusMode: FocusMode.Input,
        }
      }
      default:
        throw new Error()
    }
  }

  return useReducer(reducer, initialState)
}
