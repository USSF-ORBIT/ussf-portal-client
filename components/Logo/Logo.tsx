import React from 'react'
import Image from 'next/image'

import ussfLogo from 'public/img/ussf-logo.svg'

const Logo = () => {
  return <Image src={ussfLogo} alt="USSF Logo" />
}

export default Logo
