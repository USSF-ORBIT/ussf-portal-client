import React from 'react'

const Logo = ({
  abbreviated = false,
  darkBg = false,
}: {
  abbreviated?: boolean
  darkBg?: boolean
}) => {
  if (darkBg) {
    return (
      <img
        src="/assets/images/SpaceForce_Horizontal_Gradient_RGBmod-01.svg"
        alt="United States Space Force Logo"
      />
    )
  }

  if (abbreviated) {
    return <img src="/img/ussf-logo-short.svg" alt="USSF Logo" />
  }

  return <img src="/img/ussf-logo.svg" alt="USSF Logo" />
}

export default Logo
