import React, { createContext, useContext, useState } from 'react'

export type SearchContextType = {
  searchQuery: string
  setSearchQuery: (searchQuery: string) => void
}

export const SearchContext = createContext<SearchContextType>({
  searchQuery: '',
  setSearchQuery: /* istanbul ignore next */ () => {
    return
  },
})

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState('')

  const context = {
    searchQuery,
    setSearchQuery,
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
