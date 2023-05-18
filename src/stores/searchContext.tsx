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
  setSearchQuery: () => {
    return
  },
  setSearchPageFilters: () => {
    return
  },
})

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState('')
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
