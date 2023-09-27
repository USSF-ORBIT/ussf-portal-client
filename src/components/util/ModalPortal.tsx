import React, { useRef, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

const ModalPortal = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<Element | null>()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    ref.current = document.querySelector('#modal-root')
    setMounted(true)
  }, [])

  return mounted && ref.current
    ? createPortal(<>{children}</>, ref.current)
    : null
}

export default ModalPortal
