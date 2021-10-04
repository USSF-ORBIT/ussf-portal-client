import React, { useState, useEffect } from 'react'
export const useDetectOutsideClick = (
  el: React.RefObject<HTMLDivElement>,
  initialState: boolean
) => {
  const [isActive, setIsActive] = useState(initialState)

  // useEffect(() => {
  //   const onClick = (e: MouseEvent) => {
  //     if (el.current !== null && el.current.contains(e.target as Node)) {
  //       console.log('inside the thing')
  //       return
  //     }
  //     console.log('outside the thing')
  //     setIsActive(!isActive)
  //   }

  //   if (isActive) {
  //     document.addEventListener('mousedown', onClick)
  //   } else {
  //     document.removeEventListener('mousedown', onClick)
  //   }

  //   return () => {
  //     document.removeEventListener('mousedown', onClick)
  //   }
  // }, [isActive, el])

  return [isActive, setIsActive] as const
}
