import React, { createContext, useContext, useState } from 'react'

export const UserContext = createContext({
  setUserId: (a: string) => {},
  userId: '',
  getUserId: (): string => '',
})

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState('')

  const getUserId = () => {
    return userId
  }

  const context = {
    userId,
    getUserId,
    setUserId,
  }

  return <UserContext.Provider value={context}>{children}</UserContext.Provider>
}

function useUserContext() {
  const context = useContext(UserContext)

  if (context === undefined) {
    throw new Error('userUserContext must be used within a UserContextProvider')
  }
  return context
}

export { UserContextProvider, useUserContext }
