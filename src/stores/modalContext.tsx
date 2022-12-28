import React, { createContext, useContext, useState } from 'react'

type ModalContextType = {
  toggleDisplay: boolean
  component: React.ReactNode | null
  handleToggleDisplayModal: () => void
}

const ModalContext = createContext<ModalContextType>({
  toggleDisplay: false,
  component: null,
  handleToggleDisplayModal: () => {
    return
  },
})

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [toggleDisplay, setToggleDisplay] = useState(false)

  const handleToggleDisplayModal = () => {
    setToggleDisplay((prevDisplayState) => !prevDisplayState)
  }

  const context = {
    toggleDisplay,
    component: null,
    handleToggleDisplayModal,
  }

  return (
    <ModalContext.Provider value={context}>{children}</ModalContext.Provider>
  )
}
export const useModalContext = () => {
  const context = useContext(ModalContext)
  return context
}
