import React from 'react'

const Logo = ({ abbreviated = false }: { abbreviated?: boolean }) => {
  if (abbreviated) {
    return <img src="/img/ussf-logo-short.svg" alt="USSF Logo" />
  }

  return <img src="/img/ussf-logo.svg" alt="USSF Logo" />
}

export default Logo
