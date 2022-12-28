import React, { createContext, useContext, useState } from 'react'

type ModalContextType = {
  toggleDisplay: boolean
  component: React.ReactNode | null
  handleToggleDisplayModal: () => void
  setComponent: (componentUpdate: React.ReactNode) => void
}

const ModalContext = createContext<ModalContextType>({
  toggleDisplay: false,
  component: null,
  handleToggleDisplayModal: () => {
    return
  },
  setComponent: () => {
    return
  },
})

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [toggleDisplay, setToggleDisplay] = useState(false)

  const handleToggleDisplayModal = () => {
    setToggleDisplay((prevDisplayState) => !prevDisplayState)
  }

  let component
  const setComponent = (componentUpdate: React.ReactNode) => {
    component = componentUpdate
    return
  }

  const context = {
    toggleDisplay,
    component,
    handleToggleDisplayModal,
    setComponent,
  }

  return (
    <ModalContext.Provider value={context}>{children}</ModalContext.Provider>
  )
}
export const useModalContext = () => {
  const context = useContext(ModalContext)
  return context
}
