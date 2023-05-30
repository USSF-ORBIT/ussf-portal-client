import React, { createContext, useContext, useState } from 'react'

export type SearchContextType = {
  searchQuery: string
  searchPageFilters: string[]
  setSearchQuery: (searchQuery: string) => void
  setSearchPageFilters: (searchPageFilters: string[]) => void
}

export const SearchContext = createContext<SearchContextType>({
  searchQuery: '',
  searchPageFilters: [],
  setSearchQuery: /* istanbul ignore next */ () => {
    return
  },
  setSearchPageFilters: /* istanbul ignore next */ () => {
    return
  },
})

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState('')

  // When a filter is selected, it is added to this array and then combined into
  // a query string right before the form is submitted
  const [searchPageFilters, setSearchPageFilters] = useState<string[]>([])

  const context = {
    searchQuery,
    searchPageFilters,
    setSearchQuery,
    setSearchPageFilters,
  }

  return (
    <SearchContext.Provider value={context}>{children}</SearchContext.Provider>
  )
}

export const useSearchContext = () => {
  const context = useContext(SearchContext)

  if (context === undefined) {
    throw new Error('useSearchContext must be used within a SearchProvider')
  }

  return context
}
