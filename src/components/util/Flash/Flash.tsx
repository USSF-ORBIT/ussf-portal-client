import React, { useEffect } from 'react'

const FLASH_TIMEOUT = 3200 // 3.2 seconds

const Flash = ({
  children,
  handleClear,
}: {
  children: React.ReactNode
  handleClear: () => void
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      handleClear()
    }, FLASH_TIMEOUT)

    return () => clearTimeout(timer)
  }, [children])

  return <>{children}</>
}

export default Flash
