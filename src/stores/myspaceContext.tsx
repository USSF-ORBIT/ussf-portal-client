import React, { createContext, useContext, useState } from 'react'
import { MySpace, Widget } from 'types'

export type MySpaceContextType = {
  mySpace: MySpace
  initializeMySpace: (mySpace: MySpace) => void
  updateMySpace: (widget: Widget) => void
}

export const MySpaceContext = createContext<MySpaceContextType>({
  mySpace: [],
  initializeMySpace: /* istanbul ignore next */ () => {
    return
  },
  updateMySpace: /* istanbul ignore next */ () => {
    return
  },
})

export const MySpaceProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [mySpace, setMySpace] = useState<MySpace>([])

  const initializeMySpace = (mySpace: MySpace) => {
    setMySpace(mySpace)
  }

  // Rather than passing in the entire mySpace array, I think we can
  // just pass in the updated widget and update the mySpace array at that widget's index
  const updateMySpace = (widget: Widget) => {
    // setMySpace(mySpace)
    console.log('updateMySpace called with widget: ', widget)
  }

  return (
    <MySpaceContext.Provider
      value={{ mySpace, initializeMySpace, updateMySpace }}>
      {children}
    </MySpaceContext.Provider>
  )
}

export const useMySpaceContext = () => {
  const context = useContext(MySpaceContext)
  if (context === undefined) {
    throw new Error('useMySpaceContext must be used within a MySpaceProvider')
  }
  return context
}
