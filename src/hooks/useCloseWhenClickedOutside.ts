import React, { useState, useEffect } from 'react'
import { useMySpaceContext } from 'stores/myspaceContext'
export const useCloseWhenClickedOutside = (
  el: React.RefObject<HTMLElement>,
  initialState: boolean
) => {
  const [isActive, setIsActive] = useState(initialState)
  const { disableDragAndDrop, setDisableDragAndDrop } = useMySpaceContext()

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (el.current !== null && el.current.contains(e.target as Node)) {
        return
      }

      setDisableDragAndDrop(!disableDragAndDrop)
      setIsActive(!isActive)
    }

    if (isActive) {
      document.addEventListener('mousedown', onClick)
    } else {
      document.removeEventListener('mousedown', onClick)
    }

    return () => {
      document.removeEventListener('mousedown', onClick)
    }
  }, [isActive])

  return [isActive, setIsActive] as const
}
